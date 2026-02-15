/* ============================================
   AUTHENTIC LUXURY SHOP (ALS) - CHECKOUT PAGE
   ============================================ */

// Checkout Page Module
const CheckoutPage = {
    // Initialize checkout page
    init() {
        // Check if user is logged in
        if (!ALS.Auth.isLoggedIn()) {
            window.location.href = 'login.html?redirect=checkout.html';
            return;
        }

        this.renderOrderSummary();
        this.initPaymentMethods();
        this.initFormValidation();
    },

    // Render order summary
    renderOrderSummary() {
        const cart = ALS.getCart();
        
        if (cart.length === 0) {
            window.location.href = 'cart.html';
            return;
        }

        const itemsContainer = document.getElementById('orderItems');
        if (itemsContainer) {
            itemsContainer.innerHTML = cart.map(item => `
                <div class="order-summary-item">
                    <div class="order-summary-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="order-summary-item-details">
                        <div class="order-summary-item-name">${item.name}</div>
                        <div class="order-summary-item-qty">Qty: ${item.quantity}</div>
                    </div>
                    <div class="order-summary-item-price">${ALS.formatPrice(item.price * item.quantity)}</div>
                </div>
            `).join('');
        }

        this.updateTotals();
    },

    // Update totals
    updateTotals() {
        const cart = ALS.getCart();
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 10000 ? 0 : 50;
        const tax = subtotal * 0.08;
        const total = subtotal + shipping + tax;

        document.getElementById('subtotal').textContent = ALS.formatPrice(subtotal);
        document.getElementById('shipping').textContent = shipping === 0 ? 'Free' : ALS.formatPrice(shipping);
        document.getElementById('tax').textContent = ALS.formatPrice(tax);
        document.getElementById('total').textContent = ALS.formatPrice(total);
    },

    // Initialize payment methods
    initPaymentMethods() {
        const paymentMethods = document.querySelectorAll('.payment-method');
        
        paymentMethods.forEach(method => {
            method.addEventListener('click', () => {
                paymentMethods.forEach(m => m.classList.remove('active'));
                method.classList.add('active');
            });
        });
    },

    // Initialize form validation
    initFormValidation() {
        const form = document.getElementById('checkoutForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (this.validateForm()) {
                this.processCheckout();
            }
        });
    },

    // Validate form
    validateForm() {
        const requiredFields = [
            'firstName', 'lastName', 'email', 'phone',
            'address', 'city', 'state', 'zipCode', 'country'
        ];

        let isValid = true;

        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field && !field.value.trim()) {
                field.style.borderColor = 'var(--color-error)';
                isValid = false;
            } else if (field) {
                field.style.borderColor = '';
            }
        });

        // Validate email
        const email = document.getElementById('email');
        if (email && email.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                email.style.borderColor = 'var(--color-error)';
                ALS.showToast('Please enter a valid email address', 'error');
                isValid = false;
            }
        }

        // Check payment method
        const activePayment = document.querySelector('.payment-method.active');
        if (!activePayment) {
            ALS.showToast('Please select a payment method', 'error');
            isValid = false;
        }

        return isValid;
    },

    // Process checkout
    processCheckout() {
        const cart = ALS.getCart();
        const user = ALS.Auth.getCurrentUser();
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 10000 ? 0 : 50;
        const tax = subtotal * 0.08;
        const total = subtotal + shipping + tax;

        // Get shipping address
        const shippingAddress = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            zipCode: document.getElementById('zipCode').value,
            country: document.getElementById('country').value
        };

        // Get payment method
        const activePayment = document.querySelector('.payment-method.active');
        const paymentMethod = activePayment ? activePayment.dataset.method : 'card';

        // Create order
        const order = ALS.Orders.createOrder({
            userId: user.id,
            items: cart,
            subtotal,
            shipping,
            tax,
            total,
            shippingAddress,
            paymentMethod
        });

        // Show success message
        ALS.showToast('Order placed successfully!', 'success');

        // Redirect to confirmation
        setTimeout(() => {
            window.location.href = `profile.html?order=${order.id}`;
        }, 1500);
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('checkoutForm') || document.querySelector('.checkout-page')) {
        CheckoutPage.init();
    }
});

// Export to global scope
window.CheckoutPage = CheckoutPage;
