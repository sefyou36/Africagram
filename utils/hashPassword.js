const bcrypt = require('bcrypt');

/**
 * Hache un mot de passe.
 * @param {string} password Mot de passe à hacher.
 * @returns {string} Le mot de passe haché.
 */
const hashPassword = async (password) => {
  try {
    const saltRounds = 10; // Nombre de tours de salage
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    console.error("Erreur lors du hachage du mot de passe :", error);
    throw new Error("Erreur lors du hachage du mot de passe.");
  }
};

module.exports = hashPassword;
