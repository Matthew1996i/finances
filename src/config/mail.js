require('dotenv/config');

const mailTrap = {
  host: process.env.MAILHOST,
  port: process.env.MAILPORT,
  secure: true,
  auth: {
    user: process.env.MAILUSER,
    pass: process.env.MAILPASS,
  },
};

module.exports = mailTrap;
