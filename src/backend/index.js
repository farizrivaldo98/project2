const { request } = require("express");
const express = require("express");
const cors = require("cors");
const port = 8001;
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

app.post("/upload", upload.single("file"), async (req, res) => {
  const { file } = req;
  const filepath = file ? "/" + file.filename : null;
  let data = JSON.parse(req.body.data);

  res.status(200).send({ filepath });

  let response = await query(
    `UPDATE users SET imagePath = ${db.escape(
      filepath
    )} WHERE id_users = ${db.escape(data.id)}`
  );

  res.status(200).send({ filepath });
});

app.use("/part", databaseRouter);

app.listen(port, () => {
  console.log("SERVER RUNNING IN PORT" + port);
});
