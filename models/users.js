"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Reviews, {
        sourceKey: "user_id",
        foreignKey: "user_id",
      });
      this.hasMany(models.WhiskyLikes, {
        sourceKey: "user_id",
        foreignKey: "user_id",
      });
      this.hasMany(models.StoreLikes, {
        sourceKey: "user_id",
        foreignKey: "user_id",
      });
      this.hasMany(models.Ques, {
        sourceKey: "user_id",
        foreignKey: "user_id",
      });
    }
  }
  Users.init(
    {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
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
      modelName: "Users",
    }
  );
  return Users;
};
