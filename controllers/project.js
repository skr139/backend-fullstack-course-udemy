"use strict";
var Project = require("../models/project");
var controller = {
  home: function (req, res) {
    return res.status(200).send({
      message: "Este es el metodo home",
    });
  },
  test: function (req, res) {
    return res.status(200).send({
      message: "Este es el metodo o acción test",
    });
  },

  saveProject: async function (req, res) {
    try {
      var project = new Project();
      var params = req.body;
      project.name = params.name;
      project.description = params.description;
      project.year = params.year;
      project.category = params.category;
      project.langs = params.langs;
      project.image = null;

      // Save project to database
      var projectStored = await project.save();
      if (!projectStored)
        return res.status(404).send({
          message: "No se ha podido guardar el proyecto",
        });
      return res.status(200).send({
        message: "Succesfully saved project",
        project: projectStored,
      });
    } catch (err) {
      return res.status(500).send({
        message: "Error al guardar el proyecto",
        error: err.message,
      });
    }
  },
};
module.exports = controller;
