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
      emailWiseData = {},
      response = await db.report_blueprints.findOne({ where: { id: data.id } }),
      name = `${response.name}-${dayjs().format("DD-MM-YYYY h:mm:ss A")}`,
      path = `uploads/reports/${response.name}`;
    for (const object of data.data) {
      const obj = {};
      for (const key in object) {
        const col = data.columns.filter((item) => item.field == key)[0];
        obj[col.header] = object[key];
      }
      if (object.email) {
        if (emailWiseData[object.email] == undefined) emailWiseData[object.email] = [obj];
        else emailWiseData[object.email].push(obj);
      }
      reportData.push(obj);
    }
    if (!fs.existsSync(`uploads/reports/${response.name}`)) fs.mkdirSync(`uploads/reports/${response.name}`);
    if (Object.keys(emailWiseData).length > 0) {
      for (const key in emailWiseData) {
        const csvData = papa.unparse(emailWiseData[key], { skipEmptyLines: true, columns: data.columns.map((item) => item.header) });
        fs.writeFile(`${path}/${name}-${key}.csv`, csvData, "utf-8", (err) => {
          console.log(err);
        });
      }
    }

    const csvData = papa.unparse(reportData, { skipEmptyLines: true, columns: data.columns.map((item) => item.header) });
    fs.writeFile(`${path}/${name}.csv`, csvData, "utf-8", async (err) => {
      if (err) res.send({ status: "error", message: err });
      else {
        await db.reports.create({ report_blueprint_id: data.id, path: `${path}/${name}.csv` });
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
    const transporter = nodemailer.createTransport(mailConfiguration),
      readHTMLFile = function (path, callback) {
        fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
          if (err) throw err;
          else callback(null, html);
        });
      };
    readHTMLFile(`${__dirname}/../templates/report.html`, function (err, html) {
      if (data.user_emails.length > 0) {
        const mailOptions = {
          from: "info@pinasz.com",
          to: data.user_emails.join(","),
          subject: "Report",
          html: html,
          attachments: [{ filename: data.path.split("/").pop(), path: `${__dirname}/../uploads${data.path.split("uploads").pop()}` }],
        };
        transporter.sendMail(mailOptions, async function (error) {
          if (error) console.log(error);
          if (data.emails.length == 0) res.send({ status: "success", data: "Mail sent successfully" });
        });
      }
      if (data.emails.length > 0) {
        for (let i = 0; i < data.emails.length; i++) {
          const mailOptions = {
            from: "info@pinasz.com",
            to: data.emails[i],
            subject: "Report",
            html: html,
            attachments: [{ filename: data.path.split("/").pop(), path: `${__dirname}/../uploads${data.path.split("uploads").pop().split(".csv")[0]}-${data.emails[i]}.csv` }],
          };
          transporter.sendMail(mailOptions, async function (error) {
            if (error) console.log(error);
            if (i + 1 == data.emails.length) {
              transporter.close();
              res.send({ status: "success", data: "Mail sent successfully" });
            }
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};
