const express = require("express");
const cors = require("cors");
const history = require("connect-history-api-fallback");
const bodyParser = require("body-parser");
const fs = require("fs");

require("dotenv").config();
const app = express();

//Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.enable("trust proxy");
app.use(history());
app.use(express.static("view/dist"));

app.get("/", (req, res) => {
  res.sendFile("view/dist/index.html");
});

// parse requests of content-type: application/json
app.use(bodyParser.json({ limit: "250mb" }));

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: "250mb", extended: true }));
app.use(cors());

fs.readdirSync("./routes").forEach((file) => {
  if (file.includes(".js")) {
    require(`./routes/${file}`)(app);
  }
});
// set port, listen for requests
app.listen(process.env.PORT || 4000, () => {});
