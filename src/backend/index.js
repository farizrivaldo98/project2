const { request } = require("express");
const express = require("express");
const cors = require("cors");
const port = 8001;
const app = express();
const { databaseRouter } = require("./routers");
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const path = require("path");
const { log } = require("console");
const { db, query } = require("./database");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    console.log(file.originalname);
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

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
  console.log(req.file);
  const { file } = req;
  const filepath = file ? "/" + file.filename : null;
  let data = JSON.parse(req.body.data);

  res.status(200).send({ filepath });
  console.log(data.id);
  let response = await query(
    `UPDATE users SET imagePath = ${db.escape(
      filepath
    )} WHERE id_users = ${db.escape(data.id)}`
  );
  console.log(response);
  res.status(200).send({ filepath });
});

app.use("/part", databaseRouter);

app.listen(port, () => {
  console.log("SERVER RUNNING IN PORT" + port);
});
