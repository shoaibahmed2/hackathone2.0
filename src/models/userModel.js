const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: String,
});

const LoginSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: String,
});
const SignUpCollection = mongoose.model("Users", UserSchema);
// const LoginCheck = mongoose.model("Users", LoginSchema);
module.exports = { SignUpCollection };
