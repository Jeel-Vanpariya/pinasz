const product_category = require("../controllers/product_category.controller");
module.exports = (app) => {
  // Save Product Category
  app.post("/api/save-product-category", product_category.saveProductCategory);

  // GET Product Category
  app.post("/api/get-product-category", product_category.getProductCategory);

  // Delete Product Category
  app.post("/api/delete-product-category", product_category.deleteProductCategory);
};
