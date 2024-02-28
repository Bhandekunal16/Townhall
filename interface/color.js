/**
 * class that contain name properties
 */
class Color {
  constructor() {
    /**
     * @private
     */
    this.black = "\x1b[30m";

    /**
     * @private
     */
    this.red = "\x1b[31m";

    /**
     * @private
     */
    this.green = "\x1b[32m";

    /**
     * @private
     */
    this.yellow = "\x1b[33m";

    /**
     * @private
     */
    this.blue = "\x1b[34m";

    /**
     * @private
     */
    this.magenta = "\x1b[35m";

    /**
     * @private
     */
    this.cyan = "\x1b[36m";

    /**
     * @private
     */
    this.white = "\x1b[37m";
  }

  black = this.black;
  red = this.red;
  green = this.green;
  yellow = this.yellow;
  blue = this.blue;
  magenta = this.magenta;
  cyan = this.cyan;
  white = this.white;
}

module.exports = Color;
