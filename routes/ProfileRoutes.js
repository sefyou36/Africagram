const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/ProfileController');
const authMiddleware = require('../middlewares/authMiddleware')

// Route pour créer un nouveau profil d'utilisateur
router.post('/profile',authMiddleware, ProfileController.createProfile);

// Route pour récupérer le profil de l'utilisateur authentifié
router.get('/profile',authMiddleware, ProfileController.getUserProfile);

// Route pour mettre à jour le profil de l'utilisateur
router.put('/profile',authMiddleware, ProfileController.updateProfile);

module.exports = router;
