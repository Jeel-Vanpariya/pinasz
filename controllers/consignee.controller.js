const db = require("../sequelize/models/index.js");

exports.saveConsignee = async ({ body: data }, res) => {
  try {
    await db.consignees.bulkCreate([data], { updateOnDuplicate: ["consignee_name"] });
    res.send({ status: "success", message: "Destination port saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.getConsignee = async (req, res) => {
  try {
    const response = await db.consignees.findAll();
    res.send({ status: "success", data: response });
  } catch (error) {
    res.status(200).send({ status: "error", message: error });
  }
};

exports.deleteConsignee = async ({ body: data }, res) => {
  try {
    const response = await db.consignees.destroy({ where: { id: data.id } });
    res.send({ status: "success", data: response });
  } catch (error) {
    res.status(200).send({ status: "error", message: error });
  }
};
