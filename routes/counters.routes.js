const counters = require("../controllers/counters.controller");
module.exports = (app) => {
    // Generate Supplier Counter
    app.post("/api/generate-supplier-counter", counters.generateSupplierCounter);
};
