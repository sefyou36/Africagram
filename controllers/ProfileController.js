const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { BadRequestError } = require('../errors/errors');

class ProfileController {
  async createProfile(req, res) {
    try {
      const { sexe, pays, ville } = req.body;

      if (!sexe || !pays || !ville) {
        throw new BadRequestError("Tous les champs sont requis pour la création d'un profil.");
      }

      // Récupérer l'ID de l'utilisateur à partir des données de la requête ou de la session
      const utilisateurId = req.user.userId; // Assurez-vous d'avoir l'ID de l'utilisateur correctement défini

      const newProfile = await prisma.profile.create({
        data: {
          sexe,
          pays,
          ville,
          // Fournir l'ID de l'utilisateur lors de la création du profil
          utilisateur: { connect: { id: utilisateurId } }
        }
      });

      res.status(200).json(newProfile);
    } catch (error) {
      console.error("Erreur lors de la création d'un nouveau profil d'utilisateur :", error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }



  async getUserProfile(req, res) {
    try {
      const userId = req.user.userId; // Récupérer l'ID de l'utilisateur à partir des données de la requête ou de la session

// Rechercher le profil de l'utilisateur en fonction de son ID
const userProfile = await prisma.profile.findUnique({
  where: {
    id_utilisateur: userId // Utiliser l'ID de l'utilisateur pour trouver le profil correspondant
  }
});

    
  
      if (!userProfile) {
        throw new Error("Le profil de l'utilisateur n'a pas été trouvé.");
      }
  
      res.status(200).json(userProfile);
    } catch (error) {
      console.error("Erreur lors de la récupération du profil de l'utilisateur :", error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
  

  async updateProfile(req, res) {
    try {
      const userId = req.user.userId; // Récupérer l'ID de l'utilisateur à partir des données de la requête ou de la session
      const { sexe, pays, ville } = req.body;
    
      const updatedProfile = await prisma.profile.update({
        where: {
          id_utilisateur: userId // Utiliser l'ID de l'utilisateur pour trouver son profil à mettre à jour
        },
        data: {
          sexe: "Male",
          pays: "Maroc",
          ville: "CAsa"
        }
      });
    
      // Traitement à effectuer après la mise à jour du profil
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil de l'utilisateur :", error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
    
  }
}

module.exports = new ProfileController();
