const authRouter = require('./authRouter');
const rootRouter = require('./rootRouter');
const userRouter = require('./userRouter');
const xlsxRouter = require('./uploadXlsxRouter');

module.exports = {
  rootRouter,
  userRouter,
  authRouter,
  xlsxRouter,
};
