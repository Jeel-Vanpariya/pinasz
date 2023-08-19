"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class product_category_logs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.product_category, { foreignKey: "category_id" });
      this.belongsTo(models.users, { foreignKey: "user_id" });
    }
  }
  product_category_logs.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      category_id: { type: DataTypes.INTEGER, allowNull: false },
      old_value: { type: DataTypes.TEXT("long"), allowNull: false },
      new_value: { type: DataTypes.TEXT("long"), allowNull: false },
    },
    {
      sequelize,
      modelName: "product_category_logs",
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

  return product_category_logs;
};
