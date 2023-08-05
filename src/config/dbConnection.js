const mongoose = require("mongoose");

async function dbConnection() {
  try {
    const connection = await mongoose.connect(process.env.dbURI);
    console.log("db connection successfull");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { dbConnection };
