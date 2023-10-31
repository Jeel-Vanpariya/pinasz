const report_blueprints = require("../controllers/report_blueprints.controller");
module.exports = (app) => {
  // Get Report Blueprints
  app.post("/api/get-report-blueprints", report_blueprints.getReportBlueprints);

  // Save Report Blueprint
  app.post("/api/save-report-blueprint", report_blueprints.saveReportBlueprint);

  // Delete Report Blueprint
  app.post("/api/delete-report-blueprint", report_blueprints.deleteReportBlueprint);

  // Get Report Blueprint for edit
  app.post("/api/get-report-blueprint-for-edit", report_blueprints.getBlueprintForEdit);

   // Get Report Data
   app.post("/api/get-report-data", report_blueprints.getReportData);
};
