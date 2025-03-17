import { injectable } from "tsyringe";
import UserInvestment from "../models/userInvestments.model";

@injectable()
class TransactionRepository {
    async createTransaction(data: any) {
        return await UserInvestment.create(data);
    }

    async getUserTransactions(userId: number) {
        return await UserInvestment.findAll({ where: { userId } });
    }
}

export default TransactionRepository;
