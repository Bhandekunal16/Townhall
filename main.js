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
  Config,
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
  require("robotic-env-reader/index"),
];
new Config().loadEnv(".env");
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(exteroceptor);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/create/otp", (req, res) => {
  res.send(`${new OtpCrater().new()}`);
});

app.get("/create/uuid", (req, res) => {
  res.send(new Uuid().vectorized());
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
  res.send(new DataGenerator().create(req.body.length, req.body.type));
});

app.post("/ifsc", async (req, res) => {
  res.send(await new Authorized().main(req.body.ifsc));
});

app.post("/pincode", async (req, res) => {
  res.send(await new Authorized().postal(req.body.pinCode));
});

app.post("/info", async (req, res) => {
  const query = await new Authorized()
    .getPackageInfo(req.body.name)
    .then((packageInfo) => {
      if (packageInfo) {
        return packageInfo;
      }
    });

  res.send(
    query
      ? new Response().success(
          query,
          `successfully fund data : ${req.body.name}`
        )
      : new Response().notFound(null, `not fund data : ${res.body.name}`)
  );
});

app.post("/search", async (req, res) => {
  res.send(await new Authorized().NpmSearch(req.body.name));
});

app.post("/npm/view", async (req, res) => {
  res.send(
    await new Authorized().NpmView(req.body.userName, req.body.packageName)
  );
});

app.post("/v2/npm/view", async (req, res) => {
  res.send(await new Authorized().NpmViewV2(req.body.name));
});

const routes = [
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
];

let imports = routes.map((elements) => elements.name);
const elements1 = new Node().output();

imports = [...imports, ...elements1];

app.listen(process.env.port, () => {
  new Logger().log("*".repeat(140));
  new Logger().new(imports);
  new Logger().log(
    `Node app is running on http://localhost:${process.env.port}.`
  );
  new Logger().log("*".repeat(140));
  new Node().getUserInput();
});
