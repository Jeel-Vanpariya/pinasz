const shipments = require("../controllers/shipments.controller");
module.exports = (app) => {
  // Save Shipment
  app.post("/api/save-shipment", shipments.saveShipment);

  // Get Shipments
  app.post("/api/get-shipments", shipments.getShipments);

  // Get Shipment Details
  app.post("/api/get-shipment-details", shipments.getShipmentDetails);

  // Get Shipment for edit
  app.post("/api/get-shipment-for-edit", shipments.getShipmentForEdit);

  // Delete Shipment
  app.post("/api/delete-shipment", shipments.deleteShipment);

  // Delete Attachments
  app.post("/api/delete-attachments", shipments.deleteAttachments);
};
