const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const authMiddleware = require('../middlewares/authMiddleware');



router.post('/posts/', authMiddleware, PostController.uploadImage, (req, res) => PostController.createPost(req, res));
// Route pour récupérer les publications de l'utilisateur authentifié
router.get('/user/posts', authMiddleware, PostController.getUserPosts);

router.put('/posts/:id', PostController.updatePost);
router.delete('/posts/:id', PostController.deletePost);
// Route pour récupérer les publications avec pagination
router.get('/posts/paginated', PostController.getPaginatedPosts);




module.exports = router;
