require("dotenv/config");

const mailTrap = {
  host: process.env.MAILHOST,
  port: process.env.MAILPORT,
  auth: {
    user: process.env.MAILUSER,
    pass: process.env.MAILPASS
  }
}

module.exports = mailTrap