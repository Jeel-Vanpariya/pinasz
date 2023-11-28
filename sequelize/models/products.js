"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.product_category_map, { foreignKey: "product_id" });
      this.hasMany(models.product_supplier_map, { foreignKey: "product_id" });
      this.hasMany(models.product_logs, { foreignKey: "product_id" });
      this.hasMany(models.shipment_po_details, { foreignKey: "item_id" });
      this.belongsTo(models.container_types, { foreignKey: "container_type_id" });
      this.belongsTo(models.loading_port, { foreignKey: "loading_port_id" });
      this.belongsTo(models.countries, { foreignKey: "origin" });
      this.belongsTo(models.currencies, { foreignKey: "currency_id" });
    }
  }
  products.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      item_no: { type: DataTypes.STRING(512), allowNull: false },
      item_name: { type: DataTypes.STRING(512), allowNull: false },
      additions_details: DataTypes.STRING(512),
      brand: { type: DataTypes.STRING(512), allowNull: false },
      container_type_id: { type: DataTypes.INTEGER, allowNull: false },
      pack: { type: DataTypes.STRING(512), allowNull: false },
      pack_size: { type: DataTypes.STRING(512), allowNull: false },
      uom: { type: DataTypes.STRING(512), allowNull: false },
      cbm: { type: DataTypes.STRING(512), allowNull: false },
      loading_per_container: { type: DataTypes.INTEGER, allowNull: false },
      origin: { type: DataTypes.INTEGER, allowNull: false },
      loading_port_id: { type: DataTypes.INTEGER, allowNull: false },
      last_fob: { type: DataTypes.STRING(512), allowNull: false },
      currency_id: { type: DataTypes.INTEGER, allowNull: false },
      date: { type: DataTypes.DATE, allowNull: false },
      supplier_ref_no: { type: DataTypes.TEXT("long"), allowNull: false },
      pcs: { type: DataTypes.STRING(512), allowNull: false },
      ctn: { type: DataTypes.STRING(512), allowNull: false },
    },
    {
      sequelize,
      modelName: "products",
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

  return products;
};
