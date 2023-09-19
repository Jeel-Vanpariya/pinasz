"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class shipments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.countries, { foreignKey: "country_id" });
      this.belongsTo(models.customers, { foreignKey: "buyer_id", as: "buyer" });
      this.belongsTo(models.customers, { foreignKey: "customer_id" });
      this.belongsTo(models.suppliers, { foreignKey: "supplier_id" });
      this.belongsTo(models.payment_terms, { foreignKey: "payment_term_id" });
      this.belongsTo(models.invoice_parties, { foreignKey: "invoicing_party_id" });
      this.belongsTo(models.loading_port, { foreignKey: "loading_port_id" });
      this.belongsTo(models.destination_port, { foreignKey: "destination_port_id" });
      this.belongsTo(models.final_destinations, { foreignKey: "final_destination_id" });
      this.belongsTo(models.consignees, { foreignKey: "consignee_id" });
      this.belongsTo(models.shipping_line, { foreignKey: "shipping_line_id" });
      this.belongsTo(models.incoterm, { foreignKey: "incoterm_id" });
      this.belongsTo(models.mode_of_transport, { foreignKey: "mode_of_transport_id" });
      this.belongsTo(models.currencies, { foreignKey: "currency_id", as: "currency" });
      this.belongsTo(models.currencies, { foreignKey: "sale_invoice_val_currency_id", as: "saleInvoiceValCurrency" });
      this.belongsTo(models.currencies, { foreignKey: "s_final_inv_value_currency_id", as: "sFinalInvValueCurrency" });
      this.belongsTo(models.suppliers, { foreignKey: "cnca_agent_id", as: "agent" });
      this.hasMany(models.shipment_po_details, { foreignKey: "shipment_id" });
      this.hasMany(models.shipments_logs, { foreignKey: "shipment_id" });
      this.hasMany(models.shipment_container_details, { foreignKey: "shipment_id" });
    }
  }
  shipments.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      country_id: { type: DataTypes.INTEGER, allowNull: false },
      po_no: { type: DataTypes.STRING(512), allowNull: false },
      supplier_id: { type: DataTypes.INTEGER, allowNull: false },
      buyer_id: { type: DataTypes.INTEGER, allowNull: false },
      customer_id: { type: DataTypes.INTEGER, allowNull: false },
      supp_po_date: { type: DataTypes.DATE, allowNull: false },
      invoicing_party_id: { type: DataTypes.INTEGER, allowNull: false },
      our_po_date: { type: DataTypes.DATE, allowNull: false },
      our_po_no: { type: DataTypes.STRING(512), allowNull: false },
      payment_term_id: { type: DataTypes.INTEGER, allowNull: false },
      supp_po_value: { type: DataTypes.STRING(512), allowNull: false },
      sup_po_no: { type: DataTypes.STRING(512), allowNull: false },
      currency_id: { type: DataTypes.INTEGER, allowNull: false },
      loading_port_id: { type: DataTypes.INTEGER, allowNull: false },
      destination_port_id: { type: DataTypes.INTEGER, allowNull: false },
      final_destination_id: { type: DataTypes.INTEGER, allowNull: false },
      inspection: { type: DataTypes.STRING(512), allowNull: false },
      cust_po_no: DataTypes.TEXT("long"),
      number_of_container: DataTypes.STRING(512),
      adv_rec_date: DataTypes.DATE,
      adv_pay_date: DataTypes.DATE,
      purchase_invoice: DataTypes.STRING(512),
      sale_invoice_val: DataTypes.INTEGER,
      sale_invoice_val_currency_id: DataTypes.INTEGER,
      sale_inv_no: DataTypes.STRING(512),
      s_f_inv_no: DataTypes.STRING(512),
      s_final_inv_value: DataTypes.INTEGER,
      s_final_inv_value_currency_id: DataTypes.INTEGER,
      final_rec_date: DataTypes.DATE,
      final_pay_date: DataTypes.DATE,
      percentage: DataTypes.FLOAT,
      commission: DataTypes.FLOAT,
      share: DataTypes.FLOAT,
      payment_request_lot: DataTypes.STRING(512),
      dhl_no: DataTypes.STRING(512),
      cod_number: DataTypes.STRING(512),
      rfi_date: DataTypes.DATE,
      consignee_id: DataTypes.INTEGER,
      freight_booking_date: DataTypes.DATE,
      freight_booking_no: DataTypes.STRING(512),
      shipping_line_id: DataTypes.INTEGER,
      incoterm_id: DataTypes.INTEGER,
      mode_of_transport_id: DataTypes.INTEGER,
      estimated_dob: DataTypes.DATE,
      revised_dob: DataTypes.DATE,
      actual_dob: DataTypes.DATE,
      scan_bl_date: DataTypes.DATE,
      stuf_photo: DataTypes.DATE,
      est_arriv_date: DataTypes.DATE,
      bl_no: DataTypes.STRING(512),
      remarks: DataTypes.TEXT("long"),
      draft_cnca: DataTypes.DATE,
      original_cnca: DataTypes.DATE,
      cnca_agent_id: DataTypes.INTEGER,
      dup: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "shipments",
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

  return shipments;
};
