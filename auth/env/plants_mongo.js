const { MongoClient } = require("mongodb");
const Environment = require("./environment");

const [fs, path, csv, response, Logger] = [
  require("fs"),
  require("path"),
  require("csv-parser"),
  require("robotic.js/src/class/response"),
  require("robotic.js/src/interface/Logger"),
];

class MongoPlants {
  constructor() {
    this.dbName = new Environment().dbName;
    this.client = new MongoClient(new Environment().uri);
    this.collection = new Environment().collection;
  }

  read() {
    const [results, array, batchSize] = [[], [], 500];

    fs.createReadStream(
      path.join(__dirname, "../../../assets/classification.csv")
    )
      .pipe(csv())
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", async () => {
        for (let index = 0; index < results.length; index++) {
          const element =
            results[index][
              "taxonID\tscientificNameID\tlocalID\tscientificName\ttaxonRank\tparentNameUsageID\tscientificNameAuthorship\tfamily\tsubfamily\ttribe\tsubtribe\tgenus\tsubgenus\tspecificEpithet\tinfraspecificEpithet\tverbatimTaxonRank\tnomenclaturalStatus\tnamePublishedIn\ttaxonomicStatus\tacceptedNameUsageID\toriginalNameUsageID\tnameAccordingToID\ttaxonRemarks\tcreated\tmodified\treferences\tsource\tmajorGroup\ttplID"
            ];
          array.push({
            family: element.split("\t")[7],
            subfamily: element.split("\t")[8],
            genus: element.split("\t")[11],
            subgenus: element.split("\t")[12],
            scientfiicname: element.split("\t")[3].replace(/^"|"$/g, ""),
            tribe: element.split("\t")[9],
          });
        }

        for (let i = 0; i < array.length; i += batchSize) {
          const batch = array.slice(i, i + batchSize);
          await this.write(batch);
          new Logger().log(
            `Processed batch ${i / batchSize + 1} of ${Math.ceil(
              results.length / batchSize
            )}`
          );
        }
      });
  }

  async connect() {
    try {
      await this.client.connect();
      new Logger().log("Connected to MongoDB");
    } catch (error) {
      return new Error(error);
    }
  }

  async connectLine() {
    try {
      await this.client.connect();
      const db = this.client.db(this.dbName);
      return db.collection(this.collection);
    } catch (error) {
      return new Error(error);
    }
  }

  async write(array) {
    const session = this.client.startSession();
    session.startTransaction();
    new Logger().log(array.length);

    try {
      const collection = await this.connectLine();

      await Promise.all([
        collection.insertMany(array, { session }),
        session.commitTransaction(),
      ]);

      new Logger().log("Transaction committed successfully");
    } catch (error) {
      await session.abortTransaction();
      new Logger().error(error);
    } finally {
      session.endSession();
    }
  }

  async close() {
    await this.client.close();
    new Logger().log("MongoDB connection closed");
  }

  async getAllDocuments() {
    try {
      const collection = await this.connectLine();
      const cursor = collection.find().limit(10);
      return new response().success(await cursor.toArray());
    } catch (error) {
      return new response().error(error);
    }
  }

  async getCountOfDocuments() {
    try {
      const collection = await this.connectLine();
      const count = await collection.countDocuments();
      return new response().success(count);
    } catch (error) {
      return new response().error(error);
    }
  }

  async getNameByProperty(input) {
    try {
      const collection = await this.connectLine();
      const query = collection.find({ family: input });
      return new response().success(await query.toArray());
    } catch (error) {
      console.error(error);
      return new response().error(error);
    }
  }

  async getCollectionByGenusName(input) {
    try {
      const collection = await this.connectLine()
      const query = collection.find({ genus: input });
      return new response().success(await query.toArray());
    } catch (error) {
      return new response().error(error);
    }
  }

  async getCollectionByScientificName(input) {
    try {
      const collection = await this.connectLine();
      const query = collection.find({ scientfiicname: input });
      return new response().success(await query.toArray());
    } catch (error) {
      return new response().error(error);
    }
  }

  async edit(body) {
    const collection = await this.connectLine();
    await collection.updateOne(
      { scientfiicname: body.scientfiicname },
      {
        $set: body,
      }
    );

    return new response().success("updated successfully!");
  }
}

module.exports = MongoPlants;
