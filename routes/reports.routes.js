const reports = require("../controllers/reports.controller");
module.exports = (app) => {
  // Save Report Data
  app.post("/api/save-report-data", reports.saveReportData);

  // Get Reports
  app.post("/api/get-reports", reports.getReports);

  // Delete Report
  app.post("/api/delete-report", reports.deleteReport);

  // Send Mail
  app.post("/api/send-mail", reports.sendMail);
};
