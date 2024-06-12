const database = require("roboticdb/src/brain");

class portfolio {
  update(input) {
    new database().edit(input.id, input.input, input.value, input.collection);
  }

  create() {
    new database().write({ status: "AT HOME" }, "status");
  }

  get() {
    return new database().read("status");
  }
}

module.exports = portfolio;
