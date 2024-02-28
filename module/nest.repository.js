const fs = require("fs");
const path = require("path");
const Logger = require("../interface/Logger");
const logger = new Logger();

class NestRepository {
  create(name) {
    try {
      const fileContent = `
    import { Injectable } from '@nestjs/common';
  import { create${name}Dto } from './dto/create.${name}.dto';
  
  @Injectable()
  export class ${name}Repository {
    private readonly data: string[] = [];
  
    findAll(): string[] {
      return this.data;
    }
  }
  
  `;
      const fileName = `${name + ".repository.ts"}`;
      const folderName = "../src";
      try {
        const folderPath = path.join(__dirname, `${folderName}/${name}`);

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
    } catch (error) {
      logger.error(error, "----this is service");
      return error;
    }
  }
}

module.exports = NestRepository;
