const db = require("../sequelize/models/index.js");

exports.saveFinalDestination = async ({ body: data }, res) => {
  try {
    await db.final_destinations.bulkCreate([data], { updateOnDuplicate: ["destination_name"] });
    res.send({ status: "success", message: "Final destination saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.getFinalDestination = async (req, res) => {
  try {
    const response = await db.final_destinations.findAll();
    res.send({ status: "success", data: response });
  } catch (error) {
    res.status(200).send({ status: "error", message: error });
  }
};

exports.deleteFinalDestination = async ({ body: data }, res) => {
  try {
    const response = await db.final_destinations.destroy({ where: { id: data.id } });
    res.send({ status: "success", data: response });
  } catch (error) {
    res.status(200).send({ status: "error", message: error });
  }
};
