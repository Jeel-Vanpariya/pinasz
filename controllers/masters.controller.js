const db = require("../sequelize/models");

exports.masterManagement = async (data) => {
  let response = [],
    option = { attributes: [], include: [], raw: true };
  data.report_columns = JSON.parse(data.report_columns);
  if (data.primary_master == "shipment_master") {
    let master = this.shipmentMaster(data);
    option.attributes = master.attributes;
    option.include = master.include;
    if (data.second_master == "product_master") {
      master = this.productMaster(data);
      option.include.push({
        model: db.shipment_po_details,
        attributes: [],
        duplicating: false,
        include: [
          {
            model: db.products,
            attributes: [],
            duplicating: false,
            include: master.include,
          },
        ],
      });
      option.attributes.push(...master.attributes);
    } else if (data.second_master == "customer_master") {
      master = this.productMaster(data);
      option.include.push({
        model: db.customers,
        attributes: [],
        duplicating: false,
        include: master.include,
      });
      option.attributes.push(...master.attributes);
    } else if (data.second_master == "supplier_master") {
      master = this.supplierMaster(data);
      option.include.push({
        model: db.suppliers,
        attributes: [],
        duplicating: false,
        include: master.include,
      });
      option.attributes.push(...master.attributes);
    }
    response = await db.shipments.findAll(option);
  } else if (data.primary_master == "product_master") {
    let master = this.productMaster(data);
    option.attributes = master.attributes;
    option.include = master.include;
    if (data.second_master == "shipment_master") {
      master = this.shipmentMaster(data);
      if (data.third_master == "customer_master") {
        const innerMaster = this.customerMaster(data);
        master.include.push({
          model: db.customers,
          attributes: [],
          duplicating: false,
          include: innerMaster.include,
        });
        master.attributes.push(...innerMaster.attributes);
      }
      option.include.push({
        model: db.shipment_po_details,
        attributes: [],
        duplicating: false,
        include: [
          {
            model: db.shipments,
            attributes: [],
            duplicating: false,
            include: master.include,
          },
        ],
      });
      option.attributes.push(...master.attributes);
    } else if (data.second_master == "supplier_master") {
      master = this.supplierMaster(data);
      option.include.push({
        model: db.suppliers,
        attributes: [],
        duplicating: false,
        include: master.include,
      });
      option.attributes.push(...master.attributes);
    }
    response = await db.products.findAll(option);
  } else if (data.primary_master == "supplier_master") {
    let master = this.supplierMaster(data);
    option.attributes = master.attributes;
    option.include = master.include;
    if (data.second_master == "shipment_master") {
      master = this.shipmentMaster(data);
      if (data.third_master == "customer_master") {
        const innerMaster = this.customerMaster(data);
        master.include.push({
          model: db.customers,
          attributes: [],
          duplicating: false,
          include: innerMaster.include,
        });
        master.attributes.push(...innerMaster.attributes);
      }
      option.include.push({
        model: db.shipments,
        attributes: [],
        duplicating: false,
        include: master.include,
      });
      option.attributes.push(...master.attributes);
    } else if (data.second_master == "product_master") {
      master = this.productMaster(data);
      option.include.push({
        model: db.product_supplier_map,
        attributes: [],
        duplicating: false,
        include: [
          {
            model: db.products,
            attributes: [],
            duplicating: false,
            include: master.include,
          },
        ],
      });
      option.attributes.push(...master.attributes);
    }
    response = await db.suppliers.findAll(option);
  } else if (data.primary_master == "customer_master") {
    let master = this.customerMaster(data);
    option.attributes = master.attributes;
    option.include = master.include;
    if (data.second_master == "shipment_master") {
      master = this.shipmentMaster(data);
      if (data.third_master == "supplier_master") {
        const innerMaster = this.supplierMaster(data);
        master.include.push({
          model: db.suppliers,
          attributes: [],
          duplicating: false,
          include: innerMaster.include,
        });
        master.attributes.push(...innerMaster.attributes);
      } else if (data.third_master == "product_master") {
        const innerMaster = this.productMaster(data);
        master.include.push({
          model: db.shipment_po_details,
          attributes: [],
          duplicating: false,
          include: [
            {
              model: db.products,
              attributes: [],
              duplicating: false,
              include: innerMaster.include,
            },
          ],
        });
        master.attributes.push(...innerMaster.attributes);
      }
      option.include.push({
        model: db.shipments,
        attributes: [],
        duplicating: false,
        include: master.include,
      });
      option.attributes.push(...master.attributes);
    }
    response = await db.customers.findAll(option);
  }
  return response;
};

