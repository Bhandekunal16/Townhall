const axios = require("axios");
const Environment = require("./environment");
const env = new Environment();
const ExcelJS = require("exceljs");

/**
 * @class - authorized class for authorization api endpoint.
 */
class Authorized {
  /**
   * @function - ifsc code detecting api's
   * @param {string} params - ifsc code for the bank details
   * @return {object} - return bank address details
   * */
  main(params) {
    return axios
      .get(`${env.api}${params}`)
      .then((response) => {
        return {
          data: response.data,
          status: true,
          statusCode: 200,
        };
      })
      .catch((error) => {
        return { res: error, status: false, statusCode: 500, error: "error" };
      });
  }

  /**
   * @function - postal code detecting api's.
   * @param {string} params - postal code for the address verification.
   * @return {object} - return address details.
   * */
  postal(params) {
    return axios
      .get(`${env.locationApi}${params}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  /**
   * @function - create excel file with array.
   * @param {Array<object>} dataArray - array of the any data.
   * @param {string} filePath - path to excel file.
   * @return {string} - return file details.
   * */
  async createExcelFile(dataArray, filePath) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data");

    worksheet.addRow(Object.keys(dataArray[0]));

    dataArray.forEach((obj) => {
      const values = Object.values(obj);
      worksheet.addRow(values);
    });

    await workbook.xlsx.writeFile(filePath);
  }

  /**
   * @function - return address file against file of the pinCode
   * @param {string} output -path for the output file
   * @param {string} filePath- path for the input file
   * @returns -file with in address data. */
  async readExcelToArray(filePath, output) {
    const workbook = new ExcelJS.Workbook();
    const dataArray = [];

    try {
      await workbook.xlsx.readFile(filePath);
      const worksheet = workbook.getWorksheet(1);

      worksheet.eachRow(async (row, rowNumber) => {
        if (rowNumber > 1) {
          const rowData = {
            number: row.getCell(1).value,
            pincode: row.getCell(2).value.toString(),
          };
          dataArray.push(rowData);
        }
      });

      let array = [];
      let errorArray = [];
      console.log(dataArray.length);
      for (let index = 0; index < dataArray.length; index++) {
        try {
          console.log("Index:", index, dataArray[index].pincode);
          const write = await this.postal(dataArray[index].pincode);
          write[0].PostOffice[0] == undefined
            ? array.push({})
            : array.push(write[0].PostOffice[0]);
        } catch (error) {
          errorArray.push(error);
        }
      }
      this.createExcelFile(array, output);

      return array;
    } catch (error) {
      error;
    }
  }

  /**
   * @function  getPackageInfo return package info
   * @param {string} packageName - name of the package
   * @returns {object} -package information.
   * */
  async getPackageInfo(packageName) {
    try {
      const response = await axios.get(
        `https://registry.npmjs.org/${packageName}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching package details:", error);
      return null;
    }
  }

  /**
   * @function  NpmSearch return package info
   * @param {string} name - name of the package
   * @returns {object} -package information.
   * */
  async NpmSearch(name) {
    try {
      const response = await axios.get(
        `https://api.npms.io/v2/package/${name}`
      );
      console.log(response);
      return response.data
        ? {
            data: response.data,
            status: true,
            statusCode: 200,
            msg: `Data found for ${name}`,
          }
        : {
            data: null,
            status: false,
            statusCode: 404,
            msg: `not found for ${name}`,
          };
    } catch (error) {
      return { res: error, status: false, statusCode: 500, msg: "error" };
    }
  }

  /**
   * @function  NpmView return package info
   * @param {string} userName - user name of the npm
   * @param {string} packageName - package Name of the npm
   * @returns {object} -package information.
   * */
  async NpmView(userName, packageName) {
    try {
      const response = await axios.get(
        `https://npm-trends-proxy.uidotdev.workers.dev/github/repos/${userName}/${packageName}`
      );
      return response.data.name !== undefined
        ? {
            data: response.data,
            status: true,
            statusCode: 200,
            msg: `Data found ${packageName};`,
          }
        : {
            data: null,
            status: false,
            statusCode: 404,
            msg: `Data not found ${packageName};`,
          };
    } catch (error) {
      return { res: error, status: false, statusCode: 500, msg: "error" };
    }
  }

  /**
   * @function  NpmView return package info
   * @param {string} name - user name of the npm package
   * @returns {object} -package information.
   * */
  async NpmViewV2(name) {
    try {
      const response = await axios.get(
        `https://npm-trends-proxy.uidotdev.workers.dev/npm/registry/${name}`
      );
      return response.data.name !== undefined
        ? {
            data: response.data,
            status: true,
            statusCode: 200,
            msg: `Data found ${name};`,
          }
        : {
            data: null,
            status: false,
            statusCode: 404,
            msg: `Data not found ${name};`,
          };
    } catch (error) {
      return { res: error, status: false, statusCode: 500, msg: "error" };
    }
  }
}

module.exports = Authorized;
