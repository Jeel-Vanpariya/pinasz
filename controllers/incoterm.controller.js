const db = require("../sequelize/models/index.js");

exports.getIncoterm = async (req, res) => {
  try {
    const response = await db.incoterm.findAll();
    res.send({ status: "success", data: response });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};
