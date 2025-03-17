import { Router } from "express";
import { container } from "tsyringe";
import InvestmentController from "../controllers/investment.controller";
import { validateDto } from "../middlewares/dto.middleware";
import { CreateInvestmentDTO, UpdateInvestmentDTO } from "../dtos/investment.dto";

const investmentRouter = Router();

const investmentController = container.resolve(InvestmentController);

investmentRouter.get("/", (req, res)=>  investmentController.getInvestmentOptions(req, res).catch(req.next));
investmentRouter.get("/:id", (req, res) => investmentController.getInvestmentById(req, res).catch(req.next));
investmentRouter.post("/", validateDto(CreateInvestmentDTO),(req, res) => investmentController.createInvestment(req, res).catch(req.next));
investmentRouter.put("/:id",validateDto(UpdateInvestmentDTO), (req, res) => investmentController.updateInvestment(req, res).catch(req.next));
investmentRouter.delete("/:id", (req, res) => investmentController.deleteInvestment(req, res).catch(req.next));

export default investmentRouter;

