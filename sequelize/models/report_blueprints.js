"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class report_blueprints extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.reports, { foreignKey: "report_blueprint_id" });
    }
  }
  report_blueprints.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(255), allowNull: false },
      primary_master: { type: DataTypes.STRING(255), allowNull: false },
      second_master: DataTypes.STRING(255),
      third_master: DataTypes.STRING(255),
      forth_master: DataTypes.STRING(255),
      report_columns: { type: DataTypes.TEXT("long"), allowNull: false },
    },
    {
      sequelize,
      modelName: "report_blueprints",
      freezeTableName: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      defaultScope: {
        attributes: { exclude: ["created_at", "updated_at", "deleted_at"] },
      },
    }
  );
  // Define the association between User and Task models

  return report_blueprints;
};
