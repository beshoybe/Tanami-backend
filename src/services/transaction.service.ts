import { inject, injectable } from "tsyringe";
import UserInvestmentRepository from "../repositories/userInvestment.repository";
import InvestmentRepository from "../repositories/investment.repository";
import { InvestmenNotFoundError, PaymentAlreadyCompletedError, PaymentFailedError, PaymentNotFoundError } from "../errors/ApiError";
import { CurrencyConverter } from "../utils/currencyConverter";
import { ProjectedROIRepository } from "../repositories/projectedROI.repository";
import { calculateROI } from "../utils/roiCalculator";
import { CreateTransactionDTO, TransactionResponseDTO } from "../dtos/transaction.dto";
import { plainToInstance } from "class-transformer";
import PaymentRepository from "../repositories/payment.repository";
import { CreatePaymentDTO, PaymentDTO } from "../dtos/payment.dto";

@injectable()
class TransactionService {
    constructor(
        @inject(InvestmentRepository) private readonly investmentRepository: InvestmentRepository,
        @inject(UserInvestmentRepository) private readonly userInvestmentRepository: UserInvestmentRepository,
        @inject(ProjectedROIRepository) private readonly projectedROIRepository: ProjectedROIRepository,
        @inject(PaymentRepository) private readonly paymentRepository: PaymentRepository
    ) {}

    async createUserInvestment(userId: string, data: CreateTransactionDTO): Promise<TransactionResponseDTO> {
        // Get investment details
        const investment = await this.investmentRepository.getInvestmentById(data.investmentId);
        if (!investment) {
            throw new InvestmenNotFoundError();
        }

        // Convert currency to USD
        const transactionAmount = CurrencyConverter.convertToUsd(data.amount, data.currency);

        // Save user's investment
        const userInvestment = await this.userInvestmentRepository.createUserInvestment({
            userId,
            investmentId: data.investmentId,
            transactionAmount
        });

        // Calculate ROI
        const { futureValue, roiPercentage } = calculateROI(data.amount, investment.monthlyExpectedReturn);

        // Save projected ROI
        await this.projectedROIRepository.createProjectedROI({
            userInvestmentId: userInvestment.id,
            roi: roiPercentage,
            initialInvestment: data.amount,
            finalValue: futureValue,
            currency: data.currency,
            date: new Date(new Date().setMonth(new Date().getMonth() + 12)).toISOString(), // ✅ 12 months later
        });

        // Save payment
        await this.paymentRepository.createPayment({
            userInvestmentId: userInvestment.id,
            amount: data.amount,
            currency: data.currency,
        });


        // Fetch the full investment data including related entities
        const fullUserInvestment = await this.userInvestmentRepository.getUserInvestmentById(userInvestment.id);
        const full = plainToInstance(TransactionResponseDTO, fullUserInvestment, { excludeExtraneousValues: true });

        // ✅ Transform into DTO
        return  full;
    }

    async getUserInvestments(userId: string): Promise<TransactionResponseDTO[]> {
        const investments = await this.userInvestmentRepository.getUserInvestments(userId);
        return investments.map((investment) => 
            plainToInstance(TransactionResponseDTO, investment, { excludeExtraneousValues: true })
        );
    }

    async deleteUserInvestment(userInvestmentId: string, userId: string): Promise<void> {
        const userInvestment = await this.userInvestmentRepository.getUserInvestmentByUserId(userInvestmentId, userId);
        if (!userInvestment) {
            throw new InvestmenNotFoundError();
        }
        await this.userInvestmentRepository.deleteUserInvestment(userInvestmentId);
    }

    async getUserInvestmentById(userId: string, userInvestmentId: string): Promise<TransactionResponseDTO> {
        const userInvestment = await this.userInvestmentRepository.getUserInvestmentByUserId(userInvestmentId, userId);
        if (!userInvestment) {
            throw new InvestmenNotFoundError();
        }
        return plainToInstance(TransactionResponseDTO, userInvestment, { excludeExtraneousValues: true });
    }

    async getPaymentById(paymentId: string,userId: string): Promise<PaymentDTO> {
        const payment = await this.paymentRepository.getPaymentById(paymentId);
        if (!payment) {
            throw new PaymentNotFoundError();
        }
        const userInvestment = await this.userInvestmentRepository.getUserInvestmentById(payment.userInvestmentId);
        if (!userInvestment) {
            throw new InvestmenNotFoundError();
        }
        if (userInvestment.userId !== userId || payment.userInvestmentId !== userInvestment.id) {
            throw new PaymentNotFoundError();
        }
        return plainToInstance(PaymentDTO, payment, { excludeExtraneousValues: true });
    }

    async mockSuccessfulPayment(paymentId: string): Promise<any> {
        const payment = await this.paymentRepository.getPaymentById(paymentId);
        if (!payment) {
            throw new PaymentNotFoundError();
        }
        if (payment.status === "completed") {
            throw new PaymentAlreadyCompletedError();
        }
        if (payment.retryCount >= 3) {
            await this.paymentRepository.softDeletePayment(paymentId);
            throw new PaymentFailedError();
        }

        await this.paymentRepository.updatePaymentStatus(paymentId, "completed");
        const updatedPayment = await this.paymentRepository.getPaymentById(paymentId);
        return updatedPayment;
    }

    async mockFailedPayment(paymentId: string): Promise<any> {
        const payment = await this.paymentRepository.getPaymentById(paymentId);
        if (!payment) {
            throw new PaymentNotFoundError();
        }
        if (payment.status === "completed") {
            throw new PaymentAlreadyCompletedError();
        }
        if (payment.retryCount >= 3) {
            await this.paymentRepository.softDeletePayment(paymentId);
            throw new PaymentFailedError();
        }
        payment.retryCount += 1;
        await payment.save();

        await this.paymentRepository.updatePaymentStatus(paymentId, "failed");

        const updatedPayment = await this.paymentRepository.getPaymentById(paymentId);
        return updatedPayment;
    }

    async createPayment(data:CreatePaymentDTO): Promise<any> {
        const userinvestment = await this.userInvestmentRepository.getUserInvestmentById(data.userInvestmentId);
        if (!userinvestment) {
            throw new InvestmenNotFoundError();
        }
        const convertedAmount = CurrencyConverter.convertFromUsd(userinvestment.transactionAmount, data.currency);
        const payment = await this.paymentRepository.createPayment({
            userInvestmentId: data.userInvestmentId,
            amount: convertedAmount,
            currency: data.currency,
        });
        return payment;
    }
}

export default TransactionService;
