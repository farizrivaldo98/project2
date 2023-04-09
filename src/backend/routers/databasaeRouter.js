const express = require("express");
const databaseControllers = require("../controllers/databaseControllers");

const routers = express.Router();
const { veryfyToken, checkRole } = require("../middleware/auth");

routers.get("/get", databaseControllers.getData);
routers.post("/add", databaseControllers.addData);
routers.patch("/edit/:id", databaseControllers.editData);
routers.delete("/delet/:id", databaseControllers.deletData);
routers.get("/pareto", databaseControllers.fetchDataPareto);
routers.get("/line1", databaseControllers.fetchDataLine1);
routers.get("/line2", databaseControllers.fetchDataLine2);
routers.get("/line3", databaseControllers.fetchDataLine3);
routers.get("/line4", databaseControllers.fetchDataLine4);

routers.post("/register", databaseControllers.register);
routers.post("/login", databaseControllers.login);
routers.get("/user", veryfyToken, checkRole, databaseControllers.fetchAlluser);
routers.post("/check-Login", veryfyToken, databaseControllers.checkLogin);

routers.get("/instrument", databaseControllers.fetchDataInstrument);
routers.post("/hardness", databaseControllers.fetchDataHardness);
routers.post("/thickness", databaseControllers.fetchDataTickness);
routers.post("/diameter", databaseControllers.fetchDataDiameter);

module.exports = routers;
