const Post = require('../controllers/PostController'); // Supposons que vous avez un modèle Post pour gérer les publications

class NewsFeedController {
  // Méthode pour récupérer le fil d'actualité des publications les plus récentes
  async getRecentPosts(req, res) {
    try {
      // Récupérer les publications les plus récentes à partir de la base de données
      const recentPosts = await Post.find().sort({ createdAt: -1 }).limit(5); // Supposons que vous voulez limiter à 5 publications

      // Renvoyer les publications les plus récentes comme réponse
      res.status(200).json(recentPosts);
    } catch (error) {
      console.error("Erreur lors de la récupération du fil d'actualité des publications les plus récentes :", error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
}

module.exports = new NewsFeedController();
