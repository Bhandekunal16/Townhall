const fs = require("fs");
const path = require("path");
const Logger = require("../interface/Logger");
const logger = new Logger();

class NestController {
  create(name) {
    try {
      const fileContent = `
    import { Controller, Get, Post, Body, Param } from '@nestjs/common';
    import { create${name}Dto } from './dto/create.${name}.dto';
    import { ${name}Service } from './${name}.service';
    
    @Controller('${name}')
    export class ${name}Controller {
      constructor(private readonly ${name}Service: ${name}Service) {}
    
      @Post(@Body() body: create${name}Dto)
      findAll(): string[] {
        return this.${name}Service.findAll();
      }
    
    }
    
  `;
      const fileName = `${name + ".controller.ts"}`;
      const folderName = "../src";

      try {
        const folderPath = path.join(__dirname, `${folderName}/${name}`);

        const filePath = path.join(folderPath, fileName);

        !fs.existsSync(folderPath)
          ? fs.mkdirSync(folderPath, { recursive: true })
          : logger.log("folder already present.");

        fs.writeFile(filePath, fileContent, (err) => {
          err
            ? logger.error("Error creating file:" + err)
            : logger.log(
                `File "${fileName}" created successfully. ---this is service`
              );
        });
      } catch (error) {
        logger.error(error + "----> this is controller");
        return error;
      }
    } catch (error) {
      logger.error(error + "----> this is controller");
      return error;
    }
  }
}

module.exports = NestController;
