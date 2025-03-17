import UserInvestments from "../models/userInvestments.model";
import ProjectedROI from "../models/projectedROI.model";
import RealROI from "../models/realROI.model";
import Investment from "../models/investment.model";
import Payment from "../models/payement.model";
import { InvestmenNotFoundError } from "../errors/ApiError";

class UserInvestmentRepository {
    async createUserInvestment(data: any) {
        return await UserInvestments.create(data);
    }

    async getUserInvestments(userId: string) {
        return await UserInvestments.findAll({ 
            where: { userId },
            attributes: { exclude: ["investmentId"] },
            include: [
                {
                    model: ProjectedROI,
                    as: "projectedROI", 
                    attributes: { exclude: ["userInvestmentId"] },
                },
                {
                    model: RealROI,
                    as: "realROI", 
                    attributes: { exclude: ["userInvestmentId"] },
                },
                {
                    model: Investment,
                    as: "investment", 
                    attributes: { exclude: ["investmentId"] },
                },
                {
                    model:Payment,
                    as: "payments",
                    attributes: { exclude: ["userInvestmentId"] },
                   
                }
            ],
            
        });
    }

    async getUserInvestmentById(userInvestmentId: string) {
        return await UserInvestments.findByPk(userInvestmentId, {
            attributes: { exclude: ["investmentId"] },
            include: [
                {
                    model: ProjectedROI,
                    as: "projectedROI", 
                    attributes: { exclude: ["userInvestmentId"] },
                },
                {
                    model: RealROI,
                    as: "realROI", 
                    attributes: { exclude: ["userInvestmentId"] },
                },
                {
                    model: Investment,
                    as: "investment", 
                    attributes: { exclude: ["investmentId"] },
                },
                {
                    model:Payment,
                    as: "payments",
                    attributes: { exclude: ["userInvestmentId"] },
                   
                }
              
            ],

        });
    }

    async getUserInvestmentByUserId(userInvestmentId: string,userId: string) {
        return await UserInvestments.findOne( {
            where: {
                
                id:userInvestmentId,
                userId:userId
             },
            attributes: { exclude: ["investmentId"] },
            include: [
                {
                    model: ProjectedROI,
                    as: "projectedROI", 
                    attributes: { exclude: ["userInvestmentId"] },
                },
                {
                    model: RealROI,
                    as: "realROI", 
                    attributes: { exclude: ["userInvestmentId"] },
                },
                {
                    model: Investment,
                    as: "investment", 
                    attributes: { exclude: ["investmentId"] },
                },
                {
                    model:Payment,
                    as: "payments",
                    attributes: { exclude: ["userInvestmentId"] },
                   
                }   
            ]
                  
            });
        };


    async deleteUserInvestment(userInvestmentId: string) {
        const userInvestment = await UserInvestments.findByPk(userInvestmentId);
        if (!userInvestment) {
            throw new InvestmenNotFoundError();
        }
         userInvestment.deleted = true;
        await userInvestment.save();
        return userInvestment;
    }
}

export default UserInvestmentRepository;
