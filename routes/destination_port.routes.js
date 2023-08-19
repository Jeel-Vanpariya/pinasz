const destination_port = require("../controllers/destination_port.controller");
module.exports = (app) => {
  // Save Destination Port
  app.post("/api/save-destination-port", destination_port.saveDestinationPort);

  // Get Destination Port
  app.post("/api/get-destination-port", destination_port.getDestinationPort);

  // Delete Destination Port
  app.post("/api/delete-destination-port", destination_port.deleteDestinationPort);
};
