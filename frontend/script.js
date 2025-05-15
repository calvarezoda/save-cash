// frontend/script.js

document.getElementById('sendForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const name = this['Sender\'s Name'].value;
  const email = this['Email Address'].value;
  const amount = this['Amount to send'].value;
  const currency = this.currency.value;
  const destination = this['Destination address or withdrawal method'].value;

  try {
    const res = await fetch('http://localhost:5000/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: '66XXXXXXXXXXXXXX',
        amount,
        currency,
        type: 'send',
        status: 'pending'
      })
    });

    if (res.ok) {
      alert('✅ Envío registrado. Te contactaremos pronto.');
    } else {
      alert('❌ Error registrando la transacción');
    }

  } catch (error) {
    console.error('⚠️ Error:', error);
    alert('No se pudo conectar al servidor. Asegúrate de que el backend esté corriendo');
  }
});

document.getElementById('recoveryForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const name = this['Your Full Name'].value;
  const email = this['Your Email'].value;
  const transactionId = this['Transaction ID or hash'].value;
  const description = this['Describe what happened with your money'].value;

  try {
    const res = await fetch('http://localhost:5000/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: '66XXXXXXXXXXXXXX',
        amount: 0,
        currency: 'USD',
        type: 'recovery',
        status: 'pending'
      })
    });

    if (res.ok) {
      alert('🔍 Fondos reportados. Te contactaremos pronto.');
    } else {
      alert('❌ Error registrando la recuperación');
    }

  } catch (error) {
    console.error('⚠️ Error:', error);
    alert('No se pudo conectar al servidor. Asegúrate de que el backend esté corriendo');
  }
});