exports.shipmentMaster = (data) => {
  const include = [],
    attributes = [];
  if (!data.report_columns.shipment_master) return { include, attributes };
  for (const col of data.report_columns.shipment_master) {
    switch (col) {
      case "supplier":
        include.push({
          model: db.suppliers,
          attributes: [],
        });
        if (data.primary_master == "shipment_master") attributes.push([db.sequelize.col("supplier.supplier_name"), "supplier"]);
        if (data.primary_master == "product_master") attributes.push([db.sequelize.col("shipment_po_details.shipment.supplier.supplier_name"), "supplier"]);
        else attributes.push([db.sequelize.col("shipments.supplier.supplier_name"), "supplier"]);
        break;
      case "country":
        include.push({
          model: db.countries,
          attributes: [],
        });
        if (data.primary_master == "shipment_master") attributes.push([db.sequelize.col("country.name"), "country"]);
        if (data.primary_master == "product_master") attributes.push([db.sequelize.col("shipment_po_details.shipment.country.name"), "country"]);
        else attributes.push([db.sequelize.col("shipments.country.name"), "country"]);
        break;
      case "buyer":
        include.push({
          model: db.customers,
          as: "buyer",
          attributes: [],
        });
        if (data.primary_master == "shipment_master") attributes.push([db.sequelize.col("buyer.buyer_name"), "buyer"]);
        else if (data.primary_master == "product_master") attributes.push([db.sequelize.col("shipment_po_details.shipment.buyer.buyer_name"), "buyer"]);
        else attributes.push([db.sequelize.col("shipments.buyer.buyer_name"), "buyer"]);
        break;
      case "customer":
        include.push({
          model: db.customers,
          attributes: [],
        });
        if (data.primary_master == "shipment_master") attributes.push([db.sequelize.col("customer.group_name"), "customer"]);
        else if (data.primary_master == "product_master") attributes.push([db.sequelize.col("shipment_po_details.shipment.customer.group_name"), "customer"]);
        else attributes.push([db.sequelize.col("shipments.customer.group_name"), "customer"]);
        break;
      case "invoicing_party":
        include.push({
          model: db.invoice_parties,
          attributes: [],
        });
        if (data.primary_master == "shipment_master") attributes.push([db.sequelize.col("invoicing_party.party_name"), "invoicing_party"]);
        else if (data.primary_master == "product_master") attributes.push([db.sequelize.col("shipment_po_details.shipment.invoicing_party.party_name"), "invoicing_party"]);
        else attributes.push([db.sequelize.col("shipments.invoicing_party.party_name"), "invoicing_party"]);
        break;
      case "payment_term":
        include.push({
          model: db.payment_terms,
          attributes: [],
        });
        if (data.primary_master == "shipment_master")
          attributes.push([
            db.sequelize.fn(
              "CONCAT",
              db.sequelize.col("payment_term.advance_percentage"),
              "% ",
              db.sequelize.col("payment_term.advance_text"),
              " - ",
              db.sequelize.col("payment_term.pending_percentage"),
              "% ",
              db.sequelize.col("payment_term.pending_text")
            ),
            "payment_term",
          ]);
        else if (data.primary_master == "product_master")
          attributes.push([
            db.sequelize.fn(
              "CONCAT",
              db.sequelize.col("shipment_po_details.shipment.payment_term.advance_percentage"),
              "% ",
              db.sequelize.col("shipment_po_details.shipment.payment_term.advance_text"),
              " - ",
              db.sequelize.col("shipment_po_details.shipment.payment_term.pending_percentage"),
              "% ",
              db.sequelize.col("shipment_po_details.shipment.payment_term.pending_text")
            ),
            "payment_term",
          ]);
        else
          attributes.push([
            db.sequelize.fn(
              "CONCAT",
              db.sequelize.col("shipments.payment_term.advance_percentage"),
              "% ",
              db.sequelize.col("shipments.payment_term.advance_text"),
              " - ",
              db.sequelize.col("shipments.payment_term.pending_percentage"),
              "% ",
              db.sequelize.col("shipments.payment_term.pending_text")
            ),
            "payment_term",
          ]);
        break;
      case "currency":
        include.push({
          model: db.currencies,
          as: "currency",
          attributes: [],
        });
        if (data.primary_master == "shipment_master") attributes.push([db.sequelize.col("currency.name"), "currency"]);
        else if (data.primary_master == "product_master") attributes.push([db.sequelize.col("shipment_po_details.shipment.currency.name"), "currency"]);
        else attributes.push([db.sequelize.col("shipments.currency.name"), "currency"]);
        break;
      case "loading_port":
        include.push({
          model: db.loading_port,
          attributes: [],
        });
        if (data.primary_master == "shipment_master") attributes.push([db.sequelize.col("loading_port.port_name"), "loading_port"]);
        else if (data.primary_master == "product_master") attributes.push([db.sequelize.col("shipment_po_details.shipment.loading_port.port_name"), "loading_port"]);
        else attributes.push([db.sequelize.col("shipments.loading_port.port_name"), "loading_port"]);
        break;
      case "destination_port":
        include.push({
          model: db.destination_port,
          attributes: [],
        });
        if (data.primary_master == "shipment_master") attributes.push([db.sequelize.col("destination_port.port_name"), "destination_port"]);
        else if (data.primary_master == "product_master") attributes.push([db.sequelize.col("shipment_po_details.shipment.destination_port.port_name"), "destination_port"]);
        else attributes.push([db.sequelize.col("shipments.destination_port.port_name"), "destination_port"]);
        break;
      case "final_destination":
        include.push({
          model: db.final_destinations,
          attributes: [],
        });
        if (data.primary_master == "shipment_master") attributes.push([db.sequelize.col("final_destination.destination_name"), "final_destination"]);
        else if (data.primary_master == "product_master") attributes.push([db.sequelize.col("shipment_po_details.shipment.final_destination.destination_name"), "final_destination"]);
        else attributes.push([db.sequelize.col("shipments.final_destination.destination_name"), "final_destination"]);
        break;
      case "consignee":
        include.push({
          model: db.consignees,
          attributes: [],
        });
        if (data.primary_master == "shipment_master") attributes.push([db.sequelize.col("consignee.consignee_name"), "consignee"]);
        else if (data.primary_master == "product_master") attributes.push([db.sequelize.col("shipment_po_details.shipment.consignee.consignee_name"), "consignee"]);
        else attributes.push([db.sequelize.col("shipments.consignee.consignee_name"), "consignee"]);
        break;
      case "shipping_line":
        include.push({
          model: db.shipping_line,
          attributes: [],
        });
        if (data.primary_master == "shipment_master") attributes.push([db.sequelize.col("shipping_line.name"), "shipping_line"]);
        else if (data.primary_master == "product_master") attributes.push([db.sequelize.col("shipment_po_details.shipment.shipping_line.name"), "shipping_line"]);
        else attributes.push([db.sequelize.col("shipments.shipping_line.name"), "shipping_line"]);
        break;
      case "incoterm":
        include.push({
          model: db.incoterm,
          attributes: [],
        });
        if (data.primary_master == "shipment_master") attributes.push([db.sequelize.col("incoterm.name"), "incoterm"]);
        else if (data.primary_master == "product_master") attributes.push([db.sequelize.col("shipment_po_details.shipment.incoterm.name"), "incoterm"]);
        else attributes.push([db.sequelize.col("shipments.incoterm.name"), "incoterm"]);
        break;
      case "mode_of_transport":
        include.push({
          model: db.mode_of_transport,
          attributes: [],
        });
        if (data.primary_master == "shipment_master") attributes.push([db.sequelize.col("mode_of_transport.name"), "mode_of_transport"]);
        else if (data.primary_master == "product_master") attributes.push([db.sequelize.col("shipment_po_details.shipment.mode_of_transport.name"), "mode_of_transport"]);
        else attributes.push([db.sequelize.col("shipments.mode_of_transport.name"), "mode_of_transport"]);
        break;
      case "cnca_agent":
        include.push({
          model: db.suppliers,
          as: "agent",
          attributes: [],
        });
        if (data.primary_master == "shipment_master") attributes.push([db.sequelize.col("agent.supplier_name"), "cnca_agent"]);
        else if (data.primary_master == "product_master") attributes.push([db.sequelize.col("shipment_po_details.shipment.agent.supplier_name"), "cnca_agent"]);
        else attributes.push([db.sequelize.col("shipments.agent.supplier_name"), "cnca_agent"]);
        break;
      case "po_details_item":
        if (!["product_master", "customer_master"].includes(data.primary_master) && data.second_master != "product_master") {
          include.push({
            model: db.shipment_po_details,
            attributes: [],
            duplicating: false,
            include: [
              {
                model: db.products,
                attributes: [],
              },
            ],
          });
        }
        if (data.primary_master == "shipment_master") attributes.push([db.sequelize.col("shipment_po_details.product.item_name"), "po_details_item"]);
        else if (data.primary_master == "product_master") attributes.push([db.sequelize.col("shipment_po_details.product.item_name"), "po_details_item"]);
        else attributes.push([db.sequelize.col("shipments.shipment_po_details.product.item_name"), "po_details_item"]);
        break;
      case "po_details_qty":
        if (!["product_master", "customer_master"].includes(data.primary_master) && data.second_master != "product_master") {
          include.push({
            model: db.shipment_po_details,
            attributes: [],
            duplicating: false,
          });
        }
        if (data.primary_master == "shipment_master") attributes.push([db.sequelize.col("shipment_po_details.qty"), "po_details_qty"]);
        else if (data.primary_master == "product_master") attributes.push([db.sequelize.col("shipment_po_details.qty"), "po_details_qty"]);
        else attributes.push([db.sequelize.col("shipments.shipment_po_details.qty"), "po_details_qty"]);
        break;
      case "po_details_price":
        if (!["product_master", "customer_master"].includes(data.primary_master) && data.second_master != "product_master") {
          include.push({
            model: db.shipment_po_details,
            attributes: [],
            duplicating: false,
          });
        }
        if (data.primary_master == "shipment_master") attributes.push([db.sequelize.col("shipment_po_details.price"), "po_details_price"]);
        else if (data.primary_master == "product_master") attributes.push([db.sequelize.col("shipment_po_details.price"), "po_details_price"]);
        else attributes.push([db.sequelize.col("shipments.shipment_po_details.price"), "po_details_price"]);
        break;
      case "container_details_container_no":
        include.push({
          model: db.shipment_container_details,
          attributes: [],
          duplicating: false,
        });
        if (data.primary_master == "shipment_master") attributes.push([db.sequelize.col("shipment_container_details.container_no"), "container_details_container_no"]);
        else if (data.primary_master == "product_master") attributes.push([db.sequelize.col("shipment_po_details.shipment.shipment_container_details.container_no"), "container_details_container_no"]);
        else attributes.push([db.sequelize.col("shipments.shipment_container_details.container_no"), "container_details_container_no"]);
        break;
      case "container_details_item":
        include.push({
          model: db.shipment_container_details,
          attributes: [],
          duplicating: false,
          include: [
            {
              model: db.products,
              attributes: [],
            },
          ],
        });
        if (data.primary_master == "shipment_master") attributes.push([db.sequelize.col("shipment_container_details.product.item_name"), "container_details_item"]);
        else if (data.primary_master == "product_master") attributes.push([db.sequelize.col("shipment_po_details.shipment.shipment_container_details.product.item_name"), "container_details_item"]);
        else attributes.push([db.sequelize.col("shipments.shipment_container_details.product.item_name"), "container_details_item"]);
        break;
      case "container_details_container_type":
        include.push({
          model: db.shipment_container_details,
          attributes: [],
          duplicating: false,
          include: [
            {
              model: db.container_types,
              attributes: [],
            },
          ],
        });
        if (data.primary_master == "shipment_master") attributes.push([db.sequelize.col("shipment_container_details.container_type.type_name"), "container_details_container_type"]);
        else if (data.primary_master == "product_master")
          attributes.push([db.sequelize.col("shipment_po_details.shipment.shipment_container_details.container_type.type_name"), "container_details_container_type"]);
        else attributes.push([db.sequelize.col("shipments.shipment_container_details.container_type.type_name"), "container_details_container_type"]);
        break;
      case "container_details_qty":
        include.push({
          model: db.shipment_container_details,
          attributes: [],
          duplicating: false,
        });
        if (data.primary_master == "shipment_master") attributes.push([db.sequelize.col("shipment_container_details.qty"), "container_details_qty"]);
        else if (data.primary_master == "product_master") attributes.push([db.sequelize.col("shipment_po_details.shipment.shipment_container_details.qty"), "container_details_qty"]);
        else attributes.push([db.sequelize.col("shipments.shipment_container_details.qty"), "container_details_qty"]);
        break;

      default:
        if (data.primary_master == "shipment_master") attributes.push(col);
        else if (data.primary_master == "product_master") attributes.push(`shipment_po_details.shipment.${col}`);
        else attributes.push(`shipments.${col}`);
        break;
    }
  }
  return { include, attributes };
};

