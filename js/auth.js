/* ============================================
   AUTHENTIC LUXURY SHOP (ALS) - AUTH PAGE
   ============================================ */

// Auth Page Module
const AuthPage = {
    // Current page type
    pageType: 'login',

    // Initialize auth page
    init() {
        // Determine page type
        const path = window.location.pathname;
        if (path.includes('register')) {
            this.pageType = 'register';
        } else {
            this.pageType = 'login';
        }

        // Check if already logged in
        if (ALS.Auth.isLoggedIn()) {
            window.location.href = 'profile.html';
            return;
        }

        this.initForms();
    },

    // Initialize forms
    initForms() {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister();
            });
        }
    },

    // Handle login
    handleLogin() {
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const rememberMe = document.getElementById('rememberMe');

        if (!email.value || !password.value) {
            ALS.showToast('Please fill in all fields', 'error');
            return;
        }

        const result = ALS.Auth.login(email.value, password.value);

        if (result.success) {
            ALS.showToast('Login successful!', 'success');
            
            // Redirect
            const redirect = ALS.getUrlParam('redirect') || 'profile.html';
            setTimeout(() => {
                window.location.href = redirect;
            }, 1000);
        } else {
            ALS.showToast(result.message, 'error');
        }
    },

    // Handle register
    handleRegister() {
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');

        if (!name.value || !email.value || !password.value || !confirmPassword.value) {
            ALS.showToast('Please fill in all fields', 'error');
            return;
        }

        if (password.value !== confirmPassword.value) {
            ALS.showToast('Passwords do not match', 'error');
            return;
        }

        if (password.value.length < 6) {
            ALS.showToast('Password must be at least 6 characters', 'error');
            return;
        }

        const result = ALS.Auth.register(name.value, email.value, password.value);

        if (result.success) {
            ALS.showToast('Registration successful!', 'success');
            
            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 1000);
        } else {
            ALS.showToast(result.message, 'error');
        }
    }
};

// Profile Page Module
const ProfilePage = {
    // Initialize profile page
    init() {
        // Check if logged in
        if (!ALS.Auth.isLoggedIn()) {
            window.location.href = 'login.html?redirect=profile.html';
            return;
        }

        this.renderProfile();
        this.renderOrders();
        this.initTabs();
    },

    // Render profile info
    renderProfile() {
        const user = ALS.Auth.getCurrentUser();
        if (!user) return;

        const profileHeader = document.getElementById('profileHeader');
        if (profileHeader) {
            profileHeader.innerHTML = `
                <div class="profile-avatar">
                    <img src="${user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=c9a962&color=fff`}" alt="${user.name}">
                </div>
                <div class="profile-info">
                    <h2>${user.name}</h2>
                    <p class="profile-email">${user.email}</p>
                    <p class="profile-email">Member since: ${user.createdAt || 'N/A'}</p>
                </div>
            `;
        }
    },

    // Render orders
    renderOrders() {
        const user = ALS.Auth.getCurrentUser();
        if (!user) return;

        const orders = ALS.Orders.getUserOrders(user.id);
        const ordersContainer = document.getElementById('ordersList');
        
        if (!ordersContainer) return;

        if (orders.length === 0) {
            ordersContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                            <line x1="3" y1="6" x2="21" y2="6"/>
                            <path d="M16 10a4 4 0 0 1-8 0"/>
                        </svg>
                    </div>
                    <h3 class="empty-state-title">No Orders Yet</h3>
                    <p class="empty-state-text">Start shopping to see your orders here</p>
                    <a href="shop.html" class="btn btn-primary">Browse Products</a>
                </div>
            `;
            return;
        }

        ordersContainer.innerHTML = orders.map(order => `
            <div class="order-item">
                <div class="order-item-header">
                    <span class="order-id">${order.id}</span>
                    <span class="order-status ${order.status}">${order.status}</span>
                </div>
                <div class="order-item-body">
                    <div class="order-date">Ordered on ${new Date(order.createdAt).toLocaleDateString()}</div>
                    <div class="order-total">${ALS.formatPrice(order.total)}</div>
                </div>
                <div class="order-items-preview">
                    ${order.items.map(item => `<span>${item.name} x${item.quantity}</span>`).join(', ')}
                </div>
            </div>
        `).join('');
    },

    // Initialize tabs
    initTabs() {
        const tabButtons = document.querySelectorAll('.profile-tab');
        const tabContents = document.querySelectorAll('.profile-content');

        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                
                tabButtons.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                btn.classList.add('active');
                document.getElementById(`tab-${tab}`)?.classList.add('active');
            });
        });

        // Check for hash
        if (window.location.hash === '#orders') {
            document.querySelector('[data-tab="orders"]')?.click();
        }
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.auth-page') || document.getElementById('loginForm') || document.getElementById('registerForm')) {
        AuthPage.init();
    }
    
    if (document.querySelector('.profile-page') || document.getElementById('profileHeader')) {
        ProfilePage.init();
    }
});

// Export to global scope
window.AuthPage = AuthPage;
window.ProfilePage = ProfilePage;
