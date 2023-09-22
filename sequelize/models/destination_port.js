"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class destination_port extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.shipments, { foreignKey: "destination_port_id" });
      this.belongsTo(models.countries, { foreignKey: "country_id" });
    }
  }
  destination_port.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      port_name: { type: DataTypes.STRING(255), allowNull: false },
      country_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "destination_port",
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

  return destination_port;
};
