const db = require("../sequelize/models/index.js");

exports.saveContainerType = async ({ body: data }, res) => {
  try {
    await db.container_types.bulkCreate([data], { updateOnDuplicate: ["type_name"] });
    res.send({ status: "success", message: "Container type saved successfully" });
  } catch (error) {
    res.status(200).send({ status: "error", message: error });
  }
};

exports.getContainerType = async (req, res) => {
  try {
    const response = await db.container_types.findAll();
    res.send({ status: "success", data: response });
  } catch (error) {
    res.status(200).send({ status: "error", message: error });
  }
};

exports.deleteContainerType = async ({ body: data }, res) => {
  try {
    const response = await db.container_types.destroy({ where: { id: data.id } });
    res.send({ status: "success", data: response });
  } catch (error) {
    res.status(200).send({ status: "error", message: error });
  }
};
