'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'asambleas',
      {
          id: {
              type: Sequelize.INTEGER,
              allowNull: false,
              primaryKey: true,
              autoIncrement: true,
              unique: true
          },
          date:{
              type: Sequelize.DATE,
              validate: {notEmpty: {msg: "Date cannot be empty"}}
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
    return queryInterface.dropTable('asambleas');
  }
};
