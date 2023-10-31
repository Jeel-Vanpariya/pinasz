const db = require("../sequelize/models/index.js");
const papa = require("papaparse");
const fs = require("fs");
const dayjs = require("dayjs");
const handlebars = require("handlebars");
const nodemailer = require("nodemailer");
const { mailConfiguration } = require("../config.js");

exports.saveReportData = async ({ body: data }, res) => {
  try {
    const reportData = [],
      response = await db.report_blueprints.findOne({ where: { id: data.id } }),
      path = `uploads/reports/${response.name}-${dayjs().format("DD-MM-YYYY h:mm:ss A")}.csv`;
    for (const object of data.data) {
      const obj = {};
      for (const key in object) {
        const col = data.columns.filter((item) => item.field == key)[0];
        obj[col.header] = object[key];
      }
      reportData.push(obj);
    }
    const csvData = papa.unparse(reportData, { skipEmptyLines: true, columns: data.columns.map((item) => item.header) });
    fs.writeFile(path, csvData, "utf-8", async (err) => {
      if (err) res.send({ status: "error", message: err });
      else {
        await db.reports.create({ report_blueprint_id: data.id, path: path });
        res.send({ status: "success", message: "Report created successfully" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.getReports = async (req, res) => {
  try {
    const response = await db.reports.findAll({
      attributes: { include: ["report_blueprint.name"] },
      raw: true,
      include: [
        {
          model: db.report_blueprints,
          attributes: [],
        },
      ],
    });
    res.send({ status: "success", data: response });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.deleteReport = async ({ body: data }, res) => {
  try {
    const response = await db.reports.destroy({ where: { id: data.id } });
    res.send({ status: "success", data: response });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.sendMail = async ({ body: data }, res) => {
  try {
    const transporter = nodemailer.createTransport(mailConfiguration);
    const readHTMLFile = function (path, callback) {
      fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
        if (err) throw err;
        else callback(null, html);
      });
    };
    readHTMLFile(`${__dirname}/../templates/report.html`, function (err, html) {
      const mailOptions = {
        from: "info@pinasz.com",
        to: [...data.emails, ...data.user_emails].join(","),
        subject: "Report",
        html: html,
        attachments: [{ filename: data.path.split("/").pop(), path: `${__dirname}/../uploads${data.path.split('uploads').pop()}` }],
      };
      transporter.sendMail(mailOptions, async function (error) {
        console.log(error);
        if (error) res.send({ status: "error", data: error });
        transporter.close();
        res.send({ status: "success", data: "Mail sent successfully" });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};
