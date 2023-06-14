"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ques extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, {
        targetKey: "user_id",
        foreignKey: "user_id",
      });
      this.belongsTo(models.Stores, {
        targetKey: "store_id",
        foreignKey: "store_id",
      });
    }
  }
  Ques.init(
    {
      que_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "user_id",
        },
        onDelete: "CASCADE",
      },
      store_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Stores",
          key: "store_id",
        },
        onDelete: "CASCADE",
      },
      request: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      head_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      want_table: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      device_token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        defaultValue: DataTypes.NOW,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: DataTypes.NOW,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Ques",
    }
  );
  return Ques;
};
