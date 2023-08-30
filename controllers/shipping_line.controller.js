const db = require("../sequelize/models/index.js");

exports.getShippingLine = async (req, res) => {
  try {
    const response = await db.shipping_line.findAll();
    res.send({ status: "success", data: response });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};
