const db = require("roboticdb/src/brain");
module.exports = function isLogger(req, res, next) {
  console.log(req);
  next(
    new db().write(
      { url: req.url, method: req.method, host: req.host, body: req.body },
      "log"
    )
  );
};
