export type CreatePaymentInput = {
  cardNum: string;
  cardCvv: string;
  cardExpDate: string;
  amount: number;
};

export type CreatePaymentOutput = {
  paymentId: string;
  amount: number;
};