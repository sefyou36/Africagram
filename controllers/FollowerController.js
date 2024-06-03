const { NotFoundError } = require('../errors');
const User = require('../controllers/UserController'); // Supposons que vous avez un modèle User pour gérer les utilisateurs

class FollowerController {
  // Méthode pour suivre un utilisateur
  async followUser(req, res) {
    try {
      // Récupérer l'ID de l'utilisateur à suivre à partir de la requête
      const { userId } = req.params;

      // Vérifier si l'utilisateur à suivre existe dans la base de données
      const userToFollow = await User.findById(userId);
      if (!userToFollow) {
        throw new NotFoundError("L'utilisateur à suivre n'a pas été trouvé.");
      }

      // Ajouter la logique pour suivre l'utilisateur dans la base de données
      // Par exemple, vous pouvez ajouter l'ID de l'utilisateur à suivre à la liste des abonnés de l'utilisateur actuel
      req.user.following.push(userId);
      await req.user.save();

      // Renvoyer une réponse réussie
      res.status(200).json({ message: `Vous suivez désormais l'utilisateur avec l'ID ${userId}.` });
    } catch (error) {
      console.error("Erreur lors du suivi de l'utilisateur :", error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  // Méthode pour se désabonner d'un utilisateur
  async unfollowUser(req, res) {
    try {
      // Récupérer l'ID de l'utilisateur à se désabonner à partir de la requête
      const { userId } = req.params;

      // Vérifier si l'utilisateur à se désabonner existe dans la base de données
      const userToUnfollow = await User.findById(userId);
      if (!userToUnfollow) {
        throw new NotFoundError("L'utilisateur à se désabonner n'a pas été trouvé.");
      }

      // Ajouter la logique pour se désabonner de l'utilisateur dans la base de données
      // Par exemple, vous pouvez supprimer l'ID de l'utilisateur à se désabonner de la liste des abonnés de l'utilisateur actuel
      req.user.following = req.user.following.filter(id => id !== userId);
      await req.user.save();

      // Renvoyer une réponse réussie
      res.status(200).json({ message: `Vous vous êtes désabonné de l'utilisateur avec l'ID ${userId}.` });
    } catch (error) {
      console.error("Erreur lors du désabonnement de l'utilisateur :", error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
}

module.exports = new FollowerController();
