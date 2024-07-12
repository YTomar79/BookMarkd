// auth.js
document.addEventListener('DOMContentLoaded', () => {
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');
    const loginForm = document.getElementById('login-form').parentElement;
    const signupForm = document.getElementById('signup-form').parentElement;

    showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    });

    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    });
});
