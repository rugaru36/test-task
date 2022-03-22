"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
var BaseModel_1 = require("./Base/BaseModel");
var Payment = (function (_super) {
    __extends(Payment, _super);
    function Payment(data) {
        var _this = _super.call(this, data) || this;
        _this.cardNum = String();
        _this.cardCvv = String();
        _this.cardExpData = String();
        _this.amount = Number();
        if (typeof data.cardNum == 'string')
            _this.cardNum = data.cardNum;
        if (typeof data.cardCvv == 'string')
            _this.cardCvv = data.cardCvv;
        if (typeof data.cardExpData == 'string')
            _this.cardExpData = data.cardExpData;
        if (typeof data.amount == 'number')
            _this.amount = data.amount;
        return _this;
    }
    return Payment;
}(BaseModel_1.BaseDataModel));
exports.Payment = Payment;
Payment.modelName = "Payment";
//# sourceMappingURL=Payment.js.map