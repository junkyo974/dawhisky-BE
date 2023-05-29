"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Whiskys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Reviews, {
        sourceKey: "whisky_id",
        foreignKey: "whisky_id",
      });
      this.hasMany(models.WhiskyLikes, {
        sourceKey: "whisky_id",
        foreignKey: "whisky_id",
      });
      this.hasMany(models.StoreWhiskys, {
        sourceKey: "whisky_id",
        foreignKey: "whisky_id",
      });
    }
  }
  Whiskys.init(
    {
      whisky_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      whisky_photo: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      whisky_eng: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      whisky_kor: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      whisky_country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      whisky_region: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      whisky_age: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      whisky_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      whisky_desc: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      whisky_abv: {
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
      modelName: "Whiskys",
    }
  );
  return Whiskys;
};
