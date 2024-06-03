const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');

// Route pour écrire un commentaire sur une publication
router.post('/comments/:postId', CommentController.createComment);

module.exports = router;
