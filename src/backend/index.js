const { request } = require("express");
const express = require("express");
const cors = require("cors");
const port = 8001;
const app = express();
const { databaseRouter } = require("./routers");

app.use(cors());
app.use(express.json());

app.use("/part", databaseRouter);

app.listen(port, () => {
  console.log("SERVER RUNNING IN PORT" + port);
});
