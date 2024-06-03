const express = require('express');
const router = express.Router();
const NewsFeedController = require('../controllers/NewsFeedController');

// Route pour récupérer le fil d'actualité des publications les plus récentes
router.get('/newsfeed', NewsFeedController.getRecentPosts);

module.exports = router;
