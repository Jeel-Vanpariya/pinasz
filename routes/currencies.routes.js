const currencies = require("../controllers/currencies.controller");
module.exports = (app) => {
  // Get Currencies
  app.post("/api/get-currencies", currencies.getCurrencies);
};
