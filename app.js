"use strict";

var expres = require("express");
var bodyParser = require("body-parser");

var app = expres();

// cargar arhivos de rutas (Este metodo es usando el archivo /routes/project.js)
var projectRoutes = require("./routes/project");

// Midleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS

// rutas
// Esta es la forma de usar rutas con controlador
app.use("/api", projectRoutes);

/* ******************** Este metodo es cuando no se tiene conotrlador y se hace dirextamente aqui
app.get("/test", (req, res) => {
  res.status(200).send({
    message: "Hola mundo desde mi API de NodeJs",
  });
});

app.get("/", (req, res) => {
  res
    .status(200)
    .send("<h1>Esta es mi pagina de inicio con html desde NodeJs</h1>");
});

app.post("/post-test/:id", (req, res) => {
  console.log(req.body);
  console.log(req.params.id);
  console.log(req.query);
  res.status(200).send({});
});************* fin ****************************************** */

// exportar modulo
module.exports = app;
