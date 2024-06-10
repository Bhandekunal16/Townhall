const db = require("roboticdb/src/brain");
module.exports = function isLogger(req, res, next) {
  next(
    req.hostname == "localhost"
      ? new db().write(
          {
            url: req.url,
            method: req.method,
            host: req.hostname,
            body: req.body,
            hitOn: `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
          },
          "log"
        )
      : console.log("i am working")
  );
};
