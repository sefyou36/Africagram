const express = require("express");
const bodyParser = require('body-parser')
const dotenv = require("dotenv");
const app = express();
const path = require('path');
app.use(express.json());
// Middlewares pour parser le corps des requêtes JSON et URL-encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

const { generateToken } = require('./utils/jwt');

const user = { id: 123, username: 'john.doe' };
const token = generateToken(user, process.env.JWT_SECRET, '1h');

const upload = require('./middlewares/uploadMiddleware');

// Route pour télécharger une image
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const imageUrl = `/uploads/${req.file.filename}`;
    res.status(201).json({ imageUrl });
  } catch (error) {
    console.error('Erreur lors du téléchargement de l\'image :', error);
    res.status(500).json({ message: 'Erreur lors du téléchargement de l\'image' });
  }
});

app.use('/uploads', express.static('uploads'));

// Importer les routes pour chaque partie de l'application
const authRoutes = require("./routes/AuthRoutes");
const profileRoutes = require("./routes/ProfileRoutes");
const postRoutes = require("./routes/PostRoutes");
const commentRoutes = require("./routes/CommentRoutes");
const likesRoutes = require("./routes/LikesRoutes");
const followerRoutes = require("./routes/FollowerRoutes");
const statisticsRoutes = require("./routes/StatisticsRoutes");
const newsFeedRoutes = require("./routes/NewsFeedRoutes");

// Utiliser les routes dans l'application
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likesRoutes);
app.use("/api/followers", followerRoutes);
app.use("/api/statistics", statisticsRoutes);
app.use("/api/newsfeed", newsFeedRoutes);

// Middleware pour gérer les erreurs 404
app.use((req, res, next) => {
  res.status(404).json({ message: "Page not found" });
});

// Middleware pour gérer les erreurs internes du serveur
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Récupérer le port à partir des variables d'environnement ou utiliser le port 8000 par défaut
const port = process.env.APP_PORT || 8000;

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server is running on PORT ${port}....`);
});
