'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const villas = require('../data/villas.json').map(el => {
      delete el.id
      el.createdAt = el.updatedAt = new Date()
      return el
      }
    )
    await queryInterface.bulkInsert('Villas', villas)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Villas', null, {truncate:true, restartIdentity: true});
  }
};