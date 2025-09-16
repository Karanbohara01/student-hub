"use strict";

var express = require('express');
var router = express.Router();
var _require = require('../controllers/dataController.js'),
  getUniversities = _require.getUniversities,
  getFaculties = _require.getFaculties,
  getPrograms = _require.getPrograms,
  getSemesters = _require.getSemesters,
  getSubjects = _require.getSubjects;
router.get('/universities', getUniversities);
router.get('/faculties', getFaculties);
router.get('/programs', getPrograms);
router.get('/semesters', getSemesters);
router.get('/subjects', getSubjects);
module.exports = router;