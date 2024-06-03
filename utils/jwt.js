const jwt = require('jsonwebtoken');

/**
 * Génère un token JWT.
 * @param {object} payload Données à inclure dans le token.
 * @param {string} secret Clé secrète pour la signature du token.
 * @param {string} expiresIn Durée de validité du token (ex: '1h', '7d', '30d').
 * @returns {string} Le token JWT généré.
 */
const generateToken = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn });
};

/**
 * Vérifie un token JWT.
 * @param {string} token Token JWT à vérifier.
 * @param {string} secret Clé secrète utilisée pour signer le token.
 * @returns {object} Payload du token si la vérification réussit, sinon null.
 */
const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error("Erreur lors de la vérification du token JWT :", error);
    return null;
  }
};

module.exports = { generateToken, verifyToken };
