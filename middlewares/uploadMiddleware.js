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

module.exports = upload;
