"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Searches extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Whiskys, {
        targetKey: "whisky_id",
        foreignKey: "whisky_id",
      });
    }
  }
  Searches.init(
    {
      search_id: {
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
      count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
      modelName: "Searches",
    }
  );
  return Searches;
};
