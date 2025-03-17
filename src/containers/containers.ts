import { container } from "tsyringe";

// Importing the repositories
import UserRepository from "../repositories/user.repository";

// Importing the services
import AuthService from "../services/auth.service";


// importing controllers
import { AuthController } from "../controllers/auth.controller";
import InvestmentRepository from "../repositories/investment.repository";
import InvestmentService from "../services/investment.service";
import InvestmentController from "../controllers/investment.controller";
import UserInvestmentRepository from "../repositories/userInvestment.repository";
import TransactionService from "../services/transaction.service";
import { TransactionController } from "../controllers/transaction.controller";
import { ProjectedROIRepository } from "../repositories/projectedROI.repository";

// Registering auth feature

container.register("UserRepository", { useClass: UserRepository });
container.register("AuthService", { useClass: AuthService });
container.register("AuthController", { useClass: AuthController });

// Registring investment feature

container.register("InvestmentRepository", { useClass: InvestmentRepository });
container.register("InvestmentService", { useClass: InvestmentService });
container.register("InvestmentController", { useClass: InvestmentController });

// Registring transaction feature

container.register("TransactionRepository", { useClass: UserInvestmentRepository });
container.register("ProjectedROIRepository", { useClass: ProjectedROIRepository });
container.register("TransactionService", { useClass: TransactionService }); 
container.register("TransactionController", { useClass: TransactionController });


export default container;
