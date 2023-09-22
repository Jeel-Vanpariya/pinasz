"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class countries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.customers, { foreignKey: "country_id" });
      this.hasMany(models.suppliers, { foreignKey: "country_id" });
      this.hasMany(models.products, { foreignKey: "origin" });
      this.hasMany(models.consignees, { foreignKey: "country_id" });
      this.hasMany(models.shipments, { foreignKey: "country_id" });
      this.hasMany(models.loading_port, { foreignKey: "country_id" });
      this.hasMany(models.destination_port, { foreignKey: "country_id" });
    }
  }
  countries.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(255), allowNull: false },
      code: { type: DataTypes.STRING(255), allowNull: false },
    },
    {
      sequelize,
      modelName: "countries",
      freezeTableName: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      defaultScope: {
        attributes: { exclude: ["created_at", "updated_at"] },
      },
    }
  );
  // Define the association between User and Task models

  return countries;
};
