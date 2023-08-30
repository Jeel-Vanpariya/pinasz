const incoterm = require("../controllers/incoterm.controller");
module.exports = (app) => {
  // Get Incoterm
  app.post("/api/get-incoterm", incoterm.getIncoterm);
};
