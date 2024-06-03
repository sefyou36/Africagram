const express = require('express');
const router = express.Router();
const FollowerController = require('../controllers/FollowerController');

// Route pour suivre un utilisateur
router.post('/follow/:userId', FollowerController.followUser);

// Route pour se désabonner d'un utilisateur
router.delete('/unfollow/:userId', FollowerController.unfollowUser);

module.exports = router;
