const fs = require("fs");
const path = require("path");
const Logger = require("../interface/Logger");
const logger = new Logger();

class NestDtoCreate {
  create(name) {
    const fileContent = `
    export class create${name}Dto {

    }
  `;
    const fileName = `create.${name}.dto.ts`;
    const folderName = "../src";
    try {
      const folderPath = path.join(
        __dirname,
        `${folderName}/${name}/dto/`
      );

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

module.exports = NestDtoCreate;
