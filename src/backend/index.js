const fetch = require("isomorphic-fetch");
const { request } = require("express");
const express = require("express");
const cors = require("cors");
const port = 8002;
const app = express();
const { databaseRouter } = require("./routers");
const { body, validationResult } = require("express-validator");
const { log } = require("console");
const { db, query } = require("./database");
const upload = require("./middleware/multer");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

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

app.get("/plc", async (req, res) => {
  try {
    const response = await fetch("http://10.126.15.134/awp/data/data.js");
    const data = await response.text();
    res.send(data);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.post("/upload", upload.single("file"), async (req, res) => {
  const { file } = req;
  const filepath = file ? "/" + file.filename : null;
  let data = JSON.parse(req.body.data);

  res.status(200).send({ filepath });

  let fetchQuerry = `UPDATE parammachine_saka.users SET imagePath = ${db.escape(
    filepath
  )} WHERE id_users = ${db.escape(data.id)}`;

  db.query(fetchQuerry, (err, result) => {
    if (err) {
      // return response.status(200).send({
      //   isSucess: true,
      //   message: "File not suport,(don't use spacing in name of file) ",
      // });
    } else {
      //return response.status(200).send({ isSucess: true, message: "Succes update data" });
    }
  });
});

app.use("/part", databaseRouter);

app.listen(port, () => {
  console.log("SERVER RUNNING IN PORT" + port);
});
