const [axios, Environment, ExcelJS, Response] = [
  require("axios"),
  require("./environment"),
  require("exceljs"),
  require("robotic.js/src/class/response"),
];

class Authorized {
  async main(params) {
    try {
      const response = await fetch(`${new Environment().api}${params}`);
      if (!response.ok) throw new Error(response.status);
      else return new Response().success(await response.json(), "success");
    } catch (error) {
      return new Response().error(error);
    }
  }

  async postal(params) {
    try {
      const response = await fetch(`${new Environment().location}${params}`);
      if (!response.ok) throw new Error(response.status);
      else {
        const data = await response.json();
        return new Response().success(
          data[0].PostOffice,
          `successfully found data of  + ${data[0].PostOffice.length}`
        );
      }
    } catch (error) {
      return new Response().error(error);
    }
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
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1)
          dataArray.push({
            number: row.getCell(1).value,
            pincode: row.getCell(2).value.toString(),
          });
      });
      for (let index = 0; index < dataArray.length; index++) {
        try {
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
      return Response.error(error);
    }
  }

  async getPackageInfo(packageName) {
    try {
      const response = await fetch(`https://registry.npmjs.org/${packageName}`);
      if (!response.ok) throw new Error(response.status);
      else {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      return new Response().error(error);
    }
  }

  async NpmSearch(name) {
    try {
      const response = await fetch(`https://api.npms.io/v2/package/${name}`);
      if (!response.ok) {
        if (response.status === 404)
          return new Response().notFound(null, `not found for ${name}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      } else
        return new Response().success(
          await response.json(),
          `Data found for ${name}`
        );
    } catch (error) {
      return new Response().error(error);
    }
  }

  async NpmView(userName, packageName) {
    try {
      const response = await fetch(
        `https://npm-trends-proxy.uidotdev.workers.dev/github/repos/${userName}/${packageName}`
      );
      return response.data.name !== undefined
        ? new Response().success(response.data, `Data found ${packageName};`)
        : new Response().notFound(null, `Data not found ${packageName};`);
    } catch (error) {
      return new Response().error(error);
    }
  }

  async NpmViewV2(name) {
    try {
      const response = await axios.get(
        `https://npm-trends-proxy.uidotdev.workers.dev/npm/registry/${name}`
      );
      return response.data.name !== undefined
        ? new Response().success(response.data, `Data found ${name};`)
        : new Response().notFound(null, `Data not found ${name};`);
    } catch (error) {
      return new Response().error(error);
    }
  }

  async encrypt(data) {
    const response = await fetch(
      `https://encryption-server.vercel.app/encrypt`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publicKey: "plantee",
          data: data,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const resData = await response.json();
    return resData;
  }
}

module.exports = Authorized;
