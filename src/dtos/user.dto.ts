import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsString, IsNotEmpty, IsBoolean, IsOptional, IsDate } from "class-validator";

export class UserDTO {
    @Expose()
    @IsString()
    @IsNotEmpty({ message: "validation.id.required" }) 
    id!: string;

    @Expose()
    @IsString()
    @IsNotEmpty({ message: "validation.name.required" }) 
    name!: string;

    @Expose()
    @IsEmail({}, { message: "validation.email.invalid" })
    @IsNotEmpty({ message: "validation.email.required" }) 
    email!: string;

    @Expose()
    @IsBoolean()
    @IsNotEmpty({ message: "validation.verified.required" }) 
    verified!: boolean;

    @Expose()
    @IsBoolean()
    @IsNotEmpty({ message: "validation.active.required" })
    active!: boolean;

    @Expose()
    @IsBoolean()
    @IsOptional()
    deleted?: boolean;

    @Expose()
    @IsOptional()
    @IsDate()
    createdAt?: Date;

    @Expose()
    @IsOptional()
    @IsDate()
    updatedAt?: Date;


    @Exclude() // Exclude password from serialization
    password!: string;
}
