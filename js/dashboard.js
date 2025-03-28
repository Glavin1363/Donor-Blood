// Dashboard specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar on mobile
    const sidebarToggle = document.querySelector('.mobile-sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Request actions
    const acceptButtons = document.querySelectorAll('.action-btn.accept');
    const rejectButtons = document.querySelectorAll('.action-btn.reject');
    
    acceptButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const row = this.closest('tr');
            row.querySelector('.status-badge').className = 'status-badge accepted';
            row.querySelector('.status-badge').textContent = 'Accepted';
            this.textContent = 'Message';
            this.nextElementSibling.remove();
        });
    });
    
    rejectButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const row = this.closest('tr');
            row.querySelector('.status-badge').className = 'status-badge rejected';
            row.querySelector('.status-badge').textContent = 'Rejected';
            this.previousElementSibling.textContent = 'Delete';
            this.remove();
        });
    });
    
    // Emergency request button
    const emergencyBtn = document.querySelector('.btn-outline i.fa-bell');
    if (emergencyBtn) {
        emergencyBtn.closest('button').addEventListener('click', function() {
            alert('Emergency request feature would open a special form to quickly find donors in critical situations.');
        });
    }
    
    // New search button
    const newSearchBtn = document.querySelector('.btn-primary i.fa-plus');
    if (newSearchBtn) {
        newSearchBtn.closest('button').addEventListener('click', function() {
            window.location.href = 'search.html';
        });
    }
    
    // Populate user info from localStorage (simplified for demo)
    const userAvatar = document.querySelector('.user-avatar');
    const userInfo = document.querySelector('.user-info h3');
    const userEmail = localStorage.getItem('userEmail');
    
    if (userAvatar && userInfo && userEmail) {
        userAvatar.textContent = userEmail.charAt(0).toUpperCase();
        userInfo.textContent = userEmail;
    }
});