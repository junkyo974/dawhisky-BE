"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("StoreWhiskys", {
      storewhisky_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      whisky_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Whiskys",
          key: "whisky_id",
        },
        onDelete: "CASCADE",
      },
      store_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Stores",
          key: "store_id",
        },
        onDelete: "CASCADE",
      },
      count: {
        allowNull: false,
        defaultValue: 0,
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
    await queryInterface.dropTable("StoreWhiskys");
  },
};
