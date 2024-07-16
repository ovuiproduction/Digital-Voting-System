const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port:587,
    secure:false,
    auth: {
      user: 'onkarwaghmode0101@gmail.com',
      pass: 'fxpr xvoj hjog ppud'
    },
});

module.exports = transporter;