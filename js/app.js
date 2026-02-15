/* ============================================
   AUTHENTIC LUXURY SHOP (ALS) - MAIN APP
   ============================================ */

// App Namespace
const ALS = {
    // Initialize the application
    init() {
        this.initializeData();
        this.initHeader();
        this.initMobileMenu();
        this.initSearch();
        this.initCart();
        this.initAnimations();
        this.initTheme();
    },

    // Initialize data
    initializeData() {
        if (typeof ALSData !== 'undefined') {
            ALSData.initializeData();
        }
    },

    // Header scroll effect
    initHeader() {
        const header = document.querySelector('.header');
        if (!header) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    },

    // Mobile menu
    initMobileMenu() {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileNav = document.querySelector('.mobile-nav');
        const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
        const mobileNavClose = document.querySelector('.mobile-nav-close');

        if (!menuToggle || !mobileNav) return;

        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
            if (mobileNavOverlay) {
                mobileNavOverlay.classList.toggle('active');
            }
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });

        if (mobileNavClose) {
            mobileNavClose.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                if (mobileNavOverlay) {
                    mobileNavOverlay.classList.remove('active');
                }
                document.body.style.overflow = '';
            });
        }

        if (mobileNavOverlay) {
            mobileNavOverlay.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                mobileNavOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    },

    // Search functionality
    initSearch() {
        const searchInput = document.querySelector('.search-input');
        const searchResults = document.querySelector('.search-results');

        if (!searchInput) return;

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            
            if (query.length < 2) {
                if (searchResults) {
                    searchResults.classList.remove('active');
                }
                return;
            }

            const products = this.getAllProducts();
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(query) ||
                product.brand.toLowerCase().includes(query) ||
                product.model.toLowerCase().includes(query)
            ).slice(0, 5);

            if (filteredProducts.length > 0 && searchResults) {
                searchResults.innerHTML = filteredProducts.map(product => `
                    <div class="search-result-item" onclick="window.location.href='product.html?id=${product.id}'">
                        <div class="search-result-image">
                            <img src="${product.images[0]}" alt="${product.name}">
                        </div>
                        <div class="search-result-info">
                            <div class="search-result-name">${product.name}</div>
                            <div class="search-result-price">${this.formatPrice(product.price)}</div>
                        </div>
                    </div>
                `).join('');
                searchResults.classList.add('active');
            } else if (searchResults) {
                searchResults.innerHTML = '<div class="search-result-item"><div class="search-result-info">No products found</div></div>';
                searchResults.classList.add('active');
            }
        });

        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults?.contains(e.target)) {
                if (searchResults) {
                    searchResults.classList.remove('active');
                }
            }
        });
    },

    // Cart functionality
    initCart() {
        this.updateCartCount();
    },

    // Update cart count
    updateCartCount() {
        const cartCountElements = document.querySelectorAll('.cart-count');
        const cart = this.getCart();
        
        cartCountElements.forEach(element => {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            element.textContent = totalItems;
            element.style.display = totalItems > 0 ? 'flex' : 'none';
        });
    },

    // Get cart from localStorage
    getCart() {
        return JSON.parse(localStorage.getItem('als_cart')) || [];
    },

    // Save cart to localStorage
    saveCart(cart) {
        localStorage.setItem('als_cart', JSON.stringify(cart));
        this.updateCartCount();
    },

    // Add to cart
    addToCart(productId, quantity = 1) {
        const products = this.getAllProducts();
        const product = products.find(p => p.id === parseInt(productId));
        
        if (!product) {
            this.showToast('Product not found', 'error');
            return false;
        }

        let cart = this.getCart();
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                brand: product.brand,
                price: product.price,
                image: product.images[0],
                quantity: quantity
            });
        }

        this.saveCart(cart);
        this.showToast(`${product.name} added to cart!`, 'success');
        return true;
    },

    // Remove from cart
    removeFromCart(productId) {
        let cart = this.getCart();
        cart = cart.filter(item => item.id !== parseInt(productId));
        this.saveCart(cart);
    },

    // Update cart item quantity
    updateCartQuantity(productId, quantity) {
        let cart = this.getCart();
        const item = cart.find(item => item.id === parseInt(productId));
        
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                cart = cart.filter(i => i.id !== parseInt(productId));
            }
        }
        
        this.saveCart(cart);
    },

    // Get cart total
    getCartTotal() {
        const cart = this.getCart();
        return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },

    // Get all products
    getAllProducts() {
        if (typeof ALSData !== 'undefined') {
            return ALSData.getProducts();
        }
        return [];
    },

    // Format price
    formatPrice(price, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0
        }).format(price);
    },

    // Show toast notification
    showToast(message, type = 'success') {
        let container = document.querySelector('.toast-container');
        
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <span>${message}</span>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    // Animations
    initAnimations() {
        // Initialize AOS-like animations
        const animatedElements = document.querySelectorAll('[data-aos]');
        
        if (animatedElements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => observer.observe(el));
    },

    // Theme toggle
    initTheme() {
        const themeToggle = document.querySelector('.theme-toggle');
        
        if (!themeToggle) return;

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('als_theme', newTheme);
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('als_theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    },

    // Page loader
    hidePageLoader() {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 500);
        }
    },

    // Get URL parameter
    getUrlParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    },

    // Render rating stars
    renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let starsHtml = '';

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                starsHtml += '<svg class="rating-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
            } else if (i === fullStars && hasHalfStar) {
                starsHtml += '<svg class="rating-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill-opacity="0.5"/></svg>';
            } else {
                starsHtml += '<svg class="rating-star empty" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
            }
        }

        return starsHtml;
    },

    // Render product card
    renderProductCard(product) {
        const badges = [];
        if (product.newArrival) badges.push('<span class="product-badge product-badge-new">New</span>');
        if (product.onSale) badges.push('<span class="product-badge product-badge-sale">Sale</span>');
        if (product.stock === 0) badges.push('<span class="product-badge product-badge-soldout">Sold Out</span>');

        return `
            <div class="product-card">
                <div class="product-image">
                    <a href="product.html?id=${product.id}">
                        <img src="${product.images[0]}" alt="${product.name}">
                    </a>
                    ${badges.length > 0 ? `<div class="product-badges">${badges.join('')}</div>` : ''}
                    <div class="product-actions">
                        <button class="product-action" onclick="ALS.quickView(${product.id})" title="Quick View">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        </button>
                        <button class="product-action" onclick="ALS.addToWishlist(${product.id})" title="Add to Wishlist">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <div class="product-brand">${product.brand}</div>
                    <h3 class="product-name">
                        <a href="product.html?id=${product.id}">${product.name}</a>
                    </h3>
                    <div class="product-rating">
                        <div class="rating-stars">${this.renderStars(product.rating)}</div>
                        <span class="rating-count">(${product.reviews})</span>
                    </div>
                    <div class="product-price">
                        <span class="price-current">${this.formatPrice(product.price)}</span>
                        ${product.onSale ? `<span class="price-original">${this.formatPrice(product.price * 1.2)}</span>` : ''}
                    </div>
                </div>
                <div class="product-card-footer">
                    <button class="btn btn-primary product-cta" onclick="window.location.href='product.html?id=${product.id}'">
                        View Details
                    </button>
                </div>
            </div>
        `;
    },

    // Quick view
    quickView(productId) {
        const products = this.getAllProducts();
        const product = products.find(p => p.id === parseInt(productId));
        
        if (!product) return;

        // Show quick view modal
        this.showToast('Quick view coming soon!', 'success');
    },

    // Add to wishlist
    addToWishlist(productId) {
        let wishlist = JSON.parse(localStorage.getItem('als_wishlist')) || [];
        
        if (!wishlist.includes(productId)) {
            wishlist.push(productId);
            localStorage.setItem('als_wishlist', JSON.stringify(wishlist));
            this.showToast('Added to wishlist!', 'success');
        } else {
            this.showToast('Already in wishlist', 'warning');
        }
    },

    // Filter products
    filterProducts(products, filters) {
        let filtered = [...products];

        if (filters.search) {
            const query = filters.search.toLowerCase();
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(query) ||
                p.brand.toLowerCase().includes(query) ||
                p.model.toLowerCase().includes(query)
            );
        }

        if (filters.brand && filters.brand.length > 0) {
            filtered = filtered.filter(p => filters.brand.includes(p.brand));
        }

        if (filters.minPrice) {
            filtered = filtered.filter(p => p.price >= filters.minPrice);
        }

        if (filters.maxPrice) {
            filtered = filtered.filter(p => p.price <= filters.maxPrice);
        }

        if (filters.sort) {
            switch (filters.sort) {
                case 'price-asc':
                    filtered.sort((a, b) => a.price - b.price);
                    break;
                case 'price-desc':
                    filtered.sort((a, b) => b.price - a.price);
                    break;
                case 'name-asc':
                    filtered.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'name-desc':
                    filtered.sort((a, b) => b.name.localeCompare(a.name));
                    break;
                case 'rating':
                    filtered.sort((a, b) => b.rating - a.rating);
                    break;
            }
        }

        return filtered;
    }
};

