const express = require("express");
const routes = express.Router();
const {
  doSignup,
  doLogin,
  forgetPassword,
  newPassword,
  updateProfile,
} = require("../controller/userController");
const verifyUser = require("../utils/verifyUser");

routes.post("/signup", doSignup); 
routes.post("/login", doLogin);
routes.post("/forgetPassword", forgetPassword);
routes.post("/verifyUser", verifyUser);
routes.post("/newPassword", newPassword);
routes.post("/updateProfile", updateProfile);

module.exports = routes;
