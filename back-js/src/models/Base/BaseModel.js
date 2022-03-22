const { ObjectId } = require('mongodb');

class BaseDataModel {
  static modelName = String();
  _id = new ObjectId();
  created = Number();
  updated = Number();
  isExist = true;

  constructor(data) {
    if (!data) { return; }
    if (typeof data.created == 'number') { this.created = data.created; }
    if (typeof data.updated == 'number') { this.updated = data.updated; }
    if (typeof data.isExist == 'boolean') { this.isExist = data.isExist; }
  }
}

module.exports = BaseDataModel;