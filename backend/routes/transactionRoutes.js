// backend/routes/transactionRoutes.js

const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const { sendEmail } = require('../utils/notifications');

// Registrar una nueva transacción
router.post('/transactions', async (req, res) => {
  const { userId, amount, currency, type, status } = req.body;

  try {
    const newTransaction = new Transaction({
      userId,
      amount,
      currency,
      type,
      status
    });

    await newTransaction.save();

    // ✉️ Enviar notificación al admin por correo
    await sendEmail(
      process.env.ADMIN_EMAIL,
      `Nueva transacción: ${type}`,
      `Se ha registrado una nueva transacción:\n\nTipo: ${type}\nUsuario ID: ${userId}\nMonto: ${amount} ${currency}\nEstado: ${status || 'pendiente'}`
    );

    res.status(201).json({ message: 'Transacción creada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todas las transacciones
router.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('userId', 'name email');
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener transacciones por usuario
router.get('/users/:userId/transactions', async (req, res) => {
  const { userId } = req.params;

  try {
    const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
