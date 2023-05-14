require('dotenv/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const mailer = require('../modules/mailer');

const User = require('../models/User');

const saltRounds = 10;

function generateToken(params = {}) {
  return jwt.sign(params, process.env.API_SECRET, {
    expiresIn: 86400,
  });
}

module.exports = {
  async createUser(req, res) {
    try {
      const { name, email, password } = req.body;

      if (
        !name ||
        !email ||
        !password ||
        password === ' ' ||
        password === undefined ||
        password === null
      )
        return res
          .status(400)
          .json({ message: 'Fields cannot be equal to empty or undefined' });

      const checkUser = await User.findOne({
        where: {
          email,
        },
      });

      if (checkUser)
        return res
          .status(200)
          .json({ message: 'There is already a user for this email' });

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPassword = bcrypt.hashSync(password, salt);

      const dataUser = {
        name,
        email,
        password: hashPassword,
        emailverify: 0,
      };

      const user = await User.create(dataUser);

      return res.status(200).json({
        name: user.name,
        email: user.email,
        emailverify: user.emailverify,
      });
    } catch (err) {
      throw new Error(err);
    }
  },

  async UserLogin(req, res) {
    try {
      const { email, password } = req.body;

      if (!email)
        return res.status(400).json({ message: 'values invalid or undefined' });

      const checkUser = await User.findOne({
        attributes: ['id', 'email', 'password', 'emailverify'],
        where: {
          email,
        },
      });

      if (!checkUser)
        return res.status(200).json({ message: 'User not found' });

      const istrue = bcrypt.compareSync(password, checkUser.password);

      if (!istrue)
        return res.status(200).json({ message: 'Incorrect password or email' });

      const token = generateToken({
        email: checkUser.email,
        id: checkUser.id,
      });

      return res.status(200).json({ token });
    } catch (err) {
      throw new Error(err);
    }
  },

  async SendEmailPasswordRecovery(req, res) {
    try {
      const { email } = req.body;

      if (!email)
        return res.status(406).json({ message: 'email address not entered!' });

      const userFound = await User.findOne({
        attributes: ['email', 'name'],
        where: {
          email,
        },
      });

      if (!userFound)
        return res
          .status(404)
          .json({ message: 'There is no user with the email entered' });

      const token = crypto.randomBytes(20).toString('hex');
      const now = new Date();
      now.setHours(now.getHours() + 1);

      await User.update(
        { passwordresettoken: token, passwordresetexpires: now },
        {
          where: {
            email,
          },
        }
      );

      now.setHours(now.getHours() - 3);

      mailer.sendMail(
        {
          to: email,
          from: process.env.MAILUSER,
          template: 'auth/forgot_password',
          context: { name: userFound.name },
          subject: 'Reset Password',
        },
        (err) =>
          res.status(500).json({
            message: 'Error to send E-mail',
            err,
          })
      );

      res.status(200).json({
        message: 'Email sent successful',
      });
    } catch (err) {
      throw new Error(err);
    }
  },

  async PasswordRecovery(req, res) {
    try {
      const { token, email, password } = req.body;

      if (!email)
        return res.status(401).json({ message: 'Email not informed' });

      const user = await User.findOne({
        attributes: ['passwordresetexpires', 'passwordresettoken'],
        where: {
          email,
        },
      });

      if (!user) return res.status(401).json({ message: 'invalid token' });

      if (!token)
        return res.status(401).json({ message: 'token not informed' });

      if (user.passwordresettoken !== token)
        return res
          .status(401)
          .json({ message: 'Token does not match or poorly formatted' });

      const now = new Date();

      if (user.passwordresetexpires < now)
        return res
          .status(401)
          .json({ message: 'token expired generate a new one' });

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPassword = bcrypt.hashSync(password, salt);

      await User.update(
        { password: hashPassword },
        {
          where: {
            email,
          },
        }
      );

      return res.json({ message: 'password updated' });
    } catch (err) {
      throw new Error(err);
    }
  },

  async getUser(req, res) {
    try {
      const id = req.uuid;
      const users = await User.findAll({
        where: {
          id,
        },
      });
      return res.json(users);
    } catch (error) {
      throw new Error(err);
    }
  },
};
