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
    const userprofiles = require('../data/userprofiles.json').map(el => {
      el.createdAt = el.updatedAt = new Date()
      return el
      }
    )
    await queryInterface.bulkInsert('UserProfiles', userprofiles)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserProfiles', null, {truncate:true, restartIdentity: true});
  }
};
