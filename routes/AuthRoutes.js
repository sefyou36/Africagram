const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route POST pour l'inscription
router.post('/register', AuthController.register);

// Route POST pour la connexion
router.post('/login', AuthController.login);
router.get('/protected', authMiddleware, (req, res) => {
    res.send('This is a protected route');
  });
  
module.exports = router;
