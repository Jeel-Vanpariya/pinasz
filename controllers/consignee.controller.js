const db = require("../sequelize/models/index.js");

exports.saveConsignee = async ({ body: data }, res) => {
  try {
    if (typeof data.id == "string") {
      delete data.id;
      response = await db.consignees.create(data);
    } else {
      response = await db.consignees.update(data, { where: { id: data.id } });
    }
    res.send({ status: "success", data: response });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.getConsigneeForEdit = async ({ body: data }, res) => {
  try {
    const response = await db.consignees.findOne({ where: { id: data.id } });
    res.send({ status: "success", data: response });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.getConsignee = async (req, res) => {
  try {
    const response = await db.consignees.findAll({
      attributes: { include: [[db.sequelize.col("country.name"), "country_name"]] },
      raw: true,
      include: [
        {
          model: db.countries,
          attributes: [],
        },
      ],
    });
    res.send({ status: "success", data: response });
  } catch (error) {
    res.status(200).send({ status: "error", message: error });
  }
};

exports.deleteConsignee = async ({ body: data }, res) => {
  try {
    const response = await db.consignees.destroy({ where: { id: data.id } });
    res.send({ status: "success", data: response });
  } catch (error) {
    res.status(200).send({ status: "error", message: error });
  }
};
