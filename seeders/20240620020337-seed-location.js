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
    const locations = require('../data/locations.json').map(el => {
      el.createdAt = el.updatedAt = new Date()
      return el
      }
    )
    await queryInterface.bulkInsert('Locations', locations)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Locations', null, {truncate:true, restartIdentity: true});
  }
};

