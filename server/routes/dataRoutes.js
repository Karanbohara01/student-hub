const express = require('express');
const router = express.Router();
const {
  getUniversities,
  getFaculties,
  getPrograms,
  getSemesters,
  getSubjects
} = require('../controllers/dataController.js');

router.get('/universities', getUniversities);
router.get('/faculties', getFaculties);
router.get('/programs', getPrograms);
router.get('/semesters', getSemesters);
router.get('/subjects', getSubjects);

module.exports = router;