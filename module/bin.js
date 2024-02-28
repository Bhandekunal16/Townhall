const fs = require("fs");
const path = require("path");
const Logger = require("../interface/Logger");
const logger = new Logger();

/**
 * Class representing binary file operations.
 */
class Binary {
  /**
   * @type {string}
   */
  fileContent = "1000001";

  /**
   * Creates a binary file with the specified name.
   * @function create a dummy bin file.
   * @param {string} name - The name of the file.
   * @returns {string|undefined} The name of the created file or undefined if there's an error.
   */
  create(name) {
    /**
     * @type {string}
     */
    const fileName = `${name}`;

    /**
     * @type {string}
     */
    const trimmed = name.split(".")[0];

    /**
     * @type {string}
     */
    const folderName = "../src";

    try {
      const folderPath = path.join(__dirname, `${folderName}/${trimmed}`);
      const filePath = path.join(folderPath, fileName);

      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      } else {
        logger.log("Folder already present.");
      }

      fs.writeFile(filePath, this.fileContent, (err) => {
        if (err) {
          logger.error("Error creating file:", err);
          return undefined;
        } else {
          logger.log(`File "${fileName}" created successfully.`);
          return fileName;
        }
      });
    } catch (error) {
      logger.error(error);
      return error;
    }
  }
}

module.exports = Binary;
