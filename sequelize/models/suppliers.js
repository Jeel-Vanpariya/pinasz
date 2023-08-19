"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class suppliers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.product_supplier_map, { foreignKey: "supplier_id" });
      this.hasMany(models.supplier_logs, { foreignKey: "supplier_id" });
      this.hasMany(models.shipments, { foreignKey: "supplier_id" });
      this.hasMany(models.shipment_po_details, { foreignKey: "supplier_id" });
      this.belongsTo(models.payment_terms, { foreignKey: "payment_term_id" });
      this.belongsTo(models.countries, { foreignKey: "country_id" });
    }
  }
  suppliers.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      s_no: { type: DataTypes.STRING(512), allowNull: false },
      supplier_name: { type: DataTypes.STRING(512), allowNull: false },
      phone_no: { type: DataTypes.STRING(255), allowNull: false },
      address: { type: DataTypes.TEXT("long"), allowNull: false },
      pincode: { type: DataTypes.STRING(255), allowNull: false },
      bank_name: DataTypes.STRING(512),
      bank_address: DataTypes.TEXT("long"),
      bank_account_no: DataTypes.STRING(512),
      iban_no: DataTypes.STRING(255),
      swift_code: DataTypes.STRING(255),
      country_id: { type: DataTypes.INTEGER, allowNull: false },
      payment_term_id: { type: DataTypes.INTEGER, allowNull: false },
      contact_person: { type: DataTypes.STRING(512), allowNull: false },
      email: { type: DataTypes.STRING(512), allowNull: false },
      contact_no: { type: DataTypes.STRING(512), allowNull: false },
    },
    {
      sequelize,
      modelName: "suppliers",
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

  return suppliers;
};
