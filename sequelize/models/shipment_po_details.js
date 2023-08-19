"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class shipment_po_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.shipments, { foreignKey: "shipment_id" });
      this.belongsTo(models.products, { foreignKey: "item_id" });
      this.belongsTo(models.suppliers, { foreignKey: "supplier_id" });
    }
  }
  shipment_po_details.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      shipment_id: { type: DataTypes.INTEGER, allowNull: false },
      supplier_id: { type: DataTypes.INTEGER, allowNull: false },
      item_id: { type: DataTypes.INTEGER, allowNull: false },
      qty: { type: DataTypes.INTEGER, allowNull: false },
      price: { type: DataTypes.FLOAT, allowNull: false },
    },
    {
      sequelize,
      modelName: "shipment_po_details",
      freezeTableName: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      defaultScope: {
        attributes: { exclude: ["created_at", "updated_at"] },
      },
    }
  );
  // Define the association between User and Task models

  return shipment_po_details;
};
