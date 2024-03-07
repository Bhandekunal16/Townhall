const express = require("express");
const bodyParser = require("body-parser");
const Color = require("robotic.js/interface/color");
const Logger = require("robotic.js/interface/Logger");
const OtpCrater = require("./src/otp");
const Uuid = require("./src/uuid");
const SortService = require("./src/stringSort");
const BinaryLocker = require("./src/binaryEncrypted");
const DataGenerator = require("./src/DataGenerator");
const Node = require("./module/index");
const Authorized = require("./auth/env/authorized");

const app = express();
app.use(bodyParser.json());
const port = 3004;

const otp = new OtpCrater();
const uuid = new Uuid();
const sort = new SortService();
const color = new Color();
const data = new DataGenerator();
const logger = new Logger();
const locker = new BinaryLocker();
const node = new Node();
const authorized = new Authorized();

app.get("/", async (req, res) => {
  const query = "hello world";
  res.send(query);
});

app.get("/create/account", async (req, res) => {
  const query = await account.createAccount();
  const data = query.map((value) => value);
  res.send(data);
});

app.get("/create/otp", async (req, res) => {
  const query = await otp.otpCreate();
  res.status(200).send(query);
});

app.get("/create/uuid", async (req, res) => {
  const query = await uuid.generateUUID();
  res.status(200).send(query);
});

app.post("/sort/string", async (req, res) => {
  const requestData = req.body;
  const query = await sort.write(
    requestData.data,
    Object.getOwnPropertyNames(requestData)
  );
  await res
    .status(200)
    .send({ data: query.value, msg: `${query.status}`, status: query.status });
});

app.post("/store", async (req, res) => {
  const requestData = req.body;
  const header = req.hostname;
  const query = await locker.createBinaryFile(
    requestData.data,
    requestData.name,
    header
  );

  await res.status(200).send({ data: query, msg: "success", status: true });
});

app.post("/random", async (req, res) => {
  const query = await data.create(req.body.length, req.body.type);
  await res.status(200).send(query);
});

app.post("/ifsc", async (req, res) => {
  const query = await authorized.main(req.body.ifsc);
  await res.status(200).send(query);
});

app.post("/pincode", async (req, res) => {
  const query = await authorized.postal(req.body.pinCode);
  await res.status(200).send(query);
});

app.post("/info", async (req, res) => {
  const query = await authorized
    .getPackageInfo(req.body.name)
    .then((packageInfo) => {
      if (packageInfo) {
        return packageInfo;
      }
    });
  const ans = query
    ? {
        data: query,
        status: true,
        statusCode: 200,
        msg: `successfully fund data : ${req.body.name}`,
      }
    : {
        data: null,
        status: false,
        statusCode: 404,
        msg: `not fund data : ${res.body.name}`,
      };
  await res.status(200).send(ans);
});

app.post("/search", async (req, res) => {
  const query = await authorized.NpmSearch(req.body.name);
  res.status(200).send(query);
});

app.get("/npm/view", async (req, res) => {
  const query = await authorized.NpmView();
  res.status(200).send(query);
});

app.post("/v2/npm/view", async (req, res) => {
  const query = await authorized.NpmViewV2(req.body.name);
  res.status(200).send(query.data);
});

const routes = [
  OtpCrater,
  Uuid,
  SortService,
  BinaryLocker,
  Node,
  Color,
  Logger,
  DataGenerator,
  Authorized,
];

let imports = routes.map((elements) => elements.name);
const elements1 = node.output();

imports = [...imports, ...elements1];

app.listen(port, async () => {
  logger.log("***************");
  logger.new(imports);
  logger.log(`Node app is successfully created on http://localhost: ${port}.`);
  logger.log("***************");
  node.getUserInput();
});
