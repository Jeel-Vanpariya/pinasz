const customers = require("../controllers/customers.controller");
module.exports = (app) => {
  // Save Customer
  app.post("/api/save-customer", customers.saveCustomer);

  // Get Customers
  app.post("/api/get-all-customers", customers.getAllCustomers);

  // Get Customer for edit
  app.post("/api/get-customer-for-edit", customers.getCustomerForEdit);

  // Save Customers from csv
  app.post("/api/save-customers-from-csv", customers.saveCustomerFromCSV);

  // Delete Customer
  app.post("/api/delete-customer", customers.deleteCustomer);

  // Get Buyers
  app.post("/api/get-buyers", customers.getBuyers);

  // Get Customers
  app.post("/api/get-customers", customers.getCustomers);
};
