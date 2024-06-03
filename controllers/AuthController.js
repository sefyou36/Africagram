const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const hashPassword = require('../utils/hashPassword');
const comparePasswords = require('../utils/comparePasswords');
const { generateToken } = require('../utils/jwt');
const { BadRequestError, UnauthenticatedError } = require('../errors/errors');

class AuthController {
  async register(req, res) {
    try {
      const { firstname, lastname, email, password } = req.body;

      if (!firstname || !lastname || !email || !password) {
        throw new BadRequestError("Tous les champs sont requis pour l'inscription.");
      }

      const hashedPassword = await hashPassword(password);

      const newUser = await prisma.utilisateur.create({
        data: {
          firstname,
          lastname,
          email,
          password: hashedPassword,
        },
      });

      const token = generateToken({ userId: newUser.id, email }, process.env.JWT_SECRET, '1h'); // Utilisez process.env.JWT_SECRET
      res.status(200).json({ token });
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new BadRequestError("L'email et le mot de passe sont requis pour la connexion.");
      }

      const user = await prisma.utilisateur.findUnique({ where: { email } });

      if (!user) {
        throw new UnauthenticatedError("L'email ou le mot de passe est incorrect.");
      }

      const isValidPassword = await comparePasswords(password, user.password);

      if (!isValidPassword) {
        throw new UnauthenticatedError("L'email ou le mot de passe est incorrect.");
      }

      const token = generateToken({ userId: user.id, email }, process.env.JWT_SECRET, '1h'); // Utilisez process.env.JWT_SECRET
      res.status(200).json({ token });
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
}

module.exports = new AuthController();
