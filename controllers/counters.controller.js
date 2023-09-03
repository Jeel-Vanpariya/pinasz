const db = require("../sequelize/models/index.js");

exports.generateSupplierCounter = async (req, res) => {
  try {
    const response = await db.counters.findOne({ where: { master_name: 'supplier' } });
    res.send({ status: "success", data: response });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};
