const express = require('express');
const router = express.Router();
const {
    createArticle,
    getArticles,
    getArticleById,
} = require('../controllers/articleController.js');
const { protect } = require('../middleware/authMiddleware.js');

//  /api/articles
router.route('/')
    .post(protect, createArticle) // Only logged-in (admin) users can post
    .get(getArticles);            // Anyone can view articles

//  /api/articles/:id
router.route('/:id').get(getArticleById); // Anyone can view a single article

module.exports = router;