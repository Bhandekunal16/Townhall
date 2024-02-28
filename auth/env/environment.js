class Environment {
  constructor() {
    this.api = "https://ifsc.razorpay.com/";
    this.location = "https://api.postalpincode.in/pincode/";
    this.IfscApi = this.api;
    this.locationApi = this.location;
  }
}

module.exports = Environment;
