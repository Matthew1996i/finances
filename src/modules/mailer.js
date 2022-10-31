const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path')

const mailTrap = require('../config/mail')

const {
  host,
  port,
  auth
} = mailTrap

const transport = nodemailer.createTransport({
  host,
  port,
  auth
});


transport.use('compile', hbs({
  viewEngine: {
    defaultLayout: undefined,
    partialsDir: path.resolve('./src/resources/mail/')
  },
  viewPath: path.resolve('./src/resources/mail/'),
  extName: '.html',
}));

module.exports = transport;
