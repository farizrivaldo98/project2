const express = require("express");
const databaseControllers = require("../controllers/databaseControllers");

const routers = express.Router();
const { veryfyToken, checkRole } = require("../middleware/auth");

routers.get("/get", databaseControllers.getData);
routers.get("/fetch", databaseControllers.fetchEdit);
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
routers.get("/alluser", databaseControllers.fetchAlluser);
routers.post("/check-Login", veryfyToken, databaseControllers.checkLogin);
routers.patch("/userupdate/:id", databaseControllers.updateUsers);
routers.delete("/userdelete/:id", databaseControllers.deleteUseers);
routers.patch("/useredit/:id", databaseControllers.editUsers);

routers.get("/instrument", databaseControllers.fetchDataInstrument);
routers.post("/hardness", databaseControllers.fetchDataHardness);
routers.post("/thickness", databaseControllers.fetchDataTickness);
routers.post("/diameter", databaseControllers.fetchDataDiameter);

routers.get("/oee", databaseControllers.fetchOee);
routers.get("/variableoee", databaseControllers.fetchVariableOee);

routers.get("/emsN14", databaseControllers.fetchEMSn14);

routers.get("/ope", databaseControllers.fetchOPE);
routers.get("/avaline", databaseControllers.fetchAvaLine);
routers.get("/avamachine", databaseControllers.fetchAvaMachine);

routers.get("/lineData", databaseControllers.lineData);
routers.get("/procesData", databaseControllers.procesData);
routers.get("/machineData", databaseControllers.machineData);
routers.get("/locationData", databaseControllers.locationData);

routers.post("/reportmtc", databaseControllers.reportMTC);
routers.post("/reportprd", databaseControllers.reportPRD);
routers.get("/lastPRD", databaseControllers.lastUpdatePRD);
routers.get("/lastMTC", databaseControllers.lastUpdateMTC);

routers.get("/getpowerdata", databaseControllers.getPowerData);
routers.get("/getpowermonthly", databaseControllers.getPowerMonthly);
routers.get("/getPowerSec", databaseControllers.getPowerSec);
routers.get("/getRangeSet", databaseControllers.getRangeSet);
routers.get("/getavgpower", databaseControllers.getAvgPower);

routers.get("/getChillerData", databaseControllers.getChillerData);
routers.get("/getGraphChiller", databaseControllers.getGraphChiller);

routers.get("/getTabelEMS", databaseControllers.getTableEMS);
routers.get("/getTempChart", databaseControllers.getTempChart);
routers.get("/getAllDataEMS", databaseControllers.getAllDataEMS);

routers.get("/waterSystem", databaseControllers.waterSystem);
routers.get("/waterSankey", databaseControllers.waterSankey);
routers.get("/ExportWaterConsumptionDaily", databaseControllers.ExportWaterConsumptionDaily);
routers.get("/ExportWaterTotalizerDaily", databaseControllers.ExportWaterTotalizerDaily);

routers.get("/PowerDaily", databaseControllers.PowerDaily);
routers.get("/PowerMonthly", databaseControllers.PowerMonthly);
routers.get("/PowerSankey", databaseControllers.PowerSankey);

module.exports = routers;
