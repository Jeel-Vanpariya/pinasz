"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class mode_of_transport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.shipments, { foreignKey: "mode_of_transport_id" });
    }
  }
  mode_of_transport.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(255), allowNull: false },
    },
    {
      sequelize,
      modelName: "mode_of_transport",
      freezeTableName: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      defaultScope: {
        attributes: { exclude: ["created_at", "updated_at"] },
      },
    }
  );
  // Define the association between User and Task models

  return mode_of_transport;
};
