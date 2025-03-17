import { injectable } from "tsyringe";
import Investment from "../models/investment.model";
import { InvestmenNotFoundError } from "../errors/ApiError";
import { plainToInstance } from "class-transformer";
import { InvestmentDTO } from "../dtos/investment.dto";
@injectable()
class InvestmentRepository {
    async getAllInvestments() {
        const investments = await Investment.findAll();
        return plainToInstance(InvestmentDTO, investments, { excludeExtraneousValues: true });

    }

    async getInvestmentById(id: string) {
        const investment = await Investment.findByPk(id);
        if (!investment) {
            throw new InvestmenNotFoundError();
        }
        return plainToInstance(InvestmentDTO, investment, { excludeExtraneousValues: true });
    }

    async createInvestment(data: any) {
        return await Investment.create(data);
    }

    async updateInvestment(id: string, data: any) {
        const investment = await Investment.findByPk(id);
        if (!investment) {
            throw new InvestmenNotFoundError();
        }
        await investment.update(data);
        return investment;
    }

    async deleteInvestment(id: string) {
        const investment = await Investment.findByPk(id);
        if (!investment) {
            throw new Error("Investment not found");
        }
        investment.deleted = true;
        await investment.save();
    }


}

export default InvestmentRepository;
