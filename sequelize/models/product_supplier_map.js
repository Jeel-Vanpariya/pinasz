"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class product_supplier_map extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.products, { foreignKey: "product_id" });
      this.belongsTo(models.suppliers, { foreignKey: "supplier_id" });
    }
  }
  product_supplier_map.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      product_id: { type: DataTypes.INTEGER, allowNull: false },
      supplier_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "product_supplier_map",
      freezeTableName: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      defaultScope: {
        attributes: { exclude: ["created_at", "updated_at"] },
      },
    }
  );
  // Define the association between User and Task models

  return product_supplier_map;
};
