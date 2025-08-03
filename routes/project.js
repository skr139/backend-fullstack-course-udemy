"use strict";

//Express me sirve para crear las rutas
var express = require("express");

var ProjectControllers = require("../controllers/project.js");

var router = express.Router();
router.get("/home", ProjectControllers.home);

router.post("/test", ProjectControllers.test);

router.post("/save-project", ProjectControllers.saveProject);

module.exports = router;
