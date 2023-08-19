const report = require("../controllers/report.controller");
module.exports = (app) => {
  // Get Masters
  app.post("/api/get-masters", report.getMasters);
};
