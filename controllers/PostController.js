const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');
const path = require('path');

// Configurer le stockage de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // dossier de destination
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // nom de fichier unique
  }
});

const upload = multer({ storage: storage });

class PostController {
  // Middleware pour gérer le téléchargement de l'image
  uploadImage = upload.single('image');

  // Créer un nouveau post
  async createPost(req, res) {
    try {
      // Assurez-vous que l'utilisateur est authentifié
      if (!req.user || !req.user.userId) {
        return res.status(401).json({ message: 'Utilisateur non authentifié' });
      }
  
      const utilisateurId = req.user.userId; // Récupérer l'ID de l'utilisateur à partir des données de la requête ou de la session
      const { caption, imageUrl } = req.body; // Récupérer les données du post à partir de la requête
  
      // Créer le post dans la base de données
      const newPost = await prisma.post.create({
        data: {
          utilisateur_id: utilisateurId, // Utiliser l'ID de l'utilisateur directement
          caption: caption,
          image_url: imageUrl,
          total_likes: 0,
          date_creation: new Date(),
          date_modification: new Date()
        }
      });
  
      // Répondre avec le nouveau post créé
      res.status(201).json(newPost);
    } catch (error) {
      console.error("Erreur lors de la création du post :", error);
      res.status(500).json({ message: 'Erreur lors de la création du post' });
    }
  }
  
  async getUserPosts(req, res) {
    try {
      const utilisateurId = req.user && req.user.userId; // Vérifier si req.user est défini avant d'accéder à userId
  
      if (!req.user || !req.user.userId) {
        return res.status(401).json({ message: 'Utilisateur non authentifié' });
      }
  
      const userPosts = await prisma.post.findMany({
        where: {
          utilisateur_id: utilisateurId,
        },
      });
  
      res.status(200).json(userPosts);
    } catch (error) {
      console.error("Erreur lors de la récupération des posts de l'utilisateur :", error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
  
  // Mettre à jour un post
  async updatePost(req, res) {
    try {
      const { id } = req.params;
      const { caption, imageUrl } = req.body;

      const updatedPost = await prisma.post.update({
        where: {
          id: parseInt(id),
        },
        data: {
          caption,
          image_url: imageUrl,
          date_modification: new Date()
        },
      });

      res.status(200).json(updatedPost);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du post :", error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  // Supprimer un post
  async deletePost(req, res) {
    try {
      const { id } = req.params;

      await prisma.post.delete({
        where: {
          id: parseInt(id),
        },
      });

      res.status(200).json({ message: "Post supprimé avec succès." });
    } catch (error) {
      console.error("Erreur lors de la suppression du post :", error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  // Récupérer les posts avec pagination
  async getPaginatedPosts(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;

      const posts = await prisma.post.findMany({
        skip: (page - 1) * limit,
        take: parseInt(limit),
      });

      res.status(200).json(posts);
    } catch (error) {
      console.error("Erreur lors de la récupération des posts paginés :", error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
}

module.exports = new PostController();
