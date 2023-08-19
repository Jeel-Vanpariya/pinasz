const db = require("../sequelize/models/index.js");

exports.getMasters = async (req, res) => {
  try {
    const product_category = db.product_category.rawAttributes;

    res.send({ status: "success", data: product_category });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};
