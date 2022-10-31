const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(connection) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      emailverify: DataTypes.INTEGER,
      passwordresettoken: DataTypes.STRING,
      passwordresetexpires: DataTypes.DATE,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    }, {
      sequelize: connection,
    });
  }
}

module.exports = User;
