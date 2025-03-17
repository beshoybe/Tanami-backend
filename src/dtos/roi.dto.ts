import { Expose } from "class-transformer";
import { IsNumber, IsPositive, IsUUID, IsDate, IsEnum, IsNotEmpty } from "class-validator";
import { Currency } from "../enums/currency.enum";

export class ProjectedROIDTO {
    @Expose()
    @IsUUID()
    id!: string;

    @Expose()
    @IsUUID()
    userInvestmentId!: string;

    @Expose()
    @IsNumber()
    @IsPositive()
    roi!: number;

    @Expose()
    @IsNumber()
    @IsPositive()
    initialInvestment!: number;

    @Expose()
    @IsNumber()
    @IsPositive()
    finalValue!: number;

    @Expose()
    @IsDate()
    date!: Date;

    @Expose()
    @IsEnum(["USD", "EUR", "GBP"])
    @IsNotEmpty()
    currency!: Currency;
}

export class RealROIDTO {
    @Expose()
    @IsUUID()
    id!: string;

    @Expose()
    @IsUUID()
    userInvestmentId!: string;

    @Expose()
    @IsNumber()
    @IsPositive()
    actualReturn!: number;

    @Expose()
    @IsNumber()
    @IsPositive()
    initialInvestment!: number;

    @Expose()
    @IsNumber()
    @IsPositive()
    finalValue!: number;

    @Expose()
    @IsDate()
    date!: Date;
}
