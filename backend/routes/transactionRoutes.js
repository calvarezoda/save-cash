// backend/routes/transactionRoutes.js

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Modelo de transacción básico
const Transaction = mongoose.model('Transaction', new mongoose.Schema({
  userId: String,
  amount: Number,
  currency: String,
  type: String, // 'send' o 'recovery'
  status: {
    type: String,
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}));

// Confirmar descuento antes de operar
router.post('/confirm-discount', async (req, res) => {
  const { amount, currency } = req.body;

  if (!amount || !currency) {
    return res.status(400).json({ error: 'Faltan datos de monto o moneda' });
  }

  const discount = amount * 0.02; // 2% comisión
  const finalAmount = amount - discount;

  res.json({
    message: `Confirmado envío de fondos`,
    discount: discount.toFixed(2),
    finalAmount: finalAmount.toFixed(2),
    currency
  });
});

// Registrar una transacción básica
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;