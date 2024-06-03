const express = require('express');
const router = express.Router();
const StatisticsController = require('../controllers/StatisticsController');

// Route pour récupérer les statistiques de l'application
router.get('/statistics', StatisticsController.getAppStatistics);

module.exports = router;