exports.productMaster = (data) => {
  const include = [],
    attributes = [];
  if (!data.report_columns.product_master) return { include, attributes };
  for (const col of data.report_columns.product_master) {
    switch (col) {
      case "supplier":
        include.push({
          model: db.product_supplier_map,
          attributes: [],
          include: [
            {
              model: db.suppliers,
              attributes: [],
            },
          ],
        });
        if (data.primary_master == "product_master") attributes.push([db.sequelize.col("product_supplier_maps.supplier.supplier_name"), "supplier"]);
        else if (data.primary_master == "shipment_master") attributes.push([db.sequelize.col("shipment_po_detail.product.product_supplier_maps.supplier.supplier_name"), "supplier"]);
        else if (data.second_master == "shipment_master") attributes.push([db.sequelize.col("shipments.shipment_po_detail.product.product_supplier_maps.supplier.supplier_name"), "supplier"]);
        else if (data.primary_master == "supplier_master") attributes.push([db.sequelize.col("product_supplier_maps.product.product_supplier_maps.product.supplier.supplier_name"), "supplier"]);
        else attributes.push([db.sequelize.col("product.product_supplier_maps.supplier.supplier_name"), "supplier"]);
        break;
      case "category":
        include.push({
          model: db.product_category_map,
          attributes: [],
          include: [
            {
              model: db.product_category,
              attributes: [],
            },
          ],
        });
        if (data.primary_master == "product_master") attributes.push([db.sequelize.col("product_category_maps.product_category.category_name"), "category"]);
        else if (data.primary_master == "shipment_master") attributes.push([db.sequelize.col("shipment_po_detail.product.product_category_maps.product_category.category_name"), "category"]);
        else if (data.second_master == "shipment_master") attributes.push([db.sequelize.col("shipments.shipment_po_details.product.product_category_maps.product_category.category_name"), "category"]);
        else if (data.primary_master == "supplier_master") attributes.push([db.sequelize.col("product_supplier_maps.product.product_category_maps.product_category.category_name"), "category"]);
        else attributes.push([db.sequelize.col("product.product_category_maps.product_category.category_name"), "category"]);
        break;
      case "country":
        include.push({
          model: db.countries,
          attributes: [],
        });
        if (data.primary_master == "product_master") attributes.push([db.sequelize.col("country.name"), "country"]);
        else if (data.primary_master == "shipment_master") attributes.push([db.sequelize.col("shipment_po_detail.product.country.name"), "country"]);
        else if (data.second_master == "shipment_master") attributes.push([db.sequelize.col("shipments.shipment_po_details.product.country.name"), "country"]);
        else if (data.primary_master == "supplier_master") attributes.push([db.sequelize.col("product_supplier_maps.product.country.name"), "country"]);
        else attributes.push([db.sequelize.col("product.country.name"), "country"]);
        break;
      case "currency":
        include.push({
          model: db.currencies,
          as: "currency",
          attributes: [],
        });
        if (data.primary_master == "product_master") attributes.push([db.sequelize.col("currency.name"), "currency"]);
        else if (data.primary_master == "shipment_master") attributes.push([db.sequelize.col("shipment_po_detail.product.currency.name"), "currency"]);
        else if (data.second_master == "shipment_master") attributes.push([db.sequelize.col("shipments.shipment_po_details.product.currency.name"), "currency"]);
        else if (data.primary_master == "supplier_master") attributes.push([db.sequelize.col("product_supplier_maps.product.currency.name"), "currency"]);
        else attributes.push([db.sequelize.col("product.currency.name"), "currency"]);
        break;
      case "loading_port":
        include.push({
          model: db.loading_port,
          attributes: [],
        });
        if (data.primary_master == "product_master") attributes.push([db.sequelize.col("loading_port.port_name"), "loading_port"]);
        else if (data.primary_master == "shipment_master") attributes.push([db.sequelize.col("shipment_po_detail.product.loading_port.port_name"), "loading_port"]);
        else if (data.second_master == "shipment_master") attributes.push([db.sequelize.col("shipments.shipment_po_details.product.loading_port.port_name"), "loading_port"]);
        else if (data.primary_master == "supplier_master") attributes.push([db.sequelize.col("product_supplier_maps.product.loading_port.port_name"), "loading_port"]);
        else attributes.push([db.sequelize.col("product.loading_port.port_name"), "loading_port"]);
        break;
      case "container_type":
        include.push({
          model: db.container_types,
          attributes: [],
        });
        if (data.primary_master == "product_master") attributes.push([db.sequelize.col("container_type.type_name"), "container_type"]);
        else if (data.primary_master == "shipment_master") attributes.push([db.sequelize.col("shipment_po_detail.product.container_type.type_name"), "container_type"]);
        else if (data.second_master == "shipment_master") attributes.push([db.sequelize.col("shipments.shipment_po_details.product.container_type.type_name"), "container_type"]);
        else if (data.primary_master == "supplier_master") attributes.push([db.sequelize.col("product_supplier_maps.product.container_type.type_name"), "container_type"]);
        else attributes.push([db.sequelize.col("product.container_type.type_name"), "container_type"]);
        break;

      default:
        if (data.primary_master == "product_master") attributes.push(col);
        else if (data.primary_master == "shipment_master") attributes.push(db.sequelize.col(`shipment_po_detail.product.${col}`));
        else if (data.second_master == "shipment_master") attributes.push(db.sequelize.col(`shipments.shipment_po_details.product.${col}`));
        else if (data.primary_master == "supplier_master") attributes.push(db.sequelize.col(`product_supplier_maps.product.${col}`));
        else attributes.push(db.sequelize.col(`product.${col}`));
        break;
    }
  }
  return { include, attributes };
};

