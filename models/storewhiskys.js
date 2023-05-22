"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StoreWhiskys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Stores, {
        targetKey: "store_id",
        foreignKey: "store_id",
      });
      this.belongsTo(models.Whiskys, {
        targetKey: "whisky_id",
        foreignKey: "whisky_id",
      });
    }
  }
  StoreWhiskys.init(
    {
      storewhisky_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      whisky_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Whiskys",
          key: "whisky_id",
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
      count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
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
      modelName: "StoreWhiskys",
    }
  );
  return StoreWhiskys;
};
