"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class counters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  counters.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      master_name: { type: DataTypes.STRING(255), allowNull: false },
      start_string: { type: DataTypes.STRING(255), allowNull: false },
      counter: { type: DataTypes.STRING(255), allowNull: false },
    },
    {
      sequelize,
      modelName: "counters",
      freezeTableName: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      defaultScope: {
        attributes: { exclude: ["created_at", "updated_at"] },
      },
    }
  );
  // Define the association between User and Task models

  return counters;
};
