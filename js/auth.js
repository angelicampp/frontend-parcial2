const users = [{ username: "admin", password: "admin" }];

function checkAuthentication() {
    const authStatus = localStorage.getItem('isAuthenticated');
    return authStatus === 'true';
}

function redirectBasedOnAuth() {
    if (checkAuthentication()) {
        window.location.href = './todo.html';
    }
}

function validateCredentials(username, password) {
    return users.some(user => 
        user.username === username && user.password === password
    );
}

function logout() {
    localStorage.removeItem('isAuthenticated');
    window.location.href = './login.html';
}