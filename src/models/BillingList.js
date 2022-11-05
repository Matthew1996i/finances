const { Model, DataTypes } = require('sequelize');

class BillingList extends Model {
  static init(connection) {
    super.init(
      {
        user_id: DataTypes.INTEGER,
        title: DataTypes.STRING,
        date: DataTypes.DATE,
        value: DataTypes.FLOAT,
        due_date: DataTypes.DATE,
        due_limit_date: DataTypes.DATE,
        status: {
          type: DataTypes.ENUM,
          values: ['open', 'paid', 'pending'],
        },
        type: DataTypes.STRING,
      },
      {
        sequelize: connection,
        tableName: 'user_billing_list',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user_id_list',
    });
  }
}

module.exports = BillingList;
