import { inject, injectable } from "tsyringe";
import InvestmentRepository from "../repositories/investment.repository";
import { CreateInvestmentDTO } from "../dtos/investment.dto";


@injectable()
export default class InvestmentService {
  constructor(@inject(InvestmentRepository) private readonly investmentRepository: InvestmentRepository) {}

    async getInvestmentOptions() {
        return await this.investmentRepository.getAllInvestments();
    }

    async getInvestmentById(id: string) {
        return await this.investmentRepository.getInvestmentById(id);
    }

    async createInvestment(data: CreateInvestmentDTO) {
        
        return await this.investmentRepository.createInvestment(data);
    }

    async updateInvestment(id: string, data: any) {
        return await this.investmentRepository.updateInvestment(id, data);
    }

    async deleteInvestment(id: string) {
        return await this.investmentRepository.deleteInvestment(id);
    }
}