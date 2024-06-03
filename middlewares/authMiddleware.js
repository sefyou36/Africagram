const jwt = require('../utils/jwt'); // Importez votre utilitaire jwt.js
const UnauthenticatedError = require('../errors/unauthenticated');

const authMiddleware = (req, res, next) => {
  // Récupérer le jeton d'authentification du header de la requête
  const authHeader = req.headers.authorization;
  
  // Vérifier si le jeton d'authentification est présent
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Authentication token is missing.');
    throw new UnauthenticatedError('Authentication token is missing.');
  }

  // Extraire le jeton d'authentification de l'en-tête
  const token = authHeader.split(' ')[1];

  try {
    // Vérifier et décoder le jeton d'authentification en utilisant la clé secrète
    const decoded = jwt.verifyToken(token, process.env.JWT_SECRET); // Utilisez votre méthode pour charger la clé secrète

    // Ajouter l'utilisateur décodé à l'objet de requête
    req.user = decoded;

    // Passer au middleware suivant
    next();
  } catch (error) {
    console.log('Authentication token is invalid:', error.message);
    throw new UnauthenticatedError('Authentication token is invalid.');
  }
};

module.exports = authMiddleware;
