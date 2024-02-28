/**
 * @typedef {Object} OtpCreate
 * @property {number} number
 * @property {number} randomNumber
 * @method
 * @method
 */

class OtpCreate {
  constructor() {}

  main() {
    /** @type {number} */
    const number = new Date().getMilliseconds();

    /** @type {number} */
    const randomNumber = Math.floor(Math.random() * 10);

    /** @type {string} */
    const otp = `${number}${randomNumber}`;

    /** @type {string} */
    const finalOtp = otp.length < 4 ? otp + "0" : otp;
    return finalOtp;
  }

  /**
   * @returns {string}
   */

  otpCreate() {
    try {
      /** @type {number} */
      const otp = this.main();
      return otp;
    } catch (error) {
      return error;
    }
  }
}

module.exports = OtpCreate;
