"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Stores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.StoreWhiskys, {
        sourceKey: "store_id",
        foreignKey: "store_id",
      });
      this.hasMany(models.StoreTables, {
        sourceKey: "store_id",
        foreignKey: "store_id",
      });
      this.hasMany(models.StoreLikes, {
        sourceKey: "store_id",
        foreignKey: "store_id",
      });
      this.hasMany(models.Ques, {
        sourceKey: "store_id",
        foreignKey: "store_id",
      });
    }
  }
  Stores.init(
    {
      store_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      store: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      biz_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      biz_photo: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      slikes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      notice: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      runtime: {
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
      modelName: "Stores",
    }
  );
  return Stores;
};
