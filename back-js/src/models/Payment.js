const BaseDataModel = require("./Base/BaseModel");

class Payment extends BaseDataModel {
  cardNum = String();
  cardCvv = String();
  cardExpData = String();
  amount = Number();

  constructor(data) {
    super(data);
    if (typeof data.cardNum == 'string') this.cardNum = data.cardNum;
    if (typeof data.cardCvv == 'string') this.cardCvv = data.cardCvv;
    if (typeof data.cardExpData == 'string') this.cardExpData = data.cardExpData;
    if (typeof data.amount == 'number') this.amount = data.amount;
  }
}

Payment.modelName = "Payment";

module.exports = Payment;