"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class consignees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.shipments, { foreignKey: "consignee_id" });
    }
  }
  consignees.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      consignee_name: { type: DataTypes.STRING(255), allowNull: false },
    },
    {
      sequelize,
      modelName: "consignees",
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

  return consignees;
};
