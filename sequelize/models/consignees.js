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
      this.belongsTo(models.countries, { foreignKey: "country_id" });
    }
  }
  consignees.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      consignee_name: { type: DataTypes.STRING(255), allowNull: false },
      tax_id: { type: DataTypes.STRING(255), allowNull: false },
      phone_no: { type: DataTypes.STRING(255), allowNull: false },
      email: { type: DataTypes.STRING(255), allowNull: false },
      address: { type: DataTypes.TEXT("long"), allowNull: false },
      state: { type: DataTypes.STRING(255), allowNull: false },
      city: { type: DataTypes.STRING(255), allowNull: false },
      pincode: { type: DataTypes.STRING(255), allowNull: false },
      country_id: { type: DataTypes.INTEGER, allowNull: false },
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
