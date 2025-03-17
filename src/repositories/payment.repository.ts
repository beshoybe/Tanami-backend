import { injectable } from "tsyringe";
import { PaymentDTO } from "../dtos/payment.dto";
import Payment from "../models/payement.model";

@injectable()
class PaymentRepository {
  // ✅ Create a new payment
  async createPayment(data: Partial<PaymentDTO>): Promise<Payment> {
    return await Payment.create(data);
  }

  // ✅ Get payment by ID
  async getPaymentById(id: string, userInvestmentId?: string): Promise<Payment | null> {
    const where: any = { id, deleted: false };
    if (userInvestmentId) where.userInvestmentId = userInvestmentId;
    return await Payment.findOne({ where });
  }
  

  // ✅ Get all payments (with optional filtering by status)
  async getAllPayments(status?: "pending" | "completed" | "failed"): Promise<Payment[]> {
    const where: any = { deleted: false };
    if (status) where.status = status;
    return await Payment.findAll({ where });
  }

  // ✅ Get payments by userInvestmentId
  async getPaymentsByInvestment(userInvestmentId: string): Promise<Payment[]> {
    return await Payment.findAll({
      where: { userInvestmentId, deleted: false },
    });
  }

  // ✅ Update payment status
  async updatePaymentStatus(id: string, status: "pending" | "completed" | "failed"): Promise<[number, Payment[]]> {
    return await Payment.update({ status }, { where: { id, deleted: false }, returning: true });
  }

  // ✅ Soft delete a payment
  async softDeletePayment(id: string): Promise<number> {
    return await Payment.update({ deleted: true }, { where: { id } }).then(([count]) => count);
  }

  // ✅ Restore a soft-deleted payment
  async restorePayment(id: string): Promise<number> {
    return await Payment.update({ deleted: false }, { where: { id } }).then(([count]) => count);
  }
}

export default PaymentRepository;
