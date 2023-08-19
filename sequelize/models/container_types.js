"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class container_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.products, { foreignKey: "container_type_id" });
      this.hasMany(models.shipment_container_details, { foreignKey: "container_type_id" });
    }
  }
  container_types.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      type_name: { type: DataTypes.STRING(255), allowNull: false },
    },
    {
      sequelize,
      modelName: "container_types",
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

  return container_types;
};
