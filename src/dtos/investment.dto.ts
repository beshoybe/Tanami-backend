import { Expose } from "class-transformer";
import { IsString, IsUUID, IsNotEmpty, IsOptional, IsBoolean, IsNumber } from "class-validator";

export class InvestmentDTO {
    @Expose()
    @IsUUID()
    id!: string;

    @Expose()
    @IsString()
    @IsNotEmpty({ message: "validation.name.required" })
    name!: string;

    @Expose()
    @IsString()
    @IsOptional()
    description?: string;

    @Expose()
    @IsNumber()
    @IsNotEmpty({ message: "validation.monthlyExpectedReturn.required" })
    monthlyExpectedReturn!: number;

    @Expose()
    @IsBoolean()
    active!: boolean;

    @Expose()
    @IsBoolean()
    deleted!: boolean;

    @Expose()
    @IsOptional()
    readonly createdAt?: Date;

    @Expose()
    @IsOptional()
    readonly updatedAt?: Date;
}



export class CreateInvestmentDTO {
    @IsString()
    @IsNotEmpty({ message: "validation.name.required" })
    name!: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNotEmpty({message: "validation.monthlyExpectedReturn.required"})
    monthlyExpectedReturn!: number;
}

export class UpdateInvestmentDTO {
    @IsString()
    @IsOptional()
    name!: string;

    @IsString()
    @IsOptional()
    description?: string;
    @IsOptional()
    monthlyExpectedReturn!: number;
}