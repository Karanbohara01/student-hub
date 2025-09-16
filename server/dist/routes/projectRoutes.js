"use strict";

var express = require('express');
var router = express.Router();
var _require = require('../controllers/projectController.js'),
  createProject = _require.createProject,
  getProjects = _require.getProjects,
  getProjectById = _require.getProjectById,
  updateProject = _require.updateProject,
  deleteProject = _require.deleteProject,
  downloadProjectFile = _require.downloadProjectFile;
var _require2 = require('../middleware/authMiddleware.js'),
  protect = _require2.protect;
var upload = require('../middleware/uploadMiddleware.js');

// Route for /api/projects
router.route('/').post(protect,
// Use upload.fields() to specify multiple file inputs
upload.fields([{
  name: 'projectFile',
  maxCount: 1
}, {
  name: 'screenshots',
  maxCount: 5
}]), createProject).get(getProjects);

// Route for /api/projects/:id
router.route('/:id').get(getProjectById).put(protect, updateProject)["delete"](protect, deleteProject);
router.route('/:id/download').get(protect, downloadProjectFile);
module.exports = router;