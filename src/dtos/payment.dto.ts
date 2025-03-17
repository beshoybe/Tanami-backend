import { Expose } from "class-transformer";
import { IsUUID, IsNumber, IsPositive, IsEnum, IsOptional, IsNotEmpty } from "class-validator";

export class PaymentDTO {
  @Expose()
  @IsUUID()
  id!: string;

  @Expose()
  @IsUUID()
  userInvestmentId!: string;

  @Expose()
  @IsNumber()
  @IsPositive()
  amount!: number;

  @Expose()
  @IsEnum(["USD", "EUR", "GBP"])
  currency!: "USD" | "EUR" | "GBP";

  @Expose()
  @IsEnum(["pending", "completed", "failed"])
  @IsOptional()
  status!: "pending" | "completed" | "failed";
}

export class CreatePaymentDTO  {

  @Expose()
  @IsEnum(["USD", "EUR", "GBP"])
  @IsNotEmpty({ message: "validation.currency.required" })
  currency!: "USD" | "EUR" | "GBP";

  @Expose()
  @IsUUID()
  @IsNotEmpty({ message: "validation.userInvestmentId.required" })
  userInvestmentId!: string;
}

export class GetPaymentsDTO {
  @Expose()
  @IsUUID()
  @IsNotEmpty({ message: "validation.id.required" })
  id!: string;
}