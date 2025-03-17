import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import TransactionService from "../services/transaction.service";
import { CreateTransactionDTO } from "../dtos/transaction.dto";
import { AuthRequest } from "../middlewares/auth.middleware";

@injectable()
export class TransactionController {
    constructor(@inject(TransactionService) private readonly transactionService: TransactionService) {}

    async createTransaction(req: Request, res: Response): Promise<void> {
        const request = req as AuthRequest;
        const userId = request.user.id;
        const transactionData: CreateTransactionDTO = req.body;

        const transaction = await this.transactionService.createUserInvestment(userId, transactionData);
        res.status(201).json({message:req.t("response.transactionCreated"), transaction});
    }

    async getUserTransactions(req: Request, res: Response): Promise<void> {
        const request = req as AuthRequest;
        const userId = request.user.id;

        const transactions = await this.transactionService.getUserInvestments(userId);
        res.status(200).json(transactions);
    }

    async getTransactionById(req: AuthRequest, res: Response): Promise<void> {
        const id = req.params.id;
        const userId = req.user.id;
        const transaction = await this.transactionService.getUserInvestmentById(
            userId,
            id
        );
        res.status(200).json(transaction);
    }

    async deleteTransaction(req: AuthRequest, res: Response): Promise<void> {
        const id = req.params.id;
        const userId = req.user.id;
        await this.transactionService.deleteUserInvestment(id, userId);
        res.status(200).json({ message: req.t("response.transactionDeleted") });
    }

    async getPaymentById(req: AuthRequest, res: Response): Promise<void> {
        const paymentId = req.params.id;
        const userId = req.user.id;
        const payment = await this.transactionService.getPaymentById(paymentId,userId);
        res.status(200).json(payment);
    }

    async mockSuccessfulPayment(req: Request, res: Response): Promise<void> {
        const paymentId = req.params.id;
        const payment = await this.transactionService.mockSuccessfulPayment(paymentId);
        res.status(200).json(payment);
    }

    async mockFailedPayment(req: Request, res: Response): Promise<void> {
        const paymentId = req.params.id;
        const payment = await this.transactionService.mockFailedPayment(paymentId);
        res.status(200).json(payment);
    }

    async createPayment(req: Request, res: Response): Promise<void> {
        const data = req.body;
        const payment = await this.transactionService.createPayment(data);
        res.status(201).json(payment);
    }

}
