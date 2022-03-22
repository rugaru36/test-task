import { Request, Response } from 'express';
import { PaymentService } from '../services/Payment/PaymentService';
import { CreatePaymentInput } from '../services/Payment/types/paymentTypes';

export const postPaymentCreate = async (req: Request, res: Response) => {
  try {
    const paymentService = new PaymentService();
    const response = await paymentService.createPayment(req.body as CreatePaymentInput);
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

export const getPaymentAll = async (req: Request, res: Response) => {
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