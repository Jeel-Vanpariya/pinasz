const invoicing_parties = require("../controllers/invoicing_parties.controller");
module.exports = (app) => {
  // Save Invoicing Party
  app.post("/api/save-invoicing-party", invoicing_parties.saveInvoicingParty);

  // Get Invoicing Party
  app.post("/api/get-invoicing-party", invoicing_parties.getInvoicingParty);

  // Delete Invoicing Party
  app.post("/api/delete-invoicing-party", invoicing_parties.deleteInvoicingParty);
};
