import { Router } from "express";
import authRouter from "./routes/auth.routes";
import transactionRouter from "./routes/transaction.routes";
import investmentRouter from "./routes/investment.routes";
const router =  Router();

router.use("/auth", authRouter);
router.use("/transaction", transactionRouter);
router.use("/investment", investmentRouter);

export default router;