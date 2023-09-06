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