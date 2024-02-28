const HTML = require("./html");
const Css = require("./css");
const JavaScript = require("./javaScript");

const html = new HTML();
const css = new Css();
const javaScript = new JavaScript();

/**
 * Class representing module file for creation of html,css and javascript file creation operations.
 */
class Web {
  /**
   * @function - create a folder structure useful for static web pages
   * @param {string} name - The name of the folder and all of each file.
   * @returns {string|undefined} The name of the created file's or undefined if there's an error.
   */
  create(name) {
    /**
     * @type {string}
     */
    const value1 = name.split(".")[0] + ".js";

    /**
     * @type {string}
     */
    const value2 = name.split(".")[0] + ".css";

    /**
     * @type {string}
     */
    const value3 = name.split(".")[0] + ".html";

    html.create(value3);
    css.create(value2);
    javaScript.create(value1);
  }

  /**
   * @function - export the array of the class name for other module
   * @returns {Array|undefined} Array of class name's.
   */
  out() {
    /**
     * @type {Array}
     */
    const array = [HTML, Css, JavaScript];

    /**
     * @type {Array}
     */
    const out = array.map((elements) => elements.name);

    return out;
  }
}

module.exports = Web;
