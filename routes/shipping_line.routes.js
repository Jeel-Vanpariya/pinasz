const shipping_line = require("../controllers/shipping_line.controller");
module.exports = (app) => {
  // Get Shipping Line
  app.post("/api/get-shipping-line", shipping_line.getShippingLine);
};
