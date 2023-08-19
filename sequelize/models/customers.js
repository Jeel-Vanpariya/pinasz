"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class customers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.customer_logs, { foreignKey: "customer_id" });
      this.hasMany(models.shipments, { foreignKey: "buyer_id", as: "buyer" });
      this.hasMany(models.shipments, { foreignKey: "customer_id" });
      this.belongsTo(models.countries, { foreignKey: "country_id" });
    }
  }
  customers.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      s_no: { type: DataTypes.STRING(512), allowNull: false },
      group_name: { type: DataTypes.STRING(512), allowNull: false },
      buyer_name: { type: DataTypes.STRING(512), allowNull: false },
      address: { type: DataTypes.TEXT("long"), allowNull: false },
      country_id: { type: DataTypes.INTEGER, allowNull: false },
      contact_person: { type: DataTypes.STRING(512), allowNull: false },
      email: { type: DataTypes.STRING(512), allowNull: false },
      contact_no: { type: DataTypes.STRING(512), allowNull: false },
    },
    {
      sequelize,
      modelName: "customers",
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

  return customers;
};
