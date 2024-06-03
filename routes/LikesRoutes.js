const express = require('express');
const router = express.Router();
const LikesController = require('../controllers/LikesController');

// Route pour liker une publication
router.post('/likes/:postId', LikesController.likePost);

module.exports = router;
