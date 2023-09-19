"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class currencies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.products, { foreignKey: "currency_id" });
      this.hasMany(models.shipments, { foreignKey: "currency_id" });
      this.hasMany(models.shipments, { foreignKey: "sale_invoice_val_currency_id" });
      this.hasMany(models.shipments, { foreignKey: "s_final_inv_value_currency_id" });
    }
  }
  currencies.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(255), allowNull: false },
    },
    {
      sequelize,
      modelName: "currencies",
      freezeTableName: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      defaultScope: {
        attributes: { exclude: ["created_at", "updated_at"] },
      },
    }
  );
  // Define the association between User and Task models

  return currencies;
};
