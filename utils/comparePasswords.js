const bcrypt = require('bcrypt');

/**
 * Compare deux mots de passe hachés.
 * @param {string} password Mot de passe non haché à comparer.
 * @param {string} hashedPassword Mot de passe haché à comparer.
 * @returns {boolean} Renvoie true si les mots de passe correspondent, sinon false.
 */
const comparePasswords = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error("Erreur lors de la comparaison des mots de passe :", error);
    return false;
  }
};

module.exports = comparePasswords;
