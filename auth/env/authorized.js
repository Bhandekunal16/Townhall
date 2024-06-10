const [axios, Environment, ExcelJS, Response] = [
  require("axios"),
  require("./environment"),
  require("exceljs"),
  require("robotic.js/src/class/response"),
];

class Authorized {
  main(params) {
    return axios
      .get(`${new Environment().api}${params}`)
      .then((response) => {
        return new Response().success(response.data, "success");
      })
      .catch((error) => {
        return new Response().error(error);
      });
  }

  postal(params) {
    return axios
      .get(`${new Environment().locationApi}${params}`)
      .then((response) => {
        return new Response().success(
          response.data[0].PostOffice,
          `successfully found data of  + ${response.data[0].PostOffice.length}`
        );
      })
      .catch((error) => {
        return new Response().error(error);
      });
  }

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

  async readExcelToArray(filePath, output) {
    const [workbook, dataArray, array, errorArray] = [
      new ExcelJS.Workbook(),
      [],
      [],
      [],
    ];
    try {
      await workbook.xlsx.readFile(filePath);
      const worksheet = workbook.getWorksheet(1);

      worksheet.eachRow(async (row, rowNumber) => {
        if (rowNumber > 1)
          dataArray.push({
            number: row.getCell(1).value,
            pincode: row.getCell(2).value.toString(),
          });
      });
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
