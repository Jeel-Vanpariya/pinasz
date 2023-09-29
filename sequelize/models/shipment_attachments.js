"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class shipment_attachments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.shipments, { foreignKey: "shipment_id" });
    }
  }
  shipment_attachments.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      shipment_id: { type: DataTypes.INTEGER, allowNull: false },
      upload_field: { type: DataTypes.STRING(255), allowNull: false },
      path: { type: DataTypes.TEXT('long'), allowNull: false },
    },
    {
      sequelize,
      modelName: "shipment_attachments",
      freezeTableName: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      defaultScope: {
        attributes: { exclude: ["created_at", "updated_at"] },
      },
    }
  );
  // Define the association between User and Task models

  return shipment_attachments;
};
