const fs = require("fs");

/**
 * @class
 */
class BinaryLocker {
  /**
   * @type {string}
   * @private
   */
  folderPath = "./locker/api";

  /**
   * Converts a string to binary.
   *
   * @param {string} data - The input string to convert.
   * @returns {string} The binary representation of the input string.
   * @private
   */
  convertToBinary(data) {
    let binary = "";

    for (let i = 0; i < data.length; i++) {
      let charCode = data.charCodeAt(i).toString(2);
      binary += this.padLeft(charCode, 8);
    }

    return binary;
  }

  /**
   * Pads a string to the left with zeros.
   *
   * @param {string} str - The input string.
   * @param {number} length - The desired length of the padded string.
   * @returns {string} The padded string.
   * @private
   */
  padLeft(str, length) {
    return "0".repeat(length - str.length) + str;
  }

  /**
   * Creates a binary file from the input data.
   *
   * @param {string} data - The input data to write to the file.
   * @param {string} name - The name of the file.
   * @param {string} header - The header for the file path.
   * @returns {string} The created file name or "error" if there's an issue.
   */
  createBinaryFile(data, name, header) {
    if (!fs.existsSync(this.folderPath)) {
      fs.mkdirSync(this.folderPath, { recursive: true });
    }
    const fileName = `${name}.bin`;
    const value = this.convertToBinary(data);
    const bufferData = Buffer.from(value, "binary");
    const filePath = `${this.folderPath}/${fileName}`;
    const resPath = `${header}/locker/api/${fileName}`;
    fs.writeFileSync(filePath, bufferData);
    return resPath == undefined ? "error" : fileName;
  }
}

module.exports = BinaryLocker;
