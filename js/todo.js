document.addEventListener('DOMContentLoaded', function() {
    if (!checkAuthentication()) {
        window.location.href = 'login.html';
        return;
    }

    setupEventListeners();
});

function setupEventListeners() {
    // botón de logout
    document.getElementById('logout-btn').addEventListener('click', function() {
        logout();
    });
}