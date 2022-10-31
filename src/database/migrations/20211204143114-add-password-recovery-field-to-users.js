'--unhandled-rejections=strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('users', 'passwordresettoken', {
      type: Sequelize.STRING,
    });
    queryInterface.addColumn('users', 'passwordresetexpires', {
      type: Sequelize.DATE,
    });
  },
  down: async (queryInterface) => {
    queryInterface.removeColumn('users', 'passwordresettoken');
    queryInterface.removeColumn('users', 'passwordresetexpires');
  },
};
