const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "khaerul.fariz98@gmail.com",
    pass: "nnwqiilgcniskaca",
  },
});

module.exports = transporter;
