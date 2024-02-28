const axios = require("axios");
const Environment = require("./environment");
const env = new Environment();

class Authorized {
  main(params) {
    return axios
      .get(`${env.api}${params}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

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
