const fs = require("fs");
const path = require("path");
const Logger = require("../interface/Logger");
const logger = new Logger();

/**
 * Class representing javascript file creating with class operation.
 */
class Map {
  /**
   * @function create a dummy javascript file that contain class.
   * @param {string} name - The name for the file.
   * @returns {string|undefined} The name of the created file's or undefined if there's an error.
   */
  create(name) {
    /**
     * @type {string}
     */
    const trimmed = name.split(".")[0];

    /**
     * @type {string}
     */
    const fileName = `${trimmed}.js`;

    /**
     * @type {string}
     */
    const fileContent = `
    class ${trimmed} {}
    module.exports = ${trimmed};
  `;
    const folderName = "../src";

    try {
      /**
       * @type {string}
       */
      const folderPath = path.join(__dirname, `${folderName}`);

      /**
       * @type {string}
       */
      const filePath = path.join(folderPath, fileName);

      !fs.existsSync(folderPath)
        ? fs.mkdirSync(folderPath, { recursive: true })
        : logger.log("folder already present.");

      fs.writeFile(filePath, fileContent, (err) => {
        err
          ? logger.error("Error creating file:", err)
          : logger.log(`File "${fileName}" created successfully.`);
      });
    } catch (error) {
      logger.error(error);
      return error;
    }
  }
}

module.exports = Map;
