const { Router } = require('express');
const authMiddleware = require('../middlewares/auth');

const { authController } = require('../controllers');

const authRouter = Router();

authRouter.post('/verify', authMiddleware, authController.verify);

module.exports = authRouter;
