const container_type = require("../controllers/container_type.controller");
module.exports = (app) => {
  // Save Container Type
  app.post("/api/save-container-type", container_type.saveContainerType);

  // Get Container Type
  app.post("/api/get-container-type", container_type.getContainerType);

  // Delete Container Type
  app.post("/api/delete-container-type", container_type.deleteContainerType);
};
