'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users',[{
      id: 10075967,
      username: 'datCalata',
      createdAt: new Date(),
      updatedAt: new Date(),
      isAdmin: true
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users',null,{});
  }
};
