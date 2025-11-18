"use strict";

//Express me sirve para crear las rutas
var express = require("express");

var ProjectControllers = require("../controllers/project.js");

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({
    uploadDir: './uploads'
});

router.get("/home", ProjectControllers.home);

router.post("/test", ProjectControllers.test);

router.post("/save-project", ProjectControllers.saveProject);

router.get("/get-by-id/:id", ProjectControllers.getProject);

router.get("/get-all", ProjectControllers.getProjects);

router.put("/update/:id", ProjectControllers.update);

router.delete("/delete/:id", ProjectControllers.deleteProject);

router.post("/upload-image/:id", multipartMiddleware, ProjectControllers.uploadImage);

router.get("/get-image/:image", ProjectControllers.getImageFile);

module.exports = router;
