// Authentication functions
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentPage = window.location.pathname.split('/').pop();

    if (!isLoggedIn && currentPage !== 'login.html' && currentPage !== 'register.html') {
        window.location.href = 'login.html'; // Redirect to login if not logged in
    }

    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const rememberMe = document.getElementById('remember-me').checked;

            // Retrieve all registered users
            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
            
            // Check if any user exists with this email
            const userExists = storedUsers.some(user => user.email === email);
            
            if (!userExists) {
                alert('No account found with this email. Please register first.');
                return;
            }

            // Find matching user
            const user = storedUsers.find(u => u.email === email && u.password === password);

            if (user) {
                // Store current user session
                localStorage.setItem('currentUser ', JSON.stringify(user));
                localStorage.setItem('isLoggedIn', 'true');
                
                // Handle "Remember me" functionality
                if (rememberMe) {
                    localStorage.setItem('rememberedEmail', email);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }
                
                window.location.href = 'dashboard.html'; // Redirect to dashboard
            } else {
                alert('Invalid password. Please try again.');
            }
        });
    }

    // Auto-fill email if "Remember me" was checked previously
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        document.getElementById('login-email').value = rememberedEmail;
        document.getElementById('remember-me').checked = true;
    }

    // Logout functionality
    const logoutLinks = document.querySelectorAll('a[href="index.html"]');
    logoutLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.querySelector('.fa-sign-out-alt')) {
                e.preventDefault();
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('currentUser ');
                window.location.href = 'index.html'; // Redirect to home
            }
        });
    });


    // Check if user is logged in
    function checkAuth() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const currentPage = window.location.pathname.split('/').pop();

        // If not logged in and trying to access protected pages
        if (!isLoggedIn && ['dashboard.html', 'profile.html', 'search.html'].includes(currentPage)) {
            window.location.href = 'login.html';
        }

        // If logged in and trying to access login/register pages
        if (isLoggedIn && ['login.html', 'register.html'].includes(currentPage)) {
            window.location.href = 'dashboard.html';
        }
    }

    // Run auth check
    checkAuth();
});
