import { inject, injectable } from "tsyringe";
import { AuthResponseDTO, ConfirmOtpDTO, ForgetPasswordDTO, LoginDTO, RegisterDTO, ResetPasswordDTO, UpdateUserDTO } from "../dtos/auth.dto";
import  UserRepository  from "../repositories/user.repository";
import { EmailAlreadyExistsError, EmailNotRegisteredError, ExpiredOtpError, InvalidOtpError, InvalidPasswordError } from "../errors/ApiError";
import { generateToken } from "../utils/tokenHelper";
import { plainToInstance } from "class-transformer";
import { UserDTO } from "../dtos/user.dto";
import { randomInt } from 'crypto'
import sendEmail from "../utils/emailHelper";

@injectable()
class AuthService {
  constructor(@inject(UserRepository) private readonly userRepository: UserRepository) {}

    async register(data: RegisterDTO) {
        const { email, } = data;
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) throw new EmailAlreadyExistsError();

        const user = await this.userRepository.createUser(data);
        const token = generateToken({ id: user.id, email: user.email }, "1h");

        // Correctly convert to DTO while excluding extra fields
        const userResponse = plainToInstance(UserDTO, user.toJSON(), { excludeExtraneousValues: true });


        const authResponse = plainToInstance(AuthResponseDTO, { token, user: userResponse });

        return authResponse;
    }


    async login(data: LoginDTO) {
        const { email, password } = data;

        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new EmailNotRegisteredError();

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) throw new InvalidPasswordError();

        const token = generateToken({ id: user.id, email: user.email }, "1h");

        // Correctly convert to DTO while excluding extra fields
        const userResponse = plainToInstance(UserDTO, user.toJSON(), { excludeExtraneousValues: true });


        const authResponse = plainToInstance(AuthResponseDTO, { token, user: userResponse });

        return authResponse;
    }

    async forgetPassword(data: ForgetPasswordDTO) {
        const user = await this.userRepository.findByEmail(data.email);
        if (!user) throw new EmailNotRegisteredError();
        const otp = randomInt(100000, 999999).toString();
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

        // ✅ Save OTP & expiry in the database
        user.otp = otp;
        user.otpExpires = otpExpiry;
        await user.save();

        // ✅ Create email content
        const html = `
            <p>Dear <b>${user.name}</b>,</p>
            <p>You have requested a password reset. Use the following OTP to reset your password:</p>

            <h2 style="color: #d9534f;">${otp}</h2>

            <p><b>Note:</b> This OTP is valid for <b>5 minutes</b>.</p>

            <p>If you did not request this, please ignore this email.</p>

            <p>Best Regards,</p>
            <h3>Tanami App Support Team</h3>
        `;

        // ✅ Send email
        await sendEmail({
            email: user.email,
            subject: "Password Reset Request",
            html: html,
        });
    }

    async confirmOtp(data : ConfirmOtpDTO){
      
        // ✅ Find the user
        const user = await this.userRepository.findByEmail(data.email);

        if (!user) {
            throw new EmailNotRegisteredError();
        }

        // ✅ Check if OTP is correct
        if (!user.otp || user.otp !== data.otp) {
            throw new InvalidOtpError();
        }
        console.log(new Date(), user.otpExpires);
        // ✅ Check if OTP is expired
        if (user.otpExpires && new Date() > user.otpExpires) {
            throw new ExpiredOtpError();
        }

        const token = generateToken({ id: user.id, email: user.email }, "5m");
        return token;
    }

    async resetPassword(data: ResetPasswordDTO,) {
        const user = await this.userRepository.findById(data.id);
        if (!user) throw new EmailNotRegisteredError();

        user.password = data.password;
        await user.save();
    }

    async updateUserData(data:UpdateUserDTO){
        const user = await this.userRepository.findById(data.id);
        if (!user) throw new EmailNotRegisteredError();

        user.name = data.name;
        user.email = data.email;
        await user.save();
    }


}

export default AuthService;
