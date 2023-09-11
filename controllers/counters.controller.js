const { Op } = require("sequelize");
const db = require("../sequelize/models/index.js");

exports.generateSupplierCounter = async (req, res) => {
  try {
    const response = await db.suppliers.findAll({
      attributes: ["s_no"],
      order: [["s_no", "ASC"]],
    });
    let i = 0;
    for (; 1; i++) {
      if (!response.map((item) => item.s_no).includes(`S${i.toString().padStart(6, "0")}`)) break;
    }
    res.send({ status: "success", data: `S${i.toString().padStart(6, "0")}` });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.checkSupplierCounter = async ({ body: data }, res) => {
  try {
    const options = {
      attributes: ["s_no"],
      where: { s_no: data.s_no },
    };
    if (data.id) {
      options.where.id = { [Op.ne]: data.id };
    }
    const response = await db.suppliers.findOne(options);
    res.send({ status: "success", data: response });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.generateCustomerCounter = async (req, res) => {
  try {
    const response = await db.customers.findAll({
      attributes: ["s_no"],
      order: [["s_no", "ASC"]],
    });
    let i = 0;
    for (; 1; i++) {
      if (!response.map((item) => item.s_no).includes(`B${i.toString().padStart(6, "0")}`)) break;
    }
    res.send({ status: "success", data: `B${i.toString().padStart(6, "0")}` });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.checkCustomerCounter = async ({ body: data }, res) => {
  try {
    const options = {
      attributes: ["s_no"],
      where: { s_no: data.s_no },
    };
    if (data.id) {
      options.where.id = { [Op.ne]: data.id };
    }
    const response = await db.customers.findOne(options);
    res.send({ status: "success", data: response });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.generateProductCounter = async (req, res) => {
  try {
    const response = await db.products.findAll({
      attributes: ["item_no"],
      order: [["item_no", "ASC"]],
    });
    let i = 0;
    for (; 1; i++) {
      if (!response.map((item) => item.item_no).includes(`A${i.toString().padStart(6, "0")}`)) break;
    }
    res.send({ status: "success", data: `A${i.toString().padStart(6, "0")}` });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.checkProductCounter = async ({ body: data }, res) => {
  try {
    const options = {
      attributes: ["item_no"],
      where: { item_no: data.item_no },
    };
    if (data.id) {
      options.where.id = { [Op.ne]: data.id };
    }
    const response = await db.products.findOne(options);
    res.send({ status: "success", data: response });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.generateShipmentCounter = async ({ body: data }, res) => {
  try {
    const response = await db.shipments.findAll({
      attributes: ["po_no"],
      order: [["po_no", "ASC"]],
    });
    let i = 0;
    for (; 1; i++) {
      if (!response.map((item) => item.po_no).includes(`${data.str}${i.toString().padStart(6, "0")}`)) break;
    }
    res.send({ status: "success", data: `${data.str}${i.toString().padStart(6, "0")}` });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.checkShipmentCounter = async ({ body: data }, res) => {
  try {
    const options = {
      attributes: ["po_no"],
      where: { po_no: data.po_no },
    };
    if (data.id) {
      options.where.id = { [Op.ne]: data.id };
    }
    const response = await db.shipments.findOne(options);
    res.send({ status: "success", data: response });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};