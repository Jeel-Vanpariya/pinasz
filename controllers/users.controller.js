const { Op } = require("sequelize");
const db = require("../sequelize/models/index.js");
const md5 = require("md5");
const handlebars = require("handlebars");
const nodemailer = require("nodemailer");
const fs = require("fs");
const { mailConfiguration } = require("../config.js");

exports.saveUser = async ({ body: data }, res) => {
  try {
    if (typeof data.id == "string") {
      let response = await db.users.findOne({
        where: { email: { [Op.eq]: data.email } },
      });
      if (!response) {
        const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let password = "";
        for (let i = 0; i < 12; i++) {
          let randomNumber = Math.floor(Math.random() * chars.length);
          password += chars.substring(randomNumber, randomNumber + 1);
        }
        response = await db.users.create({
          name: data.name,
          email: data.email,
          password: md5(password),
          status: data.status,
          role_id: data.role_id,
        });
        const transporter = nodemailer.createTransport(mailConfiguration);
        const readHTMLFile = function (path, callback) {
          fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
            if (err) throw err;
            else callback(null, html);
          });
        };
        readHTMLFile(`${__dirname}/../templates/user.html`, function (err, html) {
          const replacements = {
            username: data.email,
            password: password,
          };
          let template = handlebars.compile(html);
          let sendHtml = template(replacements);
          template = handlebars.compile(sendHtml);
          sendHtml = template(replacements);
          const mailOptions = {
            from: "info@pinasz.com",
            to: data.email,
            subject: "Login credentials",
            html: sendHtml,
          };
          transporter.sendMail(mailOptions, async function (error) {
            console.log(error);
            if (error) res.send({ status: "error", data: error });
            transporter.close();
            res.send({ status: "success", data: "User saved successfully" });
          });
        });
      } else res.send({ status: "success", message: "User already exists with same email id" });
    } else {
      response = await db.users.update(
        {
          name: data.name,
          email: data.email,
          status: data.status,
          role_id: data.role_id,
        },
        { where: { id: data.id } }
      );
      if (response) delete response.password;
      res.send({ status: "success", data: response });
    }
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const response = await db.users.findAll({
      attributes: ["id", "email", "name", "status", "role_id", [db.sequelize.col("role.name"), "role"]],
      raw: true,
      where: { id: { [Op.ne]: 1 } },
      include: [
        {
          model: db.roles,
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

exports.userLogin = async ({ body: data }, res) => {
  try {
    let response = await db.users.findOne({
      where: { email: data.email },
    });
    if (response) {
      response = await db.users.findOne({
        where: { email: data.email, password: md5(data.password) },
      });
      if (response) {
        if (response.dataValues.status) res.send({ status: "success", data: { id: response.dataValues.id } });
        else res.send({ status: "success", message: "Account is not active" });
      } else res.send({ status: "success", message: "Invalid password" });
    } else res.send({ status: "success", message: "Invalid email" });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.checkUser = async ({ body: data }, res) => {
  try {
    let response = await db.users.findOne({
      attributes: ["id", "status", "role.permissions"],
      where: { id: data.id },
      raw: true,
      include: [
        {
          model: db.roles,
          attributes: [],
        },
      ],
    });
    if (response) {
      if (response.status) res.send({ status: "success", data: response });
      else res.send({ status: "error", message: "Account is not active" });
    } else res.send({ status: "error", message: "User not found" });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.deleteUser = async ({ body: data }, res) => {
  try {
    const response = await db.users.destroy({ where: { id: data.id } });
    res.send({ status: "success", data: response });
  } catch (error) {
    res.status(200).send({ status: "error", message: error });
  }
};
