import { Router } from "express";
import { container } from "tsyringe";
import { TransactionController } from "../controllers/transaction.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validateDto } from "../middlewares/dto.middleware";
import { CreateTransactionDTO } from "../dtos/transaction.dto";
import { CreatePaymentDTO } from "../dtos/payment.dto";

const transactionRoutr = Router();
const transactionController = container.resolve(TransactionController);

transactionRoutr.post("/", authMiddleware(),validateDto(CreateTransactionDTO), (req, res) => transactionController.createTransaction(req, res).catch(req.next));
transactionRoutr.get("/", authMiddleware(), (req, res) => transactionController.getUserTransactions(req, res).catch(req.next));
transactionRoutr.delete("/:id", authMiddleware(), (req, res) => transactionController.deleteTransaction(req, res).catch(req.next));
transactionRoutr.get("/:id", authMiddleware(), (req, res) => transactionController.getTransactionById(req, res).catch(req.next));
transactionRoutr.post("/payment", authMiddleware(),validateDto(CreatePaymentDTO), (req, res) => transactionController.createPayment(req, res).catch(req.next));
transactionRoutr.get("/payment/:id", authMiddleware(), (req, res) => transactionController.getPaymentById(req, res).catch(req.next));
transactionRoutr.post("/payment/success/:id", authMiddleware(), (req, res) => transactionController.mockSuccessfulPayment(req, res).catch(req.next));
transactionRoutr.post("/payment/failed/:id", authMiddleware(), (req, res) => transactionController.mockFailedPayment(req, res).catch(req.next));

export default transactionRoutr;
