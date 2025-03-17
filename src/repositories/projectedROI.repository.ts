import { injectable } from "tsyringe";
import ProjectedROI from "../models/projectedROI.model";


@injectable()
export class ProjectedROIRepository {

    async getUserInvestmentProjectedROI(userInvestmentId: string) {
        return await ProjectedROI.findAll({ where: { userInvestmentId } });
    }

    async createProjectedROI(data: any) {
        return await ProjectedROI.create(data);
    }

}