"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return [
      queryInterface.addColumn("Stores", "address", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn("Stores", "phone", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn("Stores", "notice", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
    ];
  },

  async down(queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn("Stores", "address"),
      queryInterface.removeColumn("Stores", "phone"),
      queryInterface.removeColumn("Stores", "notice"),
    ];
  },
};
