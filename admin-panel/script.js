// admin-panel/script.js

document.getElementById('adminLoginForm')?.addEventListener('submit', async function(e) {
  e.preventDefault();

  const email = this[0].value;
  const password = this[1].value;

  try {
    const res = await fetch('http://localhost:5000/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (res.ok) {
      alert('✅ Bienvenido al sistema');
      window.location.href = 'index.html';
    } else {
      alert('❌ Credenciales incorrectas');
    }

  } catch (error) {
    console.error('⚠️ Error:', error);
    alert('No se pudo conectar al servidor. Asegúrate de que esté corriendo');
  }
});