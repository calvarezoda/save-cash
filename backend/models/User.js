// backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Registrar un nuevo usuario
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los usuarios
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
