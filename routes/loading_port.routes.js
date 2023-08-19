const loading_port = require("../controllers/loading_port.controller");
module.exports = (app) => {
  // Save Loading Port
  app.post("/api/save-loading-port", loading_port.saveLoadingPort);

  // Get Loading Port
  app.post("/api/get-loading-port", loading_port.getLoadingPort);

  // Delete Loading Port
  app.post("/api/delete-loading-port", loading_port.deleteLoadingPort);
};
