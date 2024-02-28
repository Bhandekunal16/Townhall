const fs = require("fs");
const path = require("path");
const Logger = require("../interface/Logger");
const logger = new Logger();

/**
 * Class representing CSS file operations.
 */
class Css {
  /**
   * @type {string}
   */
  fileContent = `/* CSS file layout */

  /* Reset some default styles to ensure consistency */
  body, h1, p {
    margin: 0;
    padding: 0;
  }
  
  /* Global styles */
  body {
    font-family: 'Arial', sans-serif;
    background-color: #f0f0f0;
    color: #333;
  }
  
  .container {
    width: 80%;
    margin: 0 auto;
  }
  
  /* Header styles */
  header {
    background-color: #2c3e50;
    color: #ecf0f1;
    padding: 1em;
    text-align: center;
  }
  
  /* Navigation styles */
  nav {
    background-color: #3498db;
    padding: 1em;
  }
  
  nav a {
    color: #ecf0f1;
    text-decoration: none;
    margin-right: 1em;
  }
  
  /* Main content styles */
  main {
    padding: 1em;
  }
  
  /* Footer styles */
  footer {
    background-color: #2c3e50;
    color: #ecf0f1;
    padding: 1em;
    text-align: center;
  }
`;

  /**
   * Creates a CSS file with the specified name.
   * @function create a dummy css file.
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

module.exports = Css;
