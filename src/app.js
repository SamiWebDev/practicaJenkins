const express = require("express");

const app = express();
app.use(express.json());

// Ruta básica
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World! From Sami Mimun! CICD 4" });
});

// Ruta de ejemplo para pruebas
app.post("/echo", (req, res) => {
  const { body } = req;
  res.status(200).json(body);
});

module.exports = app;
