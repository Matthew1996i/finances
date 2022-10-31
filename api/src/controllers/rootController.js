const index = async (_req, res, next) => {
  try {
    return res.status(200).json({
      API: 'Backend Anime Control',
      Version: '1.0.0',
      Developer: 'Matheus Pereira',
      Website: 'Anime Control API',
      Documentation:
        '',
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  index,
};
