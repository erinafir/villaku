'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const users = require('../data/users.json').map(el => {
      delete el.id
      el.createdAt = el.updatedAt = new Date()
      return el
      }
    )
    await queryInterface.bulkInsert('Users', users)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {truncate:true, restartIdentity: true});
  }
};
