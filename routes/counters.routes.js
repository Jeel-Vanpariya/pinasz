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
};
