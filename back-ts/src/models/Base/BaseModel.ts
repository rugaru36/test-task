import { ObjectId } from 'mongodb';

export abstract class BaseDataModel {
  static modelName: string = String();
  _id: ObjectId = new ObjectId();
  created: number = Number();
  updated: number = Number();
  isExist: boolean = true;

  constructor(data: { [key: string]: any; }) {
    if (!data) { return; }
    if (typeof data.created == 'number') { this.created = data.created; }
    if (typeof data.updated == 'number') { this.updated = data.updated; }
    if (typeof data.isExist == 'boolean') { this.isExist = data.isExist; }
  }
}