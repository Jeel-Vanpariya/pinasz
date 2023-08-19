const suppliers = require("../controllers/suppliers.controller");
module.exports = (app) => {
  // Save Supplier
  app.post("/api/save-supplier", suppliers.saveSupplier);

  // Get Supplier for edit
  app.post("/api/get-supplier-for-edit", suppliers.getSupplierForEdit);

  // Get Suppliers
  app.post("/api/get-all-suppliers", suppliers.getAllSuppliers);

  // Get Suppliers
  app.post("/api/get-suppliers", suppliers.getSuppliers);

  // Delete Supplier
  app.post("/api/delete-supplier", suppliers.deleteSupplier);
};