exports.supplierMaster = (data) => {
  const include = [],
    attributes = [];
  if (!data.report_columns.supplier_master) return { include, attributes };
  for (const col of data.report_columns.supplier_master) {
    switch (col) {
      case "country":
        include.push({
          model: db.countries,
          attributes: [],
        });
        if (data.primary_master == "supplier_master") attributes.push([db.sequelize.col("country.name"), "country"]);
        else if (data.second_master == "shipment_master") attributes.push([db.sequelize.col("shipment.supplier.country.name"), "country"]);
        else attributes.push([db.sequelize.col("supplier.country.name"), "country"]);
        break;
      case "payment_term":
        include.push({
          model: db.payment_terms,
          attributes: [],
        });
        if (data.primary_master == "supplier_master")
          attributes.push([
            db.sequelize.fn(
              "CONCAT",
              db.sequelize.col("payment_term.advance_percentage"),
              "% ",
              db.sequelize.col("payment_term.advance_text"),
              " - ",
              db.sequelize.col("payment_term.pending_percentage"),
              "% ",
              db.sequelize.col("payment_term.pending_text")
            ),
            "payment_term",
          ]);
        else if (data.second_master == "shipment_master")
          attributes.push([
            db.sequelize.fn(
              "CONCAT",
              db.sequelize.col("shipment.supplier.payment_term.advance_percentage"),
              "% ",
              db.sequelize.col("shipment.supplier.payment_term.advance_text"),
              " - ",
              db.sequelize.col("shipment.supplier.payment_term.pending_percentage"),
              "% ",
              db.sequelize.col("shipment.supplier.payment_term.pending_text")
            ),
            "payment_term",
          ]);
        else
          attributes.push([
            db.sequelize.fn(
              "CONCAT",
              db.sequelize.col("supplier.payment_term.advance_percentage"),
              "% ",
              db.sequelize.col("supplier.payment_term.advance_text"),
              " - ",
              db.sequelize.col("supplier.payment_term.pending_percentage"),
              "% ",
              db.sequelize.col("supplier.payment_term.pending_text")
            ),
            "payment_term",
          ]);
        break;

      default:
        if (data.primary_master == "supplier_master") attributes.push(col);
        else if (data.second_master == "shipment_master") attributes.push(db.sequelize.col(`shipment.supplier.${col}`));
        else attributes.push(db.sequelize.col(`supplier.${col}`));
        break;
    }
  }
  return { include, attributes };
};

exports.customerMaster = (data) => {
  const include = [],
    attributes = [];
  if (!data.report_columns.customer_master) return { include, attributes };
  for (const col of data.report_columns.customer_master) {
    switch (col) {
      case "country":
        include.push({
          model: db.countries,
          attributes: [],
        });
        if (data.primary_master == "customer_master") attributes.push([db.sequelize.col("country.name"), "country"]);
        else if (data.primary_master == "product_master") attributes.push([db.sequelize.col("shipment_po_details.shipment.customer.country.name"), "country"]);
        else if (data.second_master == "shipment_master") attributes.push([db.sequelize.col("shipments.customer.country.name"), "country"]);
        else attributes.push([db.sequelize.col("customer.country.name"), "country"]);
        break;
      default:
        if (data.primary_master == "customer_master") attributes.push(col);
        else if (data.primary_master == "product_master") attributes.push(db.sequelize.col(`shipment_po_details.shipment.customer.${col}`));
        else if (data.second_master == "shipment_master") attributes.push(db.sequelize.col(`shipments.customer.${col}`));
        else attributes.push(db.sequelize.col(`customer.${col}`));
        break;
    }
  }
  return { include, attributes };
};
