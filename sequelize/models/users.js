"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.product_logs, { foreignKey: "user_id" });
      this.hasMany(models.product_category_logs, { foreignKey: "user_id" });
      this.hasMany(models.customer_logs, { foreignKey: "user_id" });
      this.hasMany(models.supplier_logs, { foreignKey: "user_id" });
      this.hasMany(models.shipments_logs, { foreignKey: "user_id" });
      this.belongsTo(models.roles, { foreignKey: "role_id" });
    }
  }
  users.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(512), allowNull: false },
      email: { type: DataTypes.STRING(512), allowNull: false },
      password: { type: DataTypes.STRING(255), allowNull: false },
      status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
      role_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "users",
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

  return users;
};
