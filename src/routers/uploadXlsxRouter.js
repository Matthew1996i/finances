const { Router } = require('express');
const path = require('path');
const multer = require('multer');

const { uploadXlsxController } = require('../controllers');
const authMiddleware = require('../middlewares/auth');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.dirname('/tmp/my-uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});
const upload = multer({ storage: storage });
const xlsxRouter = Router();

xlsxRouter.post(
  '/uploadFile',
  authMiddleware,
  upload.single('file'),
  uploadXlsxController.store
);

module.exports = xlsxRouter;
