"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Whiskys", {
      whisky_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      whisky_eng: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      whisky_kor: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      whisky_country: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      whisky_region: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      whisky_age: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      whisky_type: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      whisky_taste: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Whiskys");
  },
};
