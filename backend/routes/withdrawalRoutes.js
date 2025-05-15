// backend/routes/withdrawalRoutes.js

const express = require('express');
const router = express.Router();

// Ver métodos de retiro
router.get('/', (req, res) => {
  res.json([
    'International bank transfer',
    'Virtual prepaid card',
    'Western Union',
    'Cryptocurrencies (BTC, USDT)'
  ]);
});

// Solicitar un retiro
router.post('/request', async (req, res) => {
  const { userId, amount, method } = req.body;

  if (!userId || !amount || !method) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  // Aquí puedes guardar la solicitud de retiro en la base de datos
  res.json({ message: `Solicitud de retiro registrada: ${amount} via ${method}` });
});

module.exports = router;