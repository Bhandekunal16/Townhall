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
  MongoPlants,
  Router,
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
  require("./auth/env/plants_mongo"),
  require("./router"),
];

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(exteroceptor);
const preferredPort = 3000;
const fallbackPort = 3004;

app.get(new Router().routes[0], (req, res) => {
  res.send("hello world");
});

app.get(new Router().routes[1], (req, res) => {
  res.send(`${new OtpCrater().new()}`);
});

app.get(new Router().routes[2], (req, res) => {
  res.send(new Uuid().vectorized());
});

app.get(new Router().routes[3], async (req, res) => {
  res.send(await new MongoPlants().getAllDocuments());
});

app.post(new Router().routes[4], (req, res) => {
  res.send(new DataGenerator().create(req.body.length, req.body.type));
});

app.post(new Router().routes[5], async (req, res) => {
  res.send(await new Authorized().main(req.body.ifsc));
});

app.post(new Router().routes[6], async (req, res) => {
  res.send(await new Authorized().postal(req.body.pinCode));
});

app.post(new Router().routes[7], async (req, res) => {
  res.send(await new Authorized().NpmViewV2(req.body.name));
});

app.post(new Router().routes[8], async (req, res) => {
  res.send(await new Authorized().NpmSearch(req.body.name));
});

app.post(new Router().routes[9], async (req, res) => {
  res.send(
    await new Authorized().NpmView(req.body.userName, req.body.packageName)
  );
});

app.post(new Router().routes[10], async (req, res) => {
  const requestData = req.body;
  const query = await new SortService().write(
    requestData.data,
    Object.getOwnPropertyNames(requestData)
  );
  res.send({ data: query.value, msg: `${query.status}`, status: query.status });
});

app.post(new Router().routes[11], (req, res) => {
  const [requestData, header] = [req.body, req.hostname];
  const query = new BinaryLocker().createBinaryFile(
    requestData.data,
    requestData.name,
    header
  );
  res.send({ data: query, msg: "success", status: true });
});

app.post(new Router().routes[12], async (req, res) => {
  const query = await new Authorized()
    .getPackageInfo(req.body.name)
    .then((packageInfo) => {
      if (packageInfo) return packageInfo;
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

app.post(new Router().routes[13], async (req, res) => {
  res.send(await new MongoPlants().getNameByProperty(req.body.name));
});

app.post(new Router().routes[14], async (req, res) => {
  res.send(await new MongoPlants().getCollectionByGenusName(req.body.name));
});

app.post(new Router().routes[15], async (req, res) => {
  res.send(
    await new MongoPlants().getCollectionByScientificName(req.body.name)
  );
});

app.post(new Router().routes[16], async (req, res) => {
  res.send(await new MongoPlants().edit(req.body));
});p

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
  MongoPlants,
];

let imports = routes.map((elements) => elements.name);
const elements1 = new Node().output();

imports = [...imports, ...elements1];

const startServer = (port) => {
  const server = app.listen(port, async () => {
    new Logger().log("*".repeat(140));
    new Logger().new(imports);
    new Logger().array(new Router().routes);
    await new MongoPlants().connect();
    new Logger().log(`Node app is running on http://localhost:${port}.`);
    new Logger().log("*".repeat(140));
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(
        `Port ${port} is in use, trying fallback port ${fallbackPort}`
      );
      if (port !== fallbackPort) {
        startServer(fallbackPort);
      } else {
        console.error(`Fallback port ${fallbackPort} is also in use. Exiting.`);
        process.exit(1);
      }
    } else {
      console.error(`Server error: ${err}`);
    }
  });
};

startServer(preferredPort);
