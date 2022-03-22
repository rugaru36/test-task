const PaymentService = require('../services/Payment/PaymentService');

exports.postPaymentCreate = async (req, res) => {
  try {
    const paymentService = new PaymentService();
    const response = await paymentService.createPayment(req.body);
    return res.json(response);
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
      return res.json({ error: e.message });
    }
    else {
      console.error(e);
      return res.json({ error: e });
    }
  }
};

exports.getPaymentAll = async (req, res) => {
  try {
    const paymentService = new PaymentService();
    const result = await paymentService.getAllPayments();
    return res.json(result);
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
      return res.json({ error: e.message });
    }
    else {
      console.error(e);
      return res.json({ error: e });
    }
  }
};
