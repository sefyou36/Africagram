const User = require('../controllers/UserController'); // Supposons que vous avez un modèle User pour gérer les utilisateurs
const Post = require('../controllers/PostController'); // Supposons que vous avez un modèle Post pour gérer les publications

class StatisticsController {
  // Méthode pour récupérer les statistiques de l'application
  async getAppStatistics(req, res) {
    try {
      // Récupérer les statistiques de l'application à partir de la base de données
      const totalUsers = await User.countDocuments();
      const totalPosts = await Post.countDocuments();
      const averagePostsPerUser = totalPosts / totalUsers;

      // Renvoyer les statistiques de l'application comme réponse
      res.status(200).json({
        totalUsers,
        totalPosts,
        averagePostsPerUser
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques de l'application :", error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
}

module.exports = new StatisticsController();
