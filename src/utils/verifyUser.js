const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
  console.log("reques chali");
  try {
    if (!req.body.token) {
      res.json({
        message: "token is required",
      });
    }
    console.log(req.body.token, process.env.secretkey);
    var decoded = await jwt.verify(req.body.token || "", process.env.secretkey);
    if (decoded) {
      //   next();
      console.log(decoded, "decoded data");
      res.json({
        data: decoded,
      });
    } else {
      res.json({
        message: "token does not match",
      });
    }
  } catch (error) {
    res.json({
      message: "you don't access rights to call the route",
      error,
    });
  }
};

module.exports = verifyUser;
