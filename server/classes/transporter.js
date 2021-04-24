
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.HOST_EMAIL,
    pass: process.env.HOST_EMAIL_PASS,
  },
  });

  module.exports = transporter;