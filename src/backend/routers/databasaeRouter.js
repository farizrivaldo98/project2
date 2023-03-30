const express = require("express");
const databaseControllers = require("../controllers/databaseControllers");

const routers = express.Router();
const { veryfyToken, checkRole } = require("../middleware/auth");

routers.get("/get", databaseControllers.getData);
routers.post("/add", databaseControllers.addData);
routers.patch("/edit/:id", databaseControllers.editData);
routers.delete("/delet/:id", databaseControllers.deletData);
routers.get("/pareto", databaseControllers.fetchDataPareto);

routers.post("/register", databaseControllers.register);
routers.post("/login", databaseControllers.login);
routers.get("/user", veryfyToken, checkRole, databaseControllers.fetchAlluser);

module.exports = routers;
