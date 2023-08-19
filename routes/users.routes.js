const users = require("../controllers/users.controller");
module.exports = (app) => {
  // Save User
  app.post("/api/save-user", users.saveUser);

  // Get Users
  app.post("/api/get-users", users.getUsers);

  // User Login
  app.post("/api/user-login", users.userLogin);

  // User Check
  app.post("/api/user-check", users.checkUser);

  // Delete User
  app.post("/api/delete-users", users.deleteUser);
};
