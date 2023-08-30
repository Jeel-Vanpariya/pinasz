const mode_of_transport = require("../controllers/mode_of_transport.controller");
module.exports = (app) => {
  // Get Mode of Transport
  app.post("/api/get-mode-of-transport", mode_of_transport.getModeOfTransport);
};
