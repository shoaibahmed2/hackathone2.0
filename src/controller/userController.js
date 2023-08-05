const { SignUpCollection, LoginCheck } = require("../models/userModel");
const sendEmail = require("../utils/nodeMailer");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const saltRounds = 10;
///////////////////////////////////SIGNUP//////////////////////////////////
const doSignup = async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
    const User = new SignUpCollection({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    });
    await User.save();
    var token = await jwt.sign(
      { email: req.body.email, name: req.body.name, iat: 1 },
      process.env.secretKey
    );
    console.log("token", token);
    res.status(200).json({
      message: "user successfully logined",
      data: {
        email: req.body.email,
        name: req.body.name,
        token: token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "user could not sign up",
      data: {
        name: req.body.name,
        email: req.body.email,
      },
      error: error,
    });
  }
};
///////////////////////////////////LOGIN//////////////////////////////////

const doLogin = async (req, res) => {
  console.log(req.body, "req ma data");
  try {
    const userLogin = await SignUpCollection.findOne({
      email: req.body.email,
    });
    console.log(userLogin.id, "data from db");
    if (!userLogin) {
      res.status(400).json({
        message: "email is not find",
        data: {
          email: req.body.email,
        },
      });
    } else {
      const camparison = await bcrypt.compare(
        req.body.password,
        userLogin.password
      );
      if (!camparison) {
        res.status(401).json({
          message: "incorrect password",
          data: {
            // name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          },
        });
      } else {
        var token = await jwt.sign(
          {
            email: req.body.email,
            name: userLogin.name,
            iat: 1,
            userId: userLogin.id,
          },
          process.env.secretKey
        );
        console.log("token", token);
        if (req.body.email === "hr@gmail.com") {
          res.status(200).json({
            message: "admin",
            data: {
              email: req.body.email,
              name: userLogin.name,
              token: token,
            },
          });
        } else {
          res.status(200).json({
            message: "user",
            data: {
              email: req.body.email,
              name: userLogin.name,
              token: token,
            },
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "some thing went wrong",
      data: {
        email: req.body.email,
        password: req.body.password,
      },
      error: error,
    });
  }
};
///////////////////////////////////Forget Password//////////////////////////////////
function otpmaker() {
  let code = Math.floor(Math.random() * 9000) + 1000;
  let OTP = code.toFixed();
  return OTP;
}

const forgetPassword = async (req, res) => {
  try {
    const userLogin = await SignUpCollection.findOne({
      email: req.body.email,
    });
    if (!userLogin) {
      res.status(400).json({
        message: "email is not find",
        data: {
          email: req.body.email,
        },
      });
    } else {
      const ans = otpmaker();
      console.log(ans, "otp genetrated or not");
      sendEmail(req.body.email, ans.toString());
      console.log("email send hui");
      res.status(200).json({
        message: "email is send",
        data: {
          email: req.body.email,
          otp: ans.toString(),
        },
      });
    }
  } catch (error) {
    res.status(401).send("something went wrong");
  }
};
///////////////////////////////////Add New Password//////////////////////////////////

const newPassword = async (req, res) => {
  console.log(req.body);
  try {
    if (!req.body.currentPassword) {
      console.log("gfgf");
      const hashPassword = await bcrypt.hash(req.body.password, saltRounds);

      const userLogin = await SignUpCollection.updateOne(
        { email: req.body.email },
        { $set: { password: hashPassword } }
      );
      res.status(200).json("success updated");
      console.log("success updated");
    } else {
      console.log(req.body, "req ma data aya wali chali");

      const userLogin = await SignUpCollection.findOne({
        email: req.body.email,
      });
      const camparison = await bcrypt.compare(
        req.body.currentPassword,
        userLogin.password
      );
      console.log(camparison);
      if (!camparison) {
        return res.status(401).json({
          message: "incorrect password",
          data: {
            // name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          },
        });
      } else {
        const hashPassword = await bcrypt.hash(req.body.password, saltRounds);

        const userLogin = await SignUpCollection.updateOne(
          { email: req.body.email },
          { $set: { password: hashPassword } }
        );
        res.status(200).json("success updated");
        console.log("success updated by checking old pass");
      }
    }
  } catch (error) {
    res.status(401).json("not updated");
    console.log("not updated", error);
  }
};
///////////////////////////////////UPDATE EAMIL//////////////////////////////////

const updateProfile = async (req, res) => {
  try {
    const userLogin = await SignUpCollection.findOne({
      email: req.body.oldEmail,
    });
    console.log(req.body, userLogin);
    const updated = await SignUpCollection.updateOne(
      { email: userLogin.email, name: userLogin.name },
      { $set: { email: req.body.newEmail, name: req.body.newName } }
    );
    console.log("update hua", updated);

    res.status(200).json({
      message: "updated ",
      data: {
        email: req.body.newEmail,
      },
    });
  } catch (error) {
    res.status(401).send("something went wrong");
    console.log("error in updaedi", error);
  }
};
module.exports = {
  doSignup,
  doLogin,
  forgetPassword,
  newPassword,
  updateProfile,
};
