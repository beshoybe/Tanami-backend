import { inject, injectable } from "tsyringe";
import InvestmentService from "../services/investment.service";
import { Request, Response } from "express";


@injectable()
export default class InvestmentController {
    constructor(@inject(InvestmentService) private readonly investmentService: InvestmentService) {}

    async getInvestmentOptions(req: Request, res: Response): Promise<void> {
        const investments = await this.investmentService.getInvestmentOptions();
        res.status(200).json(investments);
    }

    async getInvestmentById(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const investment = await this.investmentService.getInvestmentById(id);
        res.status(200).json(investment);
    }

    async createInvestment(req: Request, res: Response): Promise<void> {
        const data = req.body;
        const investment = await this.investmentService.createInvestment(data);
        res.status(201).json(investment);
    }

    async updateInvestment(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const data = req.body;
        const investment =  await this.investmentService.updateInvestment(id, data);
        res.status(200).json({ message: req.t("response.investmentUpdated"), investment });
    }

    async deleteInvestment(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        await this.investmentService.deleteInvestment(id);
        res.status(200).json({ message: "Investment deleted successfully" });
    }
}