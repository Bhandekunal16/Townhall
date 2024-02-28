const NestController = require("./nest.controller");
const NestService = require("./nest.service");
const NestRepository = require("./nest.repository");
const NestModule = require("./nest.module");
const NestDtoCreate = require("./Nest-create-dto");

/**
 * @type {NestController}
 */
const controller = new NestController();

/**
 * @type {NestService}
 */
const service = new NestService();

/**
 * @type {NestRepository}
 */
const repository = new NestRepository();

/**
 * @type {NestDtoCreate}
 */
const create = new NestDtoCreate();

/**
 * @type {NestModule}
 */
const Module = new NestModule();

/**
 * Class representing module file for creation of folder structure like nest.js operations.
 */
class Nest {
  /**
   * @function create a dummy nest module
   * @param {string} name - The name of the folder and all of each file.
   * @returns {string|undefined} The name of the created file's or undefined if there's an error.
   */
  async create(name) {
    /**
     * @type {string}
     */
    const value = name.split(".")[0];

    /**
     * @type {string}
     */
    const value2 = name.split(".")[0];

    /**
     * @type {string}
     */
    const value3 = name.split(".")[0];

    /**
     * @type {string}
     */
    const value4 = name.split(".")[0];

    Promise.all[
      (controller.create(value),
      service.create(value2),
      repository.create(value3),
      Module.create(value4),
      create.create(value4))
    ];
  }

  /**
   * @function export array of the service Name's imported in module
   * @returns {Array|undefined} Array of the service Name's imported in module.
   */
  out() {
    /**
     * @type {Array}
     */
    const route = [
      NestController,
      NestService,
      NestRepository,
      NestDtoCreate,
      NestModule,
    ];

    /**
     * @type {Array}
     */
    const imports = route.map((elements) => elements.name);

    return imports;
  }
}

module.exports = Nest;
