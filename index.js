"use strict";

var mongoose = require("mongoose");
var app = require("./app");
var port = 3700;
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/portafolio")
  .then(() => {
    console.log("Conexión a mongo establecida con exito");

    // creación del servidor de NodeJs, luego de haber conectado con 
    // mongo DB
    app.listen(port, () => {
      console.log(
        "Servidor corriendo correctamente en la url localhost:" + port
      );
    });
  })
  .catch((err) => console.log("Error de conexión a mongo", err));
