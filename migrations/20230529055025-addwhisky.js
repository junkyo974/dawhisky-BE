"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return [
      queryInterface.addColumn("Whiskys", "whisky_abv", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn("Whiskys", "whisky_desc", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.removeColumn("Whiskys", "whisky_taste"),
    ];
  },

  async down(queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn("Whiskys", "whisky_abv"),
      queryInterface.removeColumn("Whiskys", "whisky_desc"),
    ];
  },
};
