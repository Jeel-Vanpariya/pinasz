const db = require("../sequelize/models/index.js");

exports.getCurrencies = async (req, res) => {
  try {
    const response = await db.currencies.findAll();
    res.send({ status: "success", data: response });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};
