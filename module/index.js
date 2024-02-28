const readline = require("readline");
const Logger = require("../interface/Logger");
const TypeScript = require("./typeScript");
const JavaScript = require("./javaScript");
const Binary = require("./bin");
const Java = require("./java");
const Go = require("./go");
const Python = require("./python");
const Css = require("./css");
const HTML = require("./html");
const Web = require("./static.web");
const JSON = require("./package");
const Nest = require("./Nest");
const Map = require("./map");

/**
 * @type {Logger}
 */
const logger = new Logger();

/**
 * @type {TypeScript}
 */
const type = new TypeScript();

/**
 * @type {JavaScript}
 */
const javaScript = new JavaScript();

/**
 * @type {Binary}
 */
const bin = new Binary();

/**
 * @type {Java}
 */
const java = new Java();

/**
 * @type {Go}
 */
const go = new Go();

/**
 * @type {Python}
 */
const python = new Python();

/**
 * @type {Css}
 */
const css = new Css();

/**
 * @type {HTML}
 */
const html = new HTML();

/**
 * @type {Web}
 */
const web = new Web();

/**
 * @type {JSON}
 */
const json = new JSON();

/**
 * @type {Nest}
 */
const nest = new Nest();

/**
 * @type {Map}
 */
const map = new Map();

/**
 * Class representing module file for file creation operations.
 */
class Node {
  /**
   * @function - create file structure and file according your input
   * @param {string} name - The name of the file || class || module || folder.
   * @returns {string} The name of the created file's or undefined if there's an error.
   */
  create(name) {
    try {
      name.includes(".ts") ? type.create(name) : null;
      name.includes(".json") ? json.create(name) : null;
      name.includes(".js") ? javaScript.create(name) : null;
      name.includes(".bin") ? bin.create(name) : null;
      name.includes(".java") ? java.create(name) : null;
      name.includes(".go") ? go.create(name) : null;
      name.includes(".py") ? python.create(name) : null;
      name.includes(".css") ? css.create(name) : null;
      name.includes(".html") ? html.create(name) : null;
      name.includes(".web") ? web.create(name) : null;
      name.includes(".nest") ? nest.create(name) : null;
      name.includes(".map") ? map.create(name) : null;
    } catch (error) {
      logger.error(error);
      return error;
    }
  }

  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  /**
   * @param {string} userInput - take input from user.
   * @returns {string} The name of the created file's or undefined if there's an error.
   */
  getUserInput() {
    this.rl.question('Enter something (type "exit" to stop): ', (userInput) => {
      userInput.toLocaleLowerCase() === "exit"
        ? this.rl.close()
        : this.create(userInput);
    });
  }

  /**
   * @returns {Array} return array of the class present in the this module.
   */
  output() {
    let elements = nest.out();
    let elements1 = web.out();
    elements = [...elements, ...elements1];
    return elements;
  }
}

module.exports = Node;
