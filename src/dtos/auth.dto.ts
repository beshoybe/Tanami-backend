import { IsEmail, IsString, MinLength, IsNotEmpty } from "class-validator";
import { UserDTO } from "./user.dto";

export class LoginDTO {
    @IsEmail({}, { message: "validation.email.invalid" })
    @IsNotEmpty({ message: "validation.email.required" }) // Ensure the field is required
    email!: string;

    @IsString()
    @MinLength(6, { message: "validation.password.min" })
    @IsNotEmpty({ message: "validation.password.required" }) // Ensure the field is required
    password!: string;

}


export class RegisterDTO {
    @IsString()
    @IsNotEmpty({ message: "validation.name.required" }) // Ensure the field is required
    name!: string;

    @IsEmail({}, { message: "validation.email.invalid" })
    @IsNotEmpty({ message: "validation.email.required" }) // Ensure the field is required
    email!: string;

    @IsString()
    @MinLength(6, { message: "validation.password.min" })
    @IsNotEmpty({ message: "validation.password.required" }) // Ensure the field is required
    password!: string;
}

export class ForgetPasswordDTO {
    @IsEmail({}, { message: "validation.email.invalid" })
    @IsNotEmpty({ message: "validation.email.required" }) // Ensure the field is required
    email!: string;
}

export class ConfirmOtpDTO {
    @IsString()
    @IsNotEmpty({ message: "validation.otp.required" }) // Ensure the field is required
    otp!: string;

    @IsString()
    @IsEmail({}, { message: "validation.email.invalid" })
    @IsNotEmpty({ message: "validation.email.required" }) // Ensure the field is required
    email!: string;
}

export class ResetPasswordDTO {
    @IsString()
    @MinLength(6, { message: "validation.password.min" })
    @IsNotEmpty({ message: "validation.password.required" }) // Ensure the field is required
    password!: string;

    @IsString()
    id?: string;
}

export class UpdateUserDTO {
    @IsString()
    @IsNotEmpty({ message: "validation.name.required" }) // Ensure the field is required
    name!: string;

    @IsEmail({}, { message: "validation.email.invalid" })
    @IsNotEmpty({ message: "validation.email.required" }) // Ensure the field is required
    email!: string;

    @IsString()
    id?: string;
}


export class AuthResponseDTO {
    
    @IsString()
    token!: string;

    @IsNotEmpty()
    user!: UserDTO;
    
}