const db = require("../sequelize/models/index.js");

exports.saveDestinationPort = async ({ body: data }, res) => {
  try {
    await db.destination_port.bulkCreate([data], { updateOnDuplicate: ["port_name"] });
    res.send({ status: "success", message: "Destination port saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.getDestinationPort = async (req, res) => {
  try {
    const response = await db.destination_port.findAll();
    res.send({ status: "success", data: response });
  } catch (error) {
    res.status(200).send({ status: "error", message: error });
  }
};

exports.deleteDestinationPort = async ({ body: data }, res) => {
  try {
    const response = await db.destination_port.destroy({ where: { id: data.id } });
    res.send({ status: "success", data: response });
  } catch (error) {
    res.status(200).send({ status: "error", message: error });
  }
};
