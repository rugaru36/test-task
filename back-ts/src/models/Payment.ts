import { BaseDataModel } from "./Base/BaseModel";

export class Payment extends BaseDataModel {
  public cardNum: string = String();
  public cardCvv: string = String();
  public cardExpData: string = String();
  public amount: number = Number();

  constructor(data: { [key: string]: any; }) {
    super(data);
    if (typeof data.cardNum == 'string') this.cardNum = data.cardNum;
    if (typeof data.cardCvv == 'string') this.cardCvv = data.cardCvv;
    if (typeof data.cardExpData == 'string') this.cardExpData = data.cardExpData;
    if (typeof data.amount == 'number') this.amount = data.amount;
  }
}

Payment.modelName = "Payment";