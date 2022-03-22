"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDataModel = void 0;
var mongodb_1 = require("mongodb");
var BaseDataModel = (function () {
    function BaseDataModel(data) {
        this._id = new mongodb_1.ObjectId();
        this.created = Number();
        this.updated = Number();
        this.isExist = true;
        if (!data) {
            return;
        }
        if (typeof data.created == 'number') {
            this.created = data.created;
        }
        if (typeof data.updated == 'number') {
            this.updated = data.updated;
        }
        if (typeof data.isExist == 'boolean') {
            this.isExist = data.isExist;
        }
    }
    BaseDataModel.modelName = String();
    return BaseDataModel;
}());
exports.BaseDataModel = BaseDataModel;
//# sourceMappingURL=BaseModel.js.map