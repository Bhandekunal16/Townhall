const { MongoClient } = require("mongodb");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const response = require("robotic.js/src/class/response");
const Logger = require("robotic.js/src/interface/Logger");

class MongoPlants {
  constructor() {
    this.uri =
      "mongodb+srv://bhandekunal16:SppcHRFdBS74An8v@cluster0.xxevqv7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    this.dbName = "Plants";
    this.client = new MongoClient(this.uri);
    this.collection = "Nomenclature";
  }

  read() {
    const results = [];
    fs.createReadStream(path.join(__dirname, "../../assets/classification.csv"))
      .pipe(csv())
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", async () => {
        let array = [];
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
            scientfiicname: element.split("\t")[3],
            tribe: element.split("\t")[9],
          });
        }

        const batchSize = 500;

        for (let i = 0; i < array.length; i += batchSize) {
          const batch = array.slice(i, i + batchSize);
          await this.write(batch);

          console.log(
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
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB", error);
      throw error;
    }
  }

  async write(array) {
    const session = this.client.startSession();
    session.startTransaction();
    console.log(array.length);

    try {
      const db = this.client.db(this.dbName);
      const collection = db.collection(this.collection);

      await collection.insertMany(array, { session });

      await session.commitTransaction();
      console.log("Transaction committed successfully");
    } catch (error) {
      await session.abortTransaction();
      console.error("Error processing index ", error);
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
      await this.client.connect();
      const database = this.client.db(this.dbName);
      const collection = database.collection(this.collection);
      const cursor = collection.find().limit(1000);
      return new response().success(await cursor.toArray());
    } catch (error) {
      return new response().error(error);
    }
  }

  async getCountOfDocuments() {
    try {
      await this.client.connect();
      const database = this.client.db(this.dbName);
      const collection = database.collection(this.collection);
      const count = await collection.countDocuments();
      return count;
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

module.exports = MongoPlants;
