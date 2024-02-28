/**
 * class represent the type checking operation
 */
class TypeChecker {
  /**
   * @function - check value typing is correct or not.
   * @param {any} value - value to be checked
   * @returns {boolean} true if it's of same type, otherwise false
   */
  checkNumber(value) {
    return typeof value == typeof Number(0) ? true : false;
  }

  /**
   * @function - check value typing is correct or not.
   * @param {any} value - value to be checked
   * @returns {boolean} true if it's of same type, otherwise false
   */
  checkString(value) {
    return typeof value == typeof String("") ? true : false;
  }

  /**
   * @function - check value typing is correct or not.
   * @param {any} value - value to be checked
   * @returns {boolean} true if it's of same type, otherwise false
   */
  checkBoolean(value) {
    return typeof value == typeof Boolean(true) ? true : false;
  }
}

module.exports = TypeChecker;