// User Authentication Module
ALS.Auth = {
    // Get current user
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('als_current_user')) || null;
    },

    // Check if logged in
    isLoggedIn() {
        return this.getCurrentUser() !== null;
    },

    // Check if admin
    isAdmin() {
        const user = this.getCurrentUser();
        return user && user.role === 'admin';
    },

    // Login
    login(email, password) {
        const users = typeof ALSData !== 'undefined' ? ALSData.getUsers() : [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            localStorage.setItem('als_current_user', JSON.stringify(user));
            return { success: true, user };
        }
        
        return { success: false, message: 'Invalid email or password' };
    },

    // Register
    register(name, email, password) {
        const users = typeof ALSData !== 'undefined' ? ALSData.getUsers() : [];
        
        // Check if email exists
        if (users.find(u => u.email === email)) {
            return { success: false, message: 'Email already registered' };
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            name,
            email,
            password,
            role: 'user',
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=c9a962&color=fff`,
            createdAt: new Date().toISOString().split('T')[0]
        };

        users.push(newUser);
        if (typeof ALSData !== 'undefined') {
            ALSData.saveUsers(users);
        }

        // Auto login
        localStorage.setItem('als_current_user', JSON.stringify(newUser));
        
        return { success: true, user: newUser };
    },

    // Logout
    logout() {
        localStorage.removeItem('als_current_user');
        window.location.href = 'index.html';
    },

    // Update profile
    updateProfile(updates) {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return { success: false, message: 'Not logged in' };

        const users = typeof ALSData !== 'undefined' ? ALSData.getUsers() : [];
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        
        if (userIndex === -1) return { success: false, message: 'User not found' };

        const updatedUser = { ...users[userIndex], ...updates };
        users[userIndex] = updatedUser;
        
        if (typeof ALSData !== 'undefined') {
            ALSData.saveUsers(users);
        }
        
        localStorage.setItem('als_current_user', JSON.stringify(updatedUser));
        
        return { success: true, user: updatedUser };
    },

    // Update UI based on auth state
    updateAuthUI() {
        const authButtons = document.querySelector('.auth-buttons');
        const userMenu = document.querySelector('.user-menu');
        
        if (!authButtons && !userMenu) return;

        if (this.isLoggedIn()) {
            const user = this.getCurrentUser();
            
            if (authButtons) {
                authButtons.innerHTML = `
                    <div class="user-dropdown">
                        <button class="user-dropdown-toggle">
                            <img src="${user.avatar}" alt="${user.name}" class="user-avatar">
                            <span>${user.name}</span>
                        </button>
                        <div class="user-dropdown-menu">
                            <a href="profile.html" class="user-dropdown-item">My Profile</a>
                            <a href="profile.html#orders" class="user-dropdown-item">My Orders</a>
                            ${this.isAdmin() ? '<a href="admin/dashboard.html" class="user-dropdown-item">Admin Panel</a>' : ''}
                            <button class="user-dropdown-item" onclick="ALS.Auth.logout()">Logout</button>
                        </div>
                    </div>
                `;
            }
        }
    }
};

// Order Module
ALS.Orders = {
    // Create order
    createOrder(orderData) {
        const orders = typeof ALSData !== 'undefined' ? ALSData.getOrders() : [];
        
        const order = {
            id: 'ORD-' + Date.now(),
            userId: orderData.userId,
            items: orderData.items,
            subtotal: orderData.subtotal,
            shipping: orderData.shipping || 0,
            tax: orderData.tax || 0,
            total: orderData.total,
            status: 'pending',
            shippingAddress: orderData.shippingAddress,
            paymentMethod: orderData.paymentMethod,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        orders.push(order);
        
        if (typeof ALSData !== 'undefined') {
            ALSData.saveOrders(orders);
        }

        // Clear cart
        localStorage.setItem('als_cart', JSON.stringify([]));
        
        return order;
    },

    // Get user orders
    getUserOrders(userId) {
        const orders = typeof ALSData !== 'undefined' ? ALSData.getOrders() : [];
        return orders.filter(o => o.userId === userId);
    },

    // Update order status
    updateOrderStatus(orderId, status) {
        const orders = typeof ALSData !== 'undefined' ? ALSData.getOrders() : [];
        const orderIndex = orders.findIndex(o => o.id === orderId);
        
        if (orderIndex !== -1) {
            orders[orderIndex].status = status;
            orders[orderIndex].updatedAt = new Date().toISOString();
            
            if (typeof ALSData !== 'undefined') {
                ALSData.saveOrders(orders);
            }
            
            return true;
        }
        
        return false;
    },

    // Get all orders (admin)
    getAllOrders() {
        return typeof ALSData !== 'undefined' ? ALSData.getOrders() : [];
    }
};

// Admin Module
ALS.Admin = {
    // Dashboard stats
    getStats() {
        const orders = this.getAllOrders();
        const users = typeof ALSData !== 'undefined' ? ALSData.getUsers() : [];
        const products = typeof ALSData !== 'undefined' ? ALSData.getProducts() : [];
        
        const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
        const pendingOrders = orders.filter(o => o.status === 'pending').length;
        
        return {
            totalOrders: orders.length,
            totalUsers: users.length,
            totalProducts: products.length,
            totalRevenue,
            pendingOrders
        };
    },

    // Add product
    addProduct(productData) {
        const products = typeof ALSData !== 'undefined' ? ALSData.getProducts() : [];
        
        const newProduct = {
            id: Date.now(),
            ...productData,
            rating: 0,
            reviews: 0,
            featured: false,
            newArrival: true,
            onSale: false
        };

        products.push(newProduct);
        
        if (typeof ALSData !== 'undefined') {
            ALSData.saveProducts(products);
        }
        
        return newProduct;
    },

    // Update product
    updateProduct(productId, updates) {
        const products = typeof ALSData !== 'undefined' ? ALSData.getProducts() : [];
        const productIndex = products.findIndex(p => p.id === parseInt(productId));
        
        if (productIndex !== -1) {
            products[productIndex] = { ...products[productIndex], ...updates };
            
            if (typeof ALSData !== 'undefined') {
                ALSData.saveProducts(products);
            }
            
            return products[productIndex];
        }
        
        return null;
    },

    // Delete product
    deleteProduct(productId) {
        let products = typeof ALSData !== 'undefined' ? ALSData.getProducts() : [];
        products = products.filter(p => p.id !== parseInt(productId));
        
        if (typeof ALSData !== 'undefined') {
            ALSData.saveProducts(products);
        }
        
        return true;
    },

    // Get all orders
    getAllOrders() {
        return typeof ALSData !== 'undefined' ? ALSData.getOrders() : [];
    },

    // Get all users
    getAllUsers() {
        return typeof ALSData !== 'undefined' ? ALSData.getUsers() : [];
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    ALS.init();
    
    // Hide page loader after init
    setTimeout(() => {
        ALS.hidePageLoader();
    }, 500);
});

// Export to global scope
window.ALS = ALS;
