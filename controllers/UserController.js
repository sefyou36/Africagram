const User = require('../controllers/FollowerController'); // Supposons que vous avez un modèle User pour gérer les utilisateurs

class UserController {
  // Méthode pour inscrire un nouvel utilisateur
  async registerUser(req, res) {
    try {
      // Récupérer les données de l'utilisateur à partir de la requête
      const { firstname, lastname, email, password } = req.body;

      // Vérifier si l'utilisateur existe déjà dans la base de données
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("Cet utilisateur existe déjà.");
      }

      // Créer un nouvel utilisateur dans la base de données
      const newUser = await User.create({ firstname, lastname, email, password });

      // Renvoyer le nouvel utilisateur créé comme réponse
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Erreur lors de l'inscription d'un nouvel utilisateur :", error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  // Méthode pour connecter un utilisateur existant
  async loginUser(req, res) {
    try {
      // Récupérer les informations de connexion de l'utilisateur à partir de la requête
      const { email, password } = req.body;

      // Vérifier si l'utilisateur existe dans la base de données et si le mot de passe est correct
      const user = await User.findOne({ email });
      if (!user || !user.comparePassword(password)) {
        throw new Error("Identifiants invalides. Veuillez réessayer.");
      }

      // Générer le token JWT pour l'utilisateur
      const token = user.generateAuthToken();

      // Renvoyer le token JWT comme réponse
      res.status(200).json({ token });
    } catch (error) {
      console.error("Erreur lors de la connexion de l'utilisateur :", error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
}

module.exports = new UserController();
