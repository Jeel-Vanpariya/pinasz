const db = require("../sequelize/models/index.js");

exports.saveShipment = async ({ body: data }, res) => {
  try {
    let response;
    delete data.data.id;
    data.data.cust_po_no = JSON.stringify(data.data.cust_po_no);
    if (typeof data.id == "string") {
      response = await db.shipments.create(data.data);
      data.id = response.id;
    } else {
      response = await db.shipments.update(data.data, { where: { id: data.id } });
    }
    let insert_data = [];
    for (const object of data.po_details) {
      insert_data.push({
        shipment_id: data.id,
        supplier_id: object.supplier_id,
        item_id: object.item_id,
        qty: object.qty,
        price: object.price,
      });
    }
    await db.shipment_po_details.destroy({ where: { shipment_id: data.id } });
    await db.shipment_container_details.destroy({ where: { shipment_id: data.id } });
    await db.shipment_po_details.bulkCreate(insert_data);
    if (data.container_details.length > 0) {
      insert_data = [];
      for (const object of data.container_details) {
        insert_data.push({
          shipment_id: data.id,
          item_id: object.item_id,
          qty: object.qty,
          container_no: object.container_no,
          container_type_id: object.container_type_id,
        });
      }
      await db.shipment_container_details.bulkCreate(insert_data);
    }
    res.send({ status: "success", data: response });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.getShipments = async ({ body: data }, res) => {
  try {
    const response = await db.shipments.findAll({
      attributes: {
        include: [
          "payment_term.advance_percentage",
          "payment_term.pending_percentage",
          [db.sequelize.col("buyer.buyer_name"), "buyer"],
          [db.sequelize.col("customer.group_name"), "customer"],
          [db.sequelize.col("supplier.supplier_name"), "supplier"],
          [db.sequelize.col("loading_port.port_name"), "loading_port"],
          [db.sequelize.col("destination_port.port_name"), "destination_port"],
          [db.sequelize.col("final_destination.destination_name"), "final_destination"],
          [db.sequelize.col("invoice_party.party_name"), "invoicing_party"],
          [db.sequelize.col("consignee.consignee_name"), "consignee"],
          [db.sequelize.col("shipping_line.name"), "shipping_line"],
          [db.sequelize.col("incoterm.name"), "incoterm"],
          [db.sequelize.col("mode_of_transport.name"), "mode_of_transport"],
        ],
      },
      raw: true,
      include: [
        {
          model: db.suppliers,
          attributes: [],
        },
        {
          model: db.customers,
          attributes: [],
        },
        {
          model: db.customers,
          as: "buyer",
          attributes: [],
        },
        {
          model: db.payment_terms,
          attributes: [],
        },
        {
          model: db.invoice_parties,
          attributes: [],
        },
        {
          model: db.loading_port,
          attributes: [],
        },
        {
          model: db.destination_port,
          attributes: [],
        },
        {
          model: db.final_destinations,
          attributes: [],
        },
        {
          model: db.consignees,
          attributes: [],
        },
        {
          model: db.shipping_line,
          attributes: [],
        },
        {
          model: db.incoterm,
          attributes: [],
        },
        {
          model: db.mode_of_transport,
          attributes: [],
        },
      ],
    });
    res.send({ status: "success", data: response });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.getShipmentDetails = async ({ body: data }, res) => {
  try {
    const shipment_po_details = await db.shipment_po_details.findAll({
      attributes: { include: ["supplier.supplier_name", "product.item_name", "product.uom"], exclude: ["supplier_id", "item_id", "shipment_id"] },
      where: { shipment_id: data.id },
      raw: true,
      include: [
        {
          model: db.suppliers,
          attributes: [],
        },
        {
          model: db.products,
          attributes: [],
        },
      ],
    });
    const shipment_container_details = await db.shipment_container_details.findAll({
      attributes: { include: ["container_type.type_name", "product.item_name", "product.uom"], exclude: ["container_type_id", "item_id", "shipment_id"] },
      where: { shipment_id: data.id },
      raw: true,
      include: [
        {
          model: db.container_types,
          attributes: [],
        },
        {
          model: db.products,
          attributes: [],
        },
      ],
    });
    res.send({ status: "success", data: { po_details: shipment_po_details, container_details: shipment_container_details } });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.getShipmentForEdit = async ({ body: data }, res) => {
  try {
    const response = await db.shipments.findOne({ where: { id: data.id } });
    const shipment_details = await db.shipment_po_details.findAll({ where: { shipment_id: data.id } });
    const container_details = await db.shipment_container_details.findAll({ where: { shipment_id: data.id } });
    res.send({ status: "success", data: response, po_details: shipment_details, container_details: container_details });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.deleteShipment = async ({ body: data }, res) => {
  try {
    const response = await db.shipments.destroy({ where: { id: data.id } });
    res.send({ status: "success", data: response });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};
