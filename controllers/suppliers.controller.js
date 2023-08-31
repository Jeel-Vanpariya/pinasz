const { Op } = require("sequelize");
const db = require("../sequelize/models/index.js");

exports.saveSupplier = async ({ body: data }, res) => {
  try {
    if (typeof data.id == "string") {
      delete data.id;
      response = await db.suppliers.create(data);
    } else {
      response = await db.suppliers.update(data, { where: { id: data.id } });
    }
    res.send({ status: "success", data: response });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.getAllSuppliers = async ({ body: data }, res) => {
  try {
    const response = await db.suppliers.findAll({
      attributes: {
        include: ["payment_term.advance_percentage", "payment_term.pending_percentage", [db.sequelize.col("country.name"), "country"]],
      },
      raw: true,
      include: [
        {
          model: db.payment_terms,
          attributes: [],
        },
        {
          model: db.countries,
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

exports.getSupplierForEdit = async ({ body: data }, res) => {
  try {
    const response = await db.suppliers.findOne({ where: { id: data.id } });
    res.send({ status: "success", data: response });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.deleteSupplier = async ({ body: data }, res) => {
  try {
    const response = await db.suppliers.destroy({ where: { id: data.id } });
    res.send({ status: "success", data: response });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.getSuppliers = async ({ body: data }, res) => {
  try {
    const response = await db.product_supplier_map.findAll({
      attributes: [
        "supplier.id",
        "supplier.supplier_name",
        [db.sequelize.col("product.id"), "product_id"],
        "product.item_name",
        "product.item_no",
        "product.uom"
      ],
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
    const sendData = [];
    let obj = {},
      tempID;
    if (response) {
      for (const object of response) {
        if (object.id == tempID) {
          if (obj.items.filter((item) => item.id == object.product_id).length == 0)
            obj.items.push({
              id: object.product_id,
              item_name: `${object.item_name} (${object.item_no})`,
              uom: object.uom,
            });
        } else {
          if (Object.keys(obj).length > 0) sendData.push(obj);
          tempID = object.id;
          obj = {
            id: object.id,
            supplier_name: object.supplier_name,
            items: [{
              id: object.product_id,
              item_name: `${object.item_name} (${object.item_no})`,
              uom: object.uom,
            }],
          };
        }
      }
      if (Object.keys(obj).length > 0) sendData.push(obj);
    }
    res.send({ status: "success", data: sendData });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};
