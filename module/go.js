const fs = require("fs");
const path = require("path");
const Logger = require("../interface/Logger");
const logger = new Logger();

/**
 * Class representing Go file operations.
 */
class Go {
  /**
   * @type {string}
   */
  fileContent = `package main

  import "fmt"
  
  // Function definition
  func functionName(parameter1 type1, parameter2 type2) returnType {
      // Function body
      // Perform operations using parameters
      // ...
  
      // Return a value of returnType
      return returnValue
  }
  
  func main() {
      // Example usage of the function
      result := functionName(value1, value2)
      // Perform actions with the result if needed
      // ...
  }
`;

  /**
   * Creates a Go file with the specified name.
   * @function create a dummy go file
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

      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      } else {
        logger.log("Folder already present.");
      }

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

module.exports = Go;
