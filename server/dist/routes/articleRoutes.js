"use strict";

var express = require('express');
var router = express.Router();
var _require = require('../controllers/articleController.js'),
  createArticle = _require.createArticle,
  getArticles = _require.getArticles,
  getArticleById = _require.getArticleById;
var _require2 = require('../middleware/authMiddleware.js'),
  protect = _require2.protect;

//  /api/articles
router.route('/').post(protect, createArticle) // Only logged-in (admin) users can post
.get(getArticles); // Anyone can view articles

//  /api/articles/:id
router.route('/:id').get(getArticleById); // Anyone can view a single article

module.exports = router;