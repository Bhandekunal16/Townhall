const fs = require("fs");
const path = require("path");
const Logger = require("../interface/Logger");
const logger = new Logger();

/**
 * Class representing HTML file operations.
 */
class HTML {
  /**
   * @type {string}
   */
  fileContent = `<!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Page Title</title>
  
    <!-- Link to your external CSS file -->
    <link rel="stylesheet" href="styles.css">
  </head>
  
  <body>
  
    <!-- Header Section -->
    <header>
      <h1>Your Website</h1>
      <p>Welcome to your website!</p>
    </header>
  
    <!-- Navigation Section -->
    <nav>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  
    <!-- Main Content Section -->
    <main>
      <section id="home">
        <h2>Home</h2>
        <p>This is the home section of your website.</p>
      </section>
  
      <section id="about">
        <h2>About Us</h2>
        <p>Learn more about our company and values.</p>
      </section>
  
      <section id="services">
        <h2>Our Services</h2>
        <p>Discover the services we offer to our clients.</p>
      </section>
    </main>
  
    <!-- Footer Section -->
    <footer>
      <p>&copy; 2024 Your Website. All rights reserved.</p>
    </footer>
  
  </body>
  
  </html>
`;

  /**
   * Creates an HTML file with the specified name.
   * @function create a dummy html file.
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

module.exports = HTML;
