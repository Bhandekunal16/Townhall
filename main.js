const [
  express,
  cors,
  bodyParser,
  Color,
  Logger,
  OtpCrater,
  Uuid,
  SortService,
  BinaryLocker,
  DataGenerator,
  Node,
  Authorized,
  Response,
  exteroceptor,
] = [
  require("express"),
  require("cors"),
  require("body-parser"),
  require("robotic.js/src/interface/color"),
  require("robotic.js/src/interface/Logger"),
  require("robotic.js/src/class/OtpGenerator"),
  require("robotic.js/src/class/uuid"),
  require("./src/stringSort"),
  require("./src/binaryEncrypted"),
  require("robotic.js/src/class/dataGenerate"),
  require("robotic.js/src/module/index"),
  require("./auth/env/authorized"),
  require("robotic.js/src/class/response"),
  require("./exteroceptor"),
];

const app = express();
const port = 3004;
app.use(bodyParser.json());
app.use(cors());
app.use(exteroceptor);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/create/otp", (req, res) => {
  const query = new OtpCrater().new();
  res.send(query.toString());
});

app.get("/create/uuid", (req, res) => {
  const query = new Uuid().vectorized();
  res.send(query);
});

app.post("/sort/string", async (req, res) => {
  const requestData = req.body;
  const query = await new SortService().write(
    requestData.data,
    Object.getOwnPropertyNames(requestData)
  );
  res.send({ data: query.value, msg: `${query.status}`, status: query.status });
});

app.post("/store", (req, res) => {
  const requestData = req.body;
  const header = req.hostname;
  const query = new BinaryLocker().createBinaryFile(
    requestData.data,
    requestData.name,
    header
  );

  res.send({ data: query, msg: "success", status: true });
});

app.post("/random", (req, res) => {
  const query = new DataGenerator().create(req.body.length, req.body.type);
  res.send(query);
});

app.post("/ifsc", async (req, res) => {
  const query = await new Authorized().main(req.body.ifsc);
  res.send(query);
});

app.post("/pincode", async (req, res) => {
  const query = await new Authorized().postal(req.body.pinCode);
  res.send(query);
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
    ? new Response().success(query, `successfully fund data : ${req.body.name}`)
    : new Response().notFound(null, `not fund data : ${res.body.name}`);
  res.send(ans);
});

app.post("/search", async (req, res) => {
  const query = await new Authorized().NpmSearch(req.body.name);
  res.send(query);
});

app.post("/npm/view", async (req, res) => {
  const query = await new Authorized().NpmView(
    req.body.userName,
    req.body.packageName
  );
  res.send(query);
});

app.post("/v2/npm/view", async (req, res) => {
  const query = await new Authorized().NpmViewV2(req.body.name);
  res.send(query);
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
