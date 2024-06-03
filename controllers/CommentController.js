const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CommentController {
  async createComment(req, res) {
    try {
      const { postId, content } = req.body;

      const newComment = await prisma.comment.create({
        data: {
          content,
          postId: parseInt(postId),
        },
      });

      res.status(201).json(newComment);
    } catch (error) {
      console.error("Erreur lors de la création du commentaire :", error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  async getPostComments(req, res) {
    try {
      const { postId } = req.params;

      const comments = await prisma.comment.findMany({
        where: {
          postId: parseInt(postId),
        },
      });

      res.status(200).json(comments);
    } catch (error) {
      console.error("Erreur lors de la récupération des commentaires du post :", error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  async updateComment(req, res) {
    try {
      const { id } = req.params;
      const { content } = req.body;

      const updatedComment = await prisma.comment.update({
        where: {
          id: parseInt(id),
        },
        data: {
          content,
        },
      });

      res.status(200).json(updatedComment);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du commentaire :", error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  async deleteComment(req, res) {
    try {
      const { id } = req.params;

      await prisma.comment.delete({
        where: {
          id: parseInt(id),
        },
      });

      res.status(200).json({ message: "Commentaire supprimé avec succès." });
    } catch (error) {
      console.error("Erreur lors de la suppression du commentaire :", error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
}

module.exports = new CommentController();
