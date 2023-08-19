const products = require("../controllers/products.controller");
module.exports = (app) => {
  // Get Product Categories
  app.post("/api/get-product-categories", products.getProductCategories);

  // Get Product Suppliers
  app.post("/api/get-product-suppliers", products.getProductSuppliers);

  // Save Products
  app.post("/api/save-product", products.saveProduct);

  // Save Product from CSV
  app.post("/api/save-products-from-csv", products.saveProductFromCSV);

  // Get Product for edit
  app.post("/api/get-product-for-edit", products.getProductForEdit);

  // Get Products
  app.post("/api/get-products", products.getProducts);

  // Delete Product
  app.post("/api/delete-product", products.deleteProduct);
};
