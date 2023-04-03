const { request } = require("express");
const express = require("express");
const cors = require("cors");
const port = 8001;
const app = express();
const { databaseRouter } = require("./routers");
const { body, validationResult } = require("express-validator");

app.use(cors());
app.use(express.json());

app.post(
  "/validation",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    return res.status(200).send(req.body);
  }
);

app.use("/part", databaseRouter);

app.listen(port, () => {
  console.log("SERVER RUNNING IN PORT" + port);
});
