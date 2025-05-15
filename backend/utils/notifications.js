// backend/utils/notifications.js

const nodemailer = require('nodemailer');
const twilio = require('twilio');

// Configuración del correo
const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to,
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Correo enviado a ${to}`);
  } catch (error) {
    console.error('❌ Error enviando correo:', error.message);
  }
};

// Configuración de WhatsApp
const sendWhatsApp = async (message) => {
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: `whatsapp:+${process.env.WHATSAPP_NUMBER}`
    });
    console.log('✅ Mensaje de WhatsApp enviado');
  } catch (error) {
    console.error('❌ Error enviando WhatsApp:', error.message);
  }
};

module.exports = { sendEmail, sendWhatsApp };
