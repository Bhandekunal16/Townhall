/**
 * class that contain time stamp for the logging.
 */
class Timestamp {
  constructor() {
    /**
     * @private
     */
    this.min = new Date().getMinutes();

    /**
     * @private
     */
    this.sec = new Date().getSeconds();

    /**
     * @private
     */
    this.mild = new Date().getMilliseconds();
  }

  /**
   * @function - time stamp constructor
   * @returns {string} - returns time stamp string
   */
  main() {
    /**
     * @type {string}
     */
    const timestamp = `${this.min}${this.mild}${this.sec}`;
    return timestamp;
  }
}

module.exports = Timestamp;
