const db = require("roboticdb/src/brain");
module.exports = function isLogger(req, res, next) {
  next(new db().write(req, "log"));
};
