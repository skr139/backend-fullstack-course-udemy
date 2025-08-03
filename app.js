"use strict";

var expres = require("express");
var bodyParser = require("body-parser");

var app = expres();

// cargar arhivos de rutas

// Midleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS

// rutas
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
});

// exportar modulo
module.exports = app;
