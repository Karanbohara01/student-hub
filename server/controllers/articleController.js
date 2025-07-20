const Article = require('../models/Article.js');

// @desc    Create a new article
// @route   POST /api/articles
// @access  Private/Admin
const createArticle = async (req, res) => {
    try {
        const {
            title,
            content,
            articleType,
            university,
            faculty,
            sourceUrl,
        } = req.body;

        const article = new Article({
            postedBy: req.user._id, // from protect middleware
            title,
            content,
            articleType,
            university,
            faculty,
            sourceUrl,
        });

        const createdArticle = await article.save();
        res.status(201).json(createdArticle);
    } catch (error) {
        res.status(400).json({ message: 'Error creating article', error: error.message });
    }
};

// @desc    Get all articles with filtering
// @route   GET /api/articles
// @access  Public
const getArticles = async (req, res) => {
    try {
        const filter = {};
        if (req.query.university) {
            filter.university = req.query.university;
        }
        if (req.query.articleType) {
            filter.articleType = req.query.articleType;
        }

        const articles = await Article.find(filter).sort({ createdAt: -1 });
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get a single article by ID
// @route   GET /api/articles/:id
// @access  Public
const getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (article) {
            res.status(200).json(article);
        } else {
            res.status(404).json({ message: 'Article not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


module.exports = {
    createArticle,
    getArticles,
    getArticleById,
};