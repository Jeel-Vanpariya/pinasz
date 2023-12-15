const { Op } = require("sequelize");
const db = require("../sequelize/models/index.js");

exports.getRoles = async (req, res) => {
  try {
    const response = await db.roles.findAll({ where: { id: { [Op.ne]: 1 } } });
    res.send({ status: "success", data: response });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.saveRole = async ({ body: data }, res) => {
  try {
    const response = await db.roles.bulkCreate([data], { updateOnDuplicate: ["name", "permissions"] });
    res.send({ status: "success", data: response });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.getRoleForEdit = async ({ body: data }, res) => {
  try {
    const response = await db.roles.findOne({ where: { id: data.id } });
    res.send({ status: "success", data: response });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.deleteRole = async ({ body: data }, res) => {
  try {
    const response = await db.roles.destroy({ where: { id: data.id } });
    res.send({ status: "success", data: response });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};
