const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Color = require("robotic.js/src/interface/color");
const Logger = require("robotic.js/src/interface/Logger");
const OtpCrater = require("./src/otp");
const Uuid = require("./src/uuid");
const SortService = require("./src/stringSort");
const BinaryLocker = require("./src/binaryEncrypted");
const DataGenerator = require("./src/DataGenerator");
const Node = require("./module/index");
const Authorized = require("./auth/env/authorized");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 3004;

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
  const query = new OtpCrater().otpCreate();
  res.status(200).send(query);
});

app.get("/create/uuid", async (req, res) => {
  const query = new Uuid().generateUUID();
  res.status(200).send(query);
});

app.post("/sort/string", async (req, res) => {
  const requestData = req.body;
  const query = await new SortService().write(
    requestData.data,
    Object.getOwnPropertyNames(requestData)
  );
  res
    .status(200)
    .send({ data: query.value, msg: `${query.status}`, status: query.status });
});

app.post("/store", async (req, res) => {
  const requestData = req.body;
  const header = req.hostname;
  const query = new BinaryLocker().createBinaryFile(
    requestData.data,
    requestData.name,
    header
  );

  res.status(200).send({ data: query, msg: "success", status: true });
});

app.post("/random", async (req, res) => {
  const query = new DataGenerator().create(
    req.body.length,
    req.body.type
  );
  res.status(200).send(query);
});

app.post("/ifsc", async (req, res) => {
  const query = await new Authorized().main(req.body.ifsc);
  res.status(200).send(query);
});

app.post("/pincode", async (req, res) => {
  const query = await new Authorized().postal(req.body.pinCode);
  res.status(200).send(query);
});

app.post("/info", async (req, res) => {
  const query = await new Authorized()
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
  res.status(200).send(ans);
});

app.post("/search", async (req, res) => {
  const query = await new Authorized().NpmSearch(req.body.name);
  res.status(200).send(query);
});

app.post("/npm/view", async (req, res) => {
  const query = await new Authorized().NpmView(
    req.body.userName,
    req.body.packageName
  );
  res.status(200).send(query);
});

app.post("/v2/npm/view", async (req, res) => {
  const query = await new Authorized().NpmViewV2(req.body.name);
  res.status(200).send(query);
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
const elements1 = new Node().output();

imports = [...imports, ...elements1];

app.listen(port, () => {
  new Logger().log("***************");
  new Logger().new(imports);
  new Logger().log(
    `Node app is successfully created on http://localhost: ${port}.`
  );
  new Logger().log("***************");
  new Node().getUserInput();
});
