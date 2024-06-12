const database = require("roboticdb/src/brain");

class portfolio {
  update(input) {
    new database().edit(input.id, input.input, input.value, input.collection);
  }

  create() {
    new database().write({ status: "AT HOME" }, "status");
  }

  get() {
    return new database().getById("746b6a7a787967636a63", "status");
  }
}

module.exports = portfolio;

