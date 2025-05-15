// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv').config({ path: '../.env' });
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Importar rutas
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

// Usar rutas
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/transactions', transactionRoutes);

// Conectar a MongoDB (local o Atlas)
mongoose.connect(process.env.MONGO_URI, { family: 4 })
  .then(() => {
    console.log('✅ Conexión exitosa a MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error conectando a MongoDB:', error.message);
  });