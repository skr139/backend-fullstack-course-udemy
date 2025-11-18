"use strict";
const { send } = require("express/lib/response");
const project = require("../models/project");
// Importo el modelo de Project
var Project = require("../models/project");
var fs = require("fs");
var path = require("path");

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

  getProject: async function (req, res) {
    var projectId = req.params.id;

    if (projectId == null) return res.status(404).send({ message: 'Se necesita un id para buscar el documento' });

    try {
      const project = await Project.findById(projectId);
      if (project) {
        return res.status(200).send({
          project
        });
      } else {
        return res.status(400), send({ message: 'El documento no existe' });
      }
    } catch (err) {
      return res.status(500).send({ message: 'No se pudo obtener el documento' });
    }
  },

  getProjects: async function (req, res) {
    try {
      // puedes añadir filtros dentro de find para buscar por algun atributo especifico
      // Si no va anda, devuelve toda la colección
      // const projects = await Project.find({year: 2021});
      const projects = await Project.find();

      if (!projects) return res.status(400).send({ message: 'Se se obtubieron proyectos' });
      return res.status(200).send({
        projects
      });
    } catch (err) {
      return res.status(500).send({ message: 'No se pudieron obtener los datos' });
    }
  },

  update: async function (req, res) {
    // Primero buscar el documento
    const id = req.params.id;

    // Tomar los nuevos datos
    const update = req.body;

    // Actualizar con la función findByIdAndUpdate
    try {
      const project = await Project.findByIdAndUpdate(id, update, { new: true });
      if (!project) return res.status(404).send({ message: 'No se pudo actualizar el documento' });
      return res.status(200).send({ project });
    } catch (err) {
      if (!updated) return res.status(500).send({ message: 'Error al actualiza documento' });
    }

  },

  deleteProject: async function (req, res) {
    var projectId = req.params.id;

    try {
      var project = await Project.findByIdAndDelete(projectId);
      if (!project) return res.status(404).send({ message: 'Error al eliminar documento' });
      return res.status(200).send({ project });
    } catch (err) {
      return res.status(500).send({ message: 'El documento no pudo ser borrado ' + err });
    }
  },

  uploadImage: async function (req, res) {
    var projectId = req.params.id;
    var fileName = 'Imagen no subida';

    if (req.files) {
      var filepath = req.files.image.path;
      var fileSplit = filepath.split("\\");
      var fileName = fileSplit[1];
      var extSplit = fileName.split(".");
      var fileExt = extSplit[1];

      if (fileExt == "png" || "jpg" || "jpeg" || "gif") {
        try {
          var updated = await Project.findByIdAndUpdate(projectId, { image: fileName }, { new: true });
          if (!updated) return res.status(404).send({ message: "El proyecto no existe" });
          return res.status(200).send({
            updated
          });
        } catch (err) {
          return res.status(500).send({ message: "El archivo o imagen no pudo ser subida: " + err });
        }
      } else {
        fs.unlink(filepath, (err) => {
          return res.status(200).send({
            message: "La extensión del archivo no es válida"
          });
        });
      }
    } else {
      return res.status(200).send({
        message: fileName
      });
    }
  },

  getImageFile: function (req, res) {
    var file = req.params.image;
    var path_file = "./uploads/" + file;

    fs.exists(path_file, (exists) => {
      if (exists) {
        return res.sendFile(path.resolve(path_file));
      } else {
        return res.status(200).send({ message: "No existe la imagen" });
      }
    });
  }
};
module.exports = controller;
