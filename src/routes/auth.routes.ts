import { Router } from "express";
import { container } from "tsyringe";
import { AuthController } from "../controllers/auth.controller";
import { validateDto } from "../middlewares/dto.middleware";
import { ForgetPasswordDTO, LoginDTO, RegisterDTO } from "../dtos/auth.dto";
import { authMiddleware } from "../middlewares/auth.middleware";

const authRouter = Router();
const authController = container.resolve(AuthController);

authRouter.post("/register",validateDto(RegisterDTO), (req, res) => authController.register(req, res).catch(req.next));
authRouter.post("/login",validateDto(LoginDTO), (req, res) => authController.login(req, res).catch(req.next));
authRouter.post("/forget-password", validateDto(ForgetPasswordDTO),(req, res) => authController.forgetPassword(req, res).catch(req.next));
authRouter.post("/confirm-otp", (req, res) => authController.confirmOtp(req, res).catch(req.next));
authRouter.post("/reset-password",authMiddleware(), (req, res) => authController.resetPassword(req, res).catch(req.next));
export default authRouter;
