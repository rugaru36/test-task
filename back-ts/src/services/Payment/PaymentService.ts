import { MongoDBManager } from "../../database/mongo";
import { Payment } from "../../models/Payment";
import { CreatePaymentInput, CreatePaymentOutput } from "./types/paymentTypes";


export class PaymentService {
  private mongoManager: MongoDBManager = new MongoDBManager;
  constructor() { }

  public async createPayment(input: CreatePaymentInput): Promise<CreatePaymentOutput> {
    try {
      const newPayment = new Payment(input);
      await this.mongoManager.save<Payment>(newPayment, Payment.modelName);
      const result: CreatePaymentOutput = { amount: newPayment.amount, paymentId: newPayment._id.toString() };
      return result;
    } catch (e) {
      e instanceof Error ? console.error(e.message) : console.error(e);
      throw e;
    }
  }

  public async getAllPayments(): Promise<Payment[]> {
    const result: Payment[] = await this.mongoManager.getAll<Payment>(Payment.modelName);
    return result;
  }
}