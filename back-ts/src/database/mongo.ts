import { Collection, Db as MongoDb, MongoClient, ObjectId } from 'mongodb';
import { BaseDataModel } from '../models/Base/BaseModel';

export class MongoDBManager {
  private readonly connectUrl = 'mongodb+srv://rug4ru:rug4ru31415@cluster0.xil3n.mongodb.net/test?retryWrites=true&w=majority';
  private client: MongoClient = new MongoClient(this.connectUrl);
  private dbName: string = String();
  private isConnectionOpened: boolean = Boolean();

  public setDbName(newName: string) {
    this.dbName = newName;
  }

  public async getAll<Model extends BaseDataModel>(collectionName: string): Promise<Model[]> {
    await this.openConnection();
    const db: MongoDb = this.client.db(this.dbName);
    const collection: Collection = db.collection(collectionName);
    const result: Model[] = (await collection.find({}).toArray()) as Model[];
    await this.closeConnection();
    return result;
  }

  public async getById<Model extends BaseDataModel>(id: string, collectionName: string): Promise<Model | null> {
    await this.openConnection();
    const db: MongoDb = this.client.db(this.dbName);
    const collection: Collection = db.collection(collectionName);
    const result: Model | null = await collection.findOne({ _id: new ObjectId(id) }) as Model ?? null;
    await this.closeConnection();
    return result;
  }

  public async save<Model extends BaseDataModel>(newElement: Model, collectionName: string): Promise<void> {
    try {
      await this.openConnection();
      await this.ensureCollectionExists(collectionName);
      const db: MongoDb = this.client.db(this.dbName);
      const collection: Collection = db.collection(collectionName);
      newElement.created = Date.now() / 1000;
      newElement.updated = Date.now() / 1000;
      await collection.insertOne(newElement);
      await this.closeConnection();
    } catch (e) {
      e instanceof Error ? console.error(e.message) : console.error(e);
      throw e;
    }
  }

  public async updateById(id: string, dataToUpdate: { [key: string]: any; }, collectionName: string) {
    const collection: Collection = await this.getCollection(collectionName);
    await collection.updateOne({ '_id': new ObjectId(id) }, dataToUpdate);
    await this.closeConnection();
  }

  public async getCollection(collectionName: string): Promise<Collection> {
    await this.openConnection();
    const db: MongoDb = this.client.db(this.dbName);
    return db.collection(collectionName);
  }

  private async openConnection() {
    if (!this.isConnectionOpened) {
      await this.client.connect();
      this.isConnectionOpened = true;
    }
  }

  private async closeConnection() {
    if (this.isConnectionOpened) {
      await this.client.close();
      this.isConnectionOpened = false;
    }
  }

  // opened connection required
  private ensureCollectionExists(collectionName: string): Promise<void> {
    return new Promise<void>((resolve) => {
      const db: MongoDb = this.client.db(this.dbName);
      db.listCollections({ name: collectionName })
        .next(function (err, collInfo) {
          if (!collInfo) {
            db.createCollection(collectionName).then(() => { resolve(); });
          }
          resolve();
        });
    });
  }
}