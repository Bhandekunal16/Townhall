const fs = require("fs");

class BinaryLocker {
  folderPath = "./locker/api";
  convertToBinary(data) {
    let binary = "";
    for (let i = 0; i < data.length; i++) {
      let charCode = data.charCodeAt(i).toString(2);
      binary += this.padLeft(charCode, 8);
    }
    return binary;
  }

  padLeft(str, length) {
    return "0".repeat(length - str.length) + str;
  }

  createBinaryFile(data, name, header) {
    if (!fs.existsSync(this.folderPath)) {
      fs.mkdirSync(this.folderPath, { recursive: true });
    }
    const value = this.convertToBinary(data);
    const bufferData = Buffer.from(value, "binary");
    const [filePath, resPath] = [
      `${this.folderPath}/${name}.bin`,
      `${header}/locker/api/${name}.bin`,
    ];
    fs.writeFileSync(filePath, bufferData);
    return resPath == undefined ? "error" : `${name}.bin`;
  }
}

module.exports = BinaryLocker;
