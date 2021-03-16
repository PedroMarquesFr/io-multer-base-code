const express = require("express");
const multer = require("multer");

const app = express();

const storage = multer.diskStorage({
  destination: (res, file, callback) => {
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.get("/ping", (req, res) => res.send("pong!"));
// o nome do arquivo eh importante pra poder identificar de onde ele ta vindo
app.post("/uploads", upload.single("arquivoNomeFoda"), (req, res) => {
  console.log(req.body, req.file);
  res.send("ok!");
});

module.exports = app;
