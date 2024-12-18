document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password: password })
    });


    // Redireccionar al formulario de registro
    document.getElementById('registerButton').addEventListener('click', function() {
        window.location.href = 'register.html';
    });

    // Redireccionar al formulario de reseteo de contraseña
    document.getElementById('resetPasswordButton').addEventListener('click', function() {
        window.location.href = 'reset_password.html';
    });

    // Aquí puedes agregar lógica para manejar los formularios de login, registro y reset de contraseña
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;


        fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = 'dashboard.html'; // Redirigir al dashboard si el login es exitoso
                } else {
                    alert('Login failed');
                }
            });
    });
});