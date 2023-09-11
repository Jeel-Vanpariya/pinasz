const counters = require("../controllers/counters.controller");
module.exports = (app) => {
  // Generate Supplier Counter
  app.post("/api/generate-supplier-counter", counters.generateSupplierCounter);

  // Check Supplier Counter
  app.post("/api/check-supplier-counter", counters.checkSupplierCounter);

  // Generate Customer Counter
  app.post("/api/generate-customer-counter", counters.generateCustomerCounter);

  // Check Customer Counter
  app.post("/api/check-customer-counter", counters.checkCustomerCounter);

  // Generate Product Counter
  app.post("/api/generate-product-counter", counters.generateProductCounter);

  // Check Product Counter
  app.post("/api/check-product-counter", counters.checkProductCounter);

  // Generate Shipment Counter
  app.post("/api/generate-shipment-counter", counters.generateShipmentCounter);

  // Check Shipment Counter
  app.post("/api/check-shipment-counter", counters.checkShipmentCounter);
};
