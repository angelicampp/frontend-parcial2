document.addEventListener('DOMContentLoaded', function() {
    // Redirige si ya está autenticado
    if (checkAuthentication()) {
        window.location.href = 'todo.html';
        return;
    }
    
    // Elementos
    const loginForm = document.getElementById('login-form');
    const errorElement = document.getElementById('login-error');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    
    // Envío del formulario
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = passwordInput.value;
        
        if (validateCredentials(username, password)) {
            localStorage.setItem('isAuthenticated', 'true');
            window.location.href = 'todo.html';
        } else {
            errorElement.style.display = 'block';
        }
    });

    // Mostrar/ocultar contraseña
    togglePasswordBtn.addEventListener('click', function() {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePasswordBtn.textContent = "Ocultar";
        } else {
            passwordInput.type = "password";
            togglePasswordBtn.textContent = "Mostrar";
        }
    });
});
