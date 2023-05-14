const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const models = require('../resources/models-list');

function Database() {
  const connection = new Sequelize(dbConfig);

  models.map((model) => model.init(connection));
}

module.exports = new Database();
