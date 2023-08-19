"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class invoice_parties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.shipments, { foreignKey: "invoicing_party_id" });
    }
  }
  invoice_parties.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      party_name: { type: DataTypes.STRING(255), allowNull: false },
    },
    {
      sequelize,
      modelName: "invoice_parties",
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

  return invoice_parties;
};
