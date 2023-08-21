"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class payment_terms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.suppliers, { foreignKey: "payment_term_id" });
      this.hasOne(models.shipments, { foreignKey: "payment_term_id" });
    }
  }
  payment_terms.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      advance_percentage: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      advance_text: { type: DataTypes.STRING(255), allowNull: false },
      pending_percentage: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      pending_text: { type: DataTypes.STRING(255), allowNull: false },
    },
    {
      sequelize,
      modelName: "payment_terms",
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

  return payment_terms;
};
