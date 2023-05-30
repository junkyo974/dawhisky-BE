"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return [
      queryInterface.addColumn("Stores", "runtime", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ];
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn("Stores", "runtime");
  },
};
