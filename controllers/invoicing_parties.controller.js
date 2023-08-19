const db = require("../sequelize/models/index.js");

exports.saveInvoicingParty = async ({ body: data }, res) => {
  try {
    await db.invoice_parties.bulkCreate([data], { updateOnDuplicate: ["party_name"] });
    res.send({ status: "success", message: "Invoicing party saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.getInvoicingParty = async (req, res) => {
  try {
    const response = await db.invoice_parties.findAll();
    res.send({ status: "success", data: response });
  } catch (error) {
    res.status(200).send({ status: "error", message: error });
  }
};

exports.deleteInvoicingParty = async ({ body: data }, res) => {
  try {
    const response = await db.invoice_parties.destroy({ where: { id: data.id } });
    res.send({ status: "success", data: response });
  } catch (error) {
    res.status(200).send({ status: "error", message: error });
  }
};
