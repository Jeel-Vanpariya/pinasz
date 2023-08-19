"use strict";

const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const process = require("process");

const basename = path.basename(__filename);
const db = {};
const dateString = new Date().toString();
const timezone = dateString.substring(dateString.indexOf("+"), dateString.indexOf("+") + 5);

const sequelize = new Sequelize(process.env.DB, process.env.DBUSER, process.env.DBPASSWORD, {
  host: process.env.HOST,
  dialect: "mysql",
  operatorsAliases: 0,
  logging: false,
  freezeTableName: true,
  timezone: timezone.slice(0, 3) + ":" + timezone.slice(3),
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Sequelize Connected Successfully");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js" && file.indexOf(".test.js") === -1;
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.DataTypes = DataTypes;

//alway add force false. If you make it true then it will clear table data.
db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("table sync complete");
  })
  .catch((error) => {
    console.log("table sync Failed:", error);
  });

module.exports = db;
