import { Expose, Type } from "class-transformer";
import { IsNumber, IsEnum, IsNotEmpty, IsPositive, IsUUID, IsOptional, ValidateNested } from "class-validator";
import { InvestmentDTO } from "./investment.dto";
import { ProjectedROIDTO, RealROIDTO } from "./roi.dto";
import { PaymentDTO } from "./payment.dto";


export class CreateTransactionDTO {

    @IsNumber({}, { message: "validation.amount.invalid" })
    @IsPositive({ message: "validation.amount.positive" })
    @IsNotEmpty({ message: "validation.amount.required" })
    amount!: number;

    @IsNotEmpty({ message: "validation.currency.required" })
    @IsEnum(["USD", "EUR", "GBP"], { message: "validation.currency.invalid" })
    currency!: "USD" | "EUR" | "GBP";

    @IsUUID("4", { message: "validation.investmentId.invalid" })
    @IsNotEmpty({ message: "validation.investmentId.required" })
    investmentId!: string;
}




export class TransactionResponseDTO {
    @Expose()
    @IsUUID("4", { message: "validation.id.invalid" })
    @IsNotEmpty({ message: "validation.id.required" })
    id!: string;

    @Expose()
    @IsUUID("4", { message: "validation.userId.invalid" })
    @IsNotEmpty({ message: "validation.userId.required" })
    userId!: string;

    @Expose()
    @IsUUID("4", { message: "validation.investmentId.invalid" })
    @IsNotEmpty({ message: "validation.investmentId.required" })
    investmentId!: string;

    @Expose()
    @IsNumber({}, { message: "validation.amount.invalid" })
    @IsPositive({ message: "validation.amount.positive" })
    @IsNotEmpty({ message: "validation.amount.required" })
    transactionAmount!: number;

    @Expose()
    @IsNotEmpty({ message: "validation.currency.required" })
    @IsEnum(["USD", "EUR", "GBP"], { message: "validation.currency.invalid" })
    currency!: "USD" | "EUR" | "GBP";

    @Expose()
    @IsNotEmpty({ message: "validation.status.required" })
    @IsEnum(["active", "closed"], { message: "validation.status.invalid" })
    status!: "active" | "closed";

    @Expose()
    deleted!: boolean;

    @Expose()
    createdAt!: Date;

    @Expose()
    updatedAt!: Date;

    @Expose()
    @ValidateNested()
    @Type(() => InvestmentDTO)
    @IsOptional()
    investment?: InvestmentDTO;

    @Expose()
    @ValidateNested()
    @Type(() => ProjectedROIDTO)
    @IsOptional()
    projectedROI?: ProjectedROIDTO;

    @Expose()
    @ValidateNested()
    @Type(() => RealROIDTO)
    @IsOptional()
    realROI?: RealROIDTO;

    @Expose()
    @ValidateNested()
    @Type(() => PaymentDTO)
    @IsOptional()
    payments?: PaymentDTO[];
}
