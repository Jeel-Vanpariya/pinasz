const payment_terms = require("../controllers/payment_terms.controller");
module.exports = (app) => {
  // Save Payment Term
  app.post("/api/save-payment-term", payment_terms.savePaymentTerm);

  // Get Payment Term
  app.post("/api/get-payment-term", payment_terms.getPaymentTerm);

  // Delete Payment Term
  app.post("/api/delete-payment-term", payment_terms.deletePaymentTerm);
};
