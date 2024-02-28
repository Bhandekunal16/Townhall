const axios = require("axios");
const Environment = require("./environment");
const env = new Environment();

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
}

module.exports = Authorized;
