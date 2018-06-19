'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'users',
      {
          id: {
              type: Sequelize.INTEGER,
              allowNull: false,
              primaryKey: true,
              unique: true
          },
          username: {
            type: Sequelize.STRING,
            validate: {notEmpty: {msg:"name cannot be empty"}}
          },
          createdAt: {
              type: Sequelize.DATE,
              allowNull: false
          },
          updatedAt: {
              type: Sequelize.DATE,
              allowNull: false
          }
      },
      {
          sync: {force: true}
      }
);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
