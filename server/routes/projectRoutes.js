const express = require('express');
const router = express.Router();
const {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
    downloadProjectFile,
} = require('../controllers/projectController.js');
const { protect } = require('../middleware/authMiddleware.js');
const upload = require('../middleware/uploadMiddleware.js');

// Route for /api/projects
router
    .route('/')
    .post(
        protect,
        // Use upload.fields() to specify multiple file inputs
        upload.fields([
            { name: 'projectFile', maxCount: 1 },
            { name: 'screenshots', maxCount: 5 }
        ]),
        createProject
    )
    .get(getProjects);

// Route for /api/projects/:id
router.route('/:id')
    .get(getProjectById)
    .put(protect, updateProject)
    .delete(protect, deleteProject);
router.route('/:id/download').get(protect, downloadProjectFile);


module.exports = router;