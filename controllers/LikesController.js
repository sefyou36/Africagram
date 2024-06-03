const Post = require('../controllers/PostController'); // Supposons que vous avez un modèle Post pour gérer les publications

class LikesController {
  // Méthode pour aimer une publication
  async likePost(req, res) {
    try {
      // Récupérer l'ID de la publication à aimer à partir de la requête
      const { postId } = req.params;

      // Vérifier si la publication à aimer existe dans la base de données
      const post = await Post.findById(postId);
      if (!post) {
        throw new NotFoundError("La publication à aimer n'a pas été trouvée.");
      }

      // Ajouter la logique pour aimer la publication dans la base de données
      // Par exemple, vous pouvez ajouter l'ID de l'utilisateur actuel à la liste des utilisateurs qui ont aimé la publication
      post.likes.push(req.user._id);
      await post.save();

      // Renvoyer une réponse réussie
      res.status(200).json({ message: `Vous avez aimé la publication avec l'ID ${postId}.` });
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'aimé à la publication :", error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
}

module.exports = new LikesController();
