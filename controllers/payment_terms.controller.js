const db = require("../sequelize/models/index.js");

exports.savePaymentTerm = async ({ body: data }, res) => {
  try {
    await db.payment_terms.bulkCreate([data], { updateOnDuplicate: ["advance_percentage", "pending_percentage"] });
    res.send({ status: "success", message: "Payment term saved successfully" });
  } catch (error) {
    res.status(200).send({ status: "error", message: error });
  }
};

exports.getPaymentTerm = async (req, res) => {
  try {
    const response = await db.payment_terms.findAll();
    res.send({ status: "success", data: response });
  } catch (error) {
    res.status(200).send({ status: "error", message: error });
  }
};

exports.deletePaymentTerm = async ({ body: data }, res) => {
  try {
    const response = await db.payment_terms.destroy({ where: { id: data.id } });
    res.send({ status: "success", data: response });
  } catch (error) {
    res.status(200).send({ status: "error", message: error });
  }
};
