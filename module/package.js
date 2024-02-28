const fs = require("fs");
const path = require("path");
const Logger = require("../interface/Logger");
const logger = new Logger();

/**
 * Class representing json file operations.
 */
class JSON {
  /**
   * @type {string}
   */
  fileContent = `{
    "name": "",
    "version": "1.0.0",
    "description": "",
    "main": "main.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "start": "",
      "build": ""
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
     
    }
  }
  
`;

  /**
   * @function : create a dummy json file.
   * @param {string} name - The name of the file.
   * @returns {string|undefined} The name of the created file or undefined if there's an error.
   */
  create(name) {
    const fileName = `${name}`;
    const folderName = "../src";
    const trimmed = name.split(".")[0];
    try {
      const folderPath = path.join(__dirname, `${folderName}/${trimmed}`);

      const filePath = path.join(folderPath, fileName);

      !fs.existsSync(folderPath)
        ? fs.mkdirSync(folderPath, { recursive: true })
        : logger.log("folder already present.");

      fs.writeFile(filePath, this.fileContent, (err) => {
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

module.exports = JSON;
