const { Router } = require('express');
const { userController } = require('../controllers');
const authMiddleware = require('../middlewares/auth');

const userRouter = Router();

userRouter.post('/create', userController.createUser);
userRouter.post('/login', userController.UserLogin);
userRouter.post('/sendemailpasswordrecovery', userController.SendEmailPasswordRecovery);
userRouter.post('/passwordrecovery', userController.PasswordRecovery);
userRouter.post('/getuser', authMiddleware, userController.getUser);

module.exports = userRouter;
