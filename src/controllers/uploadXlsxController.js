require('dotenv/config');
const csvtojsonV2 = require('csvtojson/v2');
const fs = require('fs');

const BillingList = require('../models/BillingList');

module.exports = {
  async store(req, res) {
    try {
      const id = req.uuid;
      const stream = fs.createReadStream(req.file.path, 'utf8');
      const streamCsv = csvtojsonV2().on('data', (data) => data);

      const csvValues = await stream.pipe(streamCsv);

      const listFormat = await csvValues.map((item) => {
        return {
          date: Date(item.date),
          type: item.type,
          title: item.title,
          value: parseFloat(item.value),
          status: item.status,
          user_id: id,
          due_date: Date(item['due date']),
          due_limit_date: Date(item['due limit date']),
        };
      });

      const dataCreated = await BillingList.bulkCreate(listFormat);

      res.status(200).json(dataCreated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  },
};
