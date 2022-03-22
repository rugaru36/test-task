const MongoDBManager = require("../../database/mongo");
const Payment = require("../../models/Payment");

class PaymentService {
  mongoManager = new MongoDBManager;
  constructor() { }

  async createPayment(input) {
    try {
      const newPayment = new Payment(input);
      await this.mongoManager.save(newPayment, Payment.modelName);
      const result = { amount: newPayment.amount, paymentId: newPayment._id.toString() };
      return result;
    } catch (e) {
      e instanceof Error ? console.error(e.message) : console.error(e);
      throw e;
    }
  }

  async getAllPayments() {
    const result = await this.mongoManager.getAll(Payment.modelName);
    return result;
  }
}

module.exports = PaymentService;