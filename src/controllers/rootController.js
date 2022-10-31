const index = async (_req, res, next) => {
  try {
    return res.status(200).json({
      API: 'Backend Finances Api',
      Version: '1.0.0',
      Developer: 'Matheus Pereira',
      Documentation: '',
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  index,
};
