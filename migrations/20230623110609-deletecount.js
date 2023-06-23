"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // async up(queryInterface, Sequelize) {
  //   queryInterface.removeColumn("StoreWhiskys", "count");
  // },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
