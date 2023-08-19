const final_destinations = require("../controllers/final_destinations.controller");
module.exports = (app) => {
  // Save Final Destination
  app.post("/api/save-final-destination", final_destinations.saveFinalDestination);

  // Get Final Destination
  app.post("/api/get-final-destination", final_destinations.getFinalDestination);

  // Delete Final Destination
  app.post("/api/delete-final-destination", final_destinations.deleteFinalDestination);
};
