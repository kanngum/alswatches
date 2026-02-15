/* ============================================
   AUTHENTIC LUXURY SHOP (ALS) - CART PAGE
   ============================================ */

// Cart Page Module
const CartPage = {
    // Initialize cart page
    init() {
        this.renderCart();
        this.initQuantityControls();
    },

    // Get cart items
    getCart() {
        return ALS.getCart();
    },

    // Render cart items
    renderCart() {
        const cartItemsContainer = document.getElementById('cartItems');
        const cartSummaryContainer = document.getElementById('cartSummary');
        const emptyCartContainer = document.getElementById('emptyCart');
        
        const cart = this.getCart();

        if (cart.length === 0) {
            if (cartItemsContainer) cartItemsContainer.style.display = 'none';
            if (cartSummaryContainer) cartSummaryContainer.style.display = 'none';
            if (emptyCartContainer) emptyCartContainer.style.display = 'block';
            return;
        }

        if (cartItemsContainer) {
            cartItemsContainer.style.display = 'block';
            cartItemsContainer.innerHTML = cart.map(item => this.renderCartItem(item)).join('');
        }

        if (cartSummaryContainer) {
            cartSummaryContainer.style.display = 'block';
            this.renderSummary();
        }

        if (emptyCartContainer) {
            emptyCartContainer.style.display = 'none';
        }
    },

    // Render single cart item
    renderCartItem(item) {
        return `
            <div class="product-card-horizontal" data-id="${item.id}">
                <div class="product-card-horizontal-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="product-card-horizontal-info">
                    <div class="product-card-horizontal-brand">${item.brand}</div>
                    <h3 class="product-card-horizontal-name">${item.name}</h3>
                    <div class="product-card-horizontal-price">${ALS.formatPrice(item.price)}</div>
                </div>
                <div class="product-card-horizontal-actions">
                    <div class="quantity-input">
                        <button class="quantity-btn" onclick="CartPage.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn" onclick="CartPage.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <button class="product-card-horizontal-remove" onclick="CartPage.removeItem(${item.id})">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    },

    // Render summary
    renderSummary() {
        const cart = this.getCart();
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 10000 ? 0 : 50;
        const tax = subtotal * 0.08;
        const total = subtotal + shipping + tax;

        const subtotalEl = document.getElementById('subtotal');
        const shippingEl = document.getElementById('shipping');
        const taxEl = document.getElementById('tax');
        const totalEl = document.getElementById('total');

        if (subtotalEl) subtotalEl.textContent = ALS.formatPrice(subtotal);
        if (shippingEl) shippingEl.textContent = shipping === 0 ? 'Free' : ALS.formatPrice(shipping);
        if (taxEl) taxEl.textContent = ALS.formatPrice(tax);
        if (totalEl) totalEl.textContent = ALS.formatPrice(total);
    },

    // Initialize quantity controls
    initQuantityControls() {
        // Already handled by onclick events
    },

    // Update item quantity
    updateQuantity(productId, newQuantity) {
        if (newQuantity < 1) {
            this.removeItem(productId);
            return;
        }

        ALS.updateCartQuantity(productId, newQuantity);
        this.renderCart();
        ALS.updateCartCount();
    },

    // Remove item from cart
    removeItem(productId) {
        ALS.removeFromCart(productId);
        this.renderCart();
        ALS.updateCartCount();
        
        const cart = this.getCart();
        if (cart.length === 0) {
            this.renderCart();
        }
    },

    // Clear cart
    clearCart() {
        localStorage.setItem('als_cart', JSON.stringify([]));
        ALS.updateCartCount();
        this.renderCart();
    },

    // Proceed to checkout
    proceedToCheckout() {
        const cart = this.getCart();
        
        if (cart.length === 0) {
            ALS.showToast('Your cart is empty', 'error');
            return;
        }

        if (!ALS.Auth.isLoggedIn()) {
            ALS.showToast('Please login to proceed to checkout', 'warning');
            setTimeout(() => {
                window.location.href = 'login.html?redirect=checkout.html';
            }, 1500);
            return;
        }

        window.location.href = 'checkout.html';
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cartItems') || document.querySelector('.cart-page')) {
        CartPage.init();
    }
});

// Export to global scope
window.CartPage = CartPage;
