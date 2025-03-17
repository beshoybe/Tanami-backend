import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import AuthService from "../services/auth.service";
import { RegisterDTO, LoginDTO } from "../dtos/auth.dto";
import { AuthRequest } from "../middlewares/auth.middleware";


@injectable()
export class AuthController {
  constructor(@inject(AuthService) private readonly authService: AuthService) {}

  async register(req: Request, res: Response): Promise<void> {
    
    const userData:RegisterDTO = req.body;
    const user = await this.authService.register(userData);
    res.status(201).json(user);
  }

  async login(req: Request, res: Response): Promise<void> {
    const credentials:LoginDTO = req.body;

    const authResponse = await this.authService.login(credentials);
    res.status(200).json(authResponse);
  }

  async forgetPassword(req: Request, res: Response): Promise<void> {
    const data = req.body;
    await this.authService.forgetPassword(data);
    res.status(200).json({ message:req.t("response.otpSent") });
  }

    async confirmOtp(req: Request, res: Response): Promise<void> {
        const data = req.body;
        const token = await this.authService.confirmOtp(data);
        res.status(200).json({ message:req.t("response.otpConfirmed"),token: token });
    }

    async resetPassword(req: Request, res: Response): Promise<void> {
        const request = req as AuthRequest;
        const data = request.body;
        data.id =  request.user.id;
        await this.authService.resetPassword(data);
        res.status(200).json({ message:req.t("response.passwordReset") });
    }

}
