var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hafizmudusar37@gmail.com",
    pass: "hgiooxhloqeseahu",
  },
});

const sendEmail = async (to, Otp) => {
  try {
    console.log("node mail chla");
    var mailOptions = {
      from: "hafizmudusar37@gmail.com",
      to: to,
      subject: "email verification",
      text: Otp,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(result, "result of malil");
    // res.send("email snd");
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = sendEmail;
