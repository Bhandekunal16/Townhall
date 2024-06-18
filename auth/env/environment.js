class Environment {
  constructor() {
    this.api = "https://ifsc.razorpay.com/";
    this.location = "https://api.postalpincode.in/pincode/";
  }

  collection = "Nomenclature";
  dbName = "Plants";
  uri =
    "mongodb+srv://bhandekunal16:SppcHRFdBS74An8v@cluster0.xxevqv7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
}

module.exports = Environment;
