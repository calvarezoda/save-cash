// backend/routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

// Iniciar sesión como administrador
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin || admin.password !== password) {
      return res.status(400).json({ error: 'Credenciales incorrectas' });
    }

    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los admins
router.get('/admins', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Registrar un nuevo administrador
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newAdmin = new Admin({ name, email, password });
    await newAdmin.save();
    res.status(201).json({ message: 'Administrador creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;