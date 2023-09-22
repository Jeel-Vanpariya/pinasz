"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class loading_port extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.products, { foreignKey: "loading_port_id" });
      this.hasOne(models.shipments, { foreignKey: "loading_port_id" });
      this.belongsTo(models.countries, { foreignKey: "country_id" });
    }
  }
  loading_port.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      port_name: { type: DataTypes.STRING(255), allowNull: false },
      country_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "loading_port",
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

  return loading_port;
};
