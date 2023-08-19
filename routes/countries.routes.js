const countries = require("../controllers/countries.controller");
module.exports = (app) => {
  // Get Countries
  app.post("/api/get-countries", countries.getCountries);
};
