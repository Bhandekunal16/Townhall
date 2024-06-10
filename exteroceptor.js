const db = require("roboticdb/src/brain");
module.exports = function isLogger(req, res, next) {
  next(
    new db().write(
      {
        url: req.url,
        method: req.method,
        host: req.host,
        body: req.body,
        hitOn: `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
      },
      "log"
    )
  );
};
