"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class reports extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.report_blueprints, { foreignKey: "report_blueprint_id" });
    }
  }
  reports.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      report_blueprint_id: { type: DataTypes.INTEGER, allowNull: false },
      path: { type: DataTypes.STRING(512), allowNull: false },
    },
    {
      sequelize,
      modelName: "reports",
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

  return reports;
};
