const roles = require("../controllers/roles.controller");
module.exports = (app) => {
  // Get Roles
  app.post("/api/get-roles", roles.getRoles);

  // Save Role
  app.post("/api/save-role", roles.saveRole);

  // Get Role for Edit
  app.post("/api/get-role-for-edit", roles.getRoleForEdit);

  // Delete Roles
  app.post("/api/delete-role", roles.deleteRole);
};
