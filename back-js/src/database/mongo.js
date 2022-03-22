const { ObjectId } = require('mongodb');
const { MongoClient } = require('mongodb');

class MongoDBManager {
  connectUrl = 'mongodb+srv://rug4ru:rug4ru31415@cluster0.xil3n.mongodb.net/test?retryWrites=true&w=majority';
  client = new MongoClient(this.connectUrl);
  dbName = String();
  isConnectionOpened = Boolean();

  setDbName(newName) {
    this.dbName = newName;
  }

  async getAll(collectionName) {
    await this.openConnection();
    const db = this.client.db(this.dbName);
    const collection = db.collection(collectionName);
    const result = await collection.find({}).toArray();
    await this.closeConnection();
    return result;
  }

  async getById(id, collectionName) {
    await this.openConnection();
    const db = this.client.db(this.dbName);
    const collection = db.collection(collectionName);
    const result = await collection.findOne({ _id: new ObjectId(id) }) ?? null;
    await this.closeConnection();
    return result;
  }

  async save(newElement, collectionName) {
    try {
      await this.openConnection();
      await this.ensureCollectionExists(collectionName);
      const db = this.client.db(this.dbName);
      const collection = db.collection(collectionName);
      newElement.created = Date.now() / 1000;
      newElement.updated = Date.now() / 1000;
      await collection.insertOne(newElement);
      await this.closeConnection();
    } catch (e) {
      e instanceof Error ? console.error(e.message) : console.error(e);
      throw e;
    }
  }

  async updateById(id, dataToUpdate, collectionName) {
    const collection = await this.getCollection(collectionName);
    await collection.updateOne({ '_id': new ObjectId(id) }, dataToUpdate);
    await this.closeConnection();
  }

  async getCollection(collectionName) {
    await this.openConnection();
    const db = this.client.db(this.dbName);
    return db.collection(collectionName);
  }

  async openConnection() {
    if (!this.isConnectionOpened) {
      await this.client.connect();
      this.isConnectionOpened = true;
    }
  }

  async closeConnection() {
    if (this.isConnectionOpened) {
      await this.client.close();
      this.isConnectionOpened = false;
    }
  }

  // opened connection required
  ensureCollectionExists(collectionName) {
    return new Promise((resolve) => {
      const db = this.client.db(this.dbName);
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

module.exports = MongoDBManager;