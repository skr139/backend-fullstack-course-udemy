"use strinct";

var mongoose = require("mongoose");
var schema = mongoose.schema;

var ProjectShema = schema({
  name: String,
  description: String,
  year: Number,
  category: String,
  langs: [String, String, String],
});

module.exports = mongoose.model("Project", ProjectShema);
// Exportar el modelo para usarlo en otros archivos
