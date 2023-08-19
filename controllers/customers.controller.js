const { Op } = require("sequelize");
const db = require("../sequelize/models/index.js");

exports.saveCustomer = async ({ body: data }, res) => {
  try {
    if (typeof data.id == "string") {
      delete data.id;
      response = await db.customers.create(data);
    } else {
      response = await db.customers.update(data, { where: { id: data.id } });
    }
    res.send({ status: "success", data: response });
  } catch (error) {
    res.status(200).send({ status: "error", message: error });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const response = await db.customers.findAll({
      attributes: {
        include: [[db.sequelize.col("country.name"), "country"]],
      },
      raw: true,
      include: [
        {
          model: db.countries,
          attributes: [],
        },
      ],
    });
    res.send({ status: "success", data: response });
  } catch (error) {
    res.status(200).send({ status: "error", message: error });
  }
};

exports.getCustomerForEdit = async ({ body: data }, res) => {
  try {
    const response = await db.customers.findOne({ where: { id: data.id } });
    res.send({ status: "success", data: response });
  } catch (error) {
    res.status(200).send({ status: "error", message: error });
  }
};

exports.saveCustomerFromCSV = async ({ body: data }, res) => {
  try {
    const response = await db.customers.bulkCreate(data);
    res.send({ status: "success", data: response });
  } catch (error) {
    res.status(200).send({ status: "error", message: error });
  }
};

exports.deleteCustomer = async ({ body: data }, res) => {
  try {
    const response = await db.customers.destroy({ where: { id: data.id } });
    res.send({ status: "success", data: response });
  } catch (error) {
    res.status(200).send({ status: "error", message: error });
  }
};

exports.getBuyers = async ({ body: data }, res) => {
  try {
    const response = await db.customers.findAll({ attributes: ["id", "buyer_name"] });
    res.send({ status: "success", data: response });
  } catch (error) {
    res.status(200).send({ status: "error", message: error });
  }
};

exports.getCustomers = async ({ body: data }, res) => {
  try {
    const response = await db.customers.findAll({ attributes: ["id", "group_name"] });
    res.send({ status: "success", data: response });
  } catch (error) {
    res.status(200).send({ status: "error", message: error });
  }
};
