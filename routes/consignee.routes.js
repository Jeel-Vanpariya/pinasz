const consignee = require("../controllers/consignee.controller");
module.exports = (app) => {
  // Save Consignee
  app.post("/api/save-consignee", consignee.saveConsignee);

  // Get Consignee
  app.post("/api/get-consignee", consignee.getConsignee);

  // Get Consignee for edit
  app.post("/api/get-consignee-for-edit", consignee.getConsigneeForEdit);

  // Delete Consignee
  app.post("/api/delete-consignee", consignee.deleteConsignee);
};
