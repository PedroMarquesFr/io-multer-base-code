const express = require("express");
const multer = require("multer");
const path = require('path');

const app = express();

app.use('/images', express.static(path.join(__dirname, 'uploads')));

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
app.post("/uploads", upload.array("arquivoNomeFoda",3), (req, res) => {
  console.log(req.body, req.files);
  res.send(req.files);
});

module.exports = app;
