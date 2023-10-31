const db = require("../sequelize/models/index.js");
const { shipmentMaster, masterManagement } = require("./masters.controller.js");

exports.saveReportBlueprint = async ({ body: data }, res) => {
  try {
    data.report_columns = JSON.stringify(data.report_columns);
    const response = await db.report_blueprints.bulkCreate([data], { updateOnDuplicate: ["name", "primary_master", "second_master", "third_master", "forth_master", "report_columns"] });
    res.send({ status: "success", data: response });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.getBlueprintForEdit = async ({ body: data }, res) => {
  try {
    const response = await db.report_blueprints.findOne({ where: { id: data.id } });
    res.send({ status: "success", data: response });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.getReportBlueprints = async (req, res) => {
  try {
    const response = await db.report_blueprints.findAll();
    res.send({ status: "success", data: response });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.deleteReportBlueprint = async ({ body: data }, res) => {
  try {
    const response = await db.report_blueprints.destroy({ where: { id: data.id } });
    res.send({ status: "success", data: response });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.getReportData = async ({ body: data }, res) => {
  try {
    let response = await db.report_blueprints.findOne({ where: { id: data.id } });
    if (response.primary_master) response =await masterManagement(response);
    res.send({ status: "success", data: response });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};


