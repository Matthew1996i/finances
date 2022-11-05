require('dotenv/config');

module.exports = {
  async verify(req, res) {
    try {
      const { uuid, message } = req;
      res.status(200).json({ uuid, message });
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
