const db = require("../sequelize/models/index.js");

exports.saveLoadingPort = async ({ body: data }, res) => {
  try {
    await db.loading_port.bulkCreate([data], { updateOnDuplicate: ["port_name"] });
    res.send({ status: "success", message: "Loading port saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.getLoadingPort = async (req, res) => {
  try {
    const response = await db.loading_port.findAll();
    res.send({ status: "success", data: response });
  } catch (error) {
    res.status(200).send({ status: "error", message: error });
  }
};

exports.deleteLoadingPort = async ({ body: data }, res) => {
  try {
    const response = await db.loading_port.destroy({ where: { id: data.id } });
    res.send({ status: "success", data: response });
  } catch (error) {
    res.status(200).send({ status: "error", message: error });
  }
};
