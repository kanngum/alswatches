/* ============================================
   AUTHENTIC LUXURY SHOP (ALS) - PRODUCT PAGE
   ============================================ */

// Product Page Module
const ProductPage = {
    // Current product
    product: null,
    currentImageIndex: 0,
    quantity: 1,

    // Initialize product page
    init() {
        const productId = ALS.getUrlParam('id');
        
        if (!productId) {
            window.location.href = 'shop.html';
            return;
        }

        this.loadProduct(productId);
        this.initImageGallery();
        this.initQuantity();
        this.initAddToCart();
        this.initTabs();
    },

    // Load product data
    loadProduct(productId) {
        const products = ALS.getAllProducts();
        this.product = products.find(p => p.id === parseInt(productId));

        if (!this.product) {
            window.location.href = 'shop.html';
            return;
        }

        this.renderProduct();
    },

    // Render product details
    renderProduct() {
        // Update page title
        document.title = `${this.product.name} - Authentic Luxury Shop`;

        // Render images
        this.renderImages();

        // Render info
        const infoContainer = document.getElementById('productInfo');
        if (infoContainer) {
            infoContainer.innerHTML = this.getProductInfoHTML();
        }

        // Render specifications
        this.renderSpecifications();
    },

    // Render image gallery
    renderImages() {
        const mainImage = document.getElementById('mainImage');
        const thumbnails = document.getElementById('thumbnails');
        
        if (mainImage) {
            mainImage.src = this.product.images[0];
            mainImage.alt = this.product.name;
        }

        if (thumbnails) {
            thumbnails.innerHTML = this.product.images.map((img, index) => `
                <button class="thumbnail ${index === 0 ? 'active' : ''}" onclick="ProductPage.changeImage(${index})">
                    <img src="${img}" alt="${this.product.name}">
                </button>
            `).join('');
        }
    },

    // Change main image
    changeImage(index) {
        this.currentImageIndex = index;
        const mainImage = document.getElementById('mainImage');
        const thumbnails = document.querySelectorAll('.thumbnail');
        
        if (mainImage) {
            mainImage.src = this.product.images[index];
        }

        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    },

    // Get product info HTML
    getProductInfoHTML() {
        const badges = [];
        if (this.product.newArrival) badges.push('<span class="product-badge product-badge-new">New Arrival</span>');
        if (this.product.onSale) badges.push('<span class="product-badge product-badge-sale">Sale</span>');
        if (this.product.stock === 0) badges.push('<span class="product-badge product-badge-soldout">Sold Out</span>');

        return `
            <div class="product-badges" style="position: static; margin-bottom: 1rem;">
                ${badges.join('')}
            </div>
            
            <h1 class="product-title">${this.product.name}</h1>
            
            <div class="product-meta">
                <span class="product-brand">${this.product.brand}</span>
                <span class="product-model">${this.product.model}</span>
            </div>
            
            <div class="product-rating" style="margin: 1rem 0;">
                <div class="rating-stars">${ALS.renderStars(this.product.rating)}</div>
                <span class="rating-count">(${this.product.reviews} reviews)</span>
            </div>
            
            <div class="product-price" style="margin: 1.5rem 0;">
                <span class="price-current" style="font-size: 2rem;">${ALS.formatPrice(this.product.price)}</span>
                ${this.product.onSale ? `<span class="price-original" style="font-size: 1.25rem;">${ALS.formatPrice(this.product.price * 1.2)}</span>` : ''}
            </div>
            
            <div class="product-description" style="margin: 1.5rem 0; color: var(--color-gray); line-height: 1.8;">
                ${this.product.description}
            </div>
            
            <div class="product-stock" style="margin: 1rem 0;">
                <span style="color: ${this.product.stock > 0 ? 'var(--color-success)' : 'var(--color-error)'};">
                    ${this.product.stock > 0 ? `✓ In Stock (${this.product.stock} available)` : '✗ Out of Stock'}
                </span>
            </div>
            
            <div class="product-actions" style="display: flex; gap: 1rem; margin: 2rem 0; flex-wrap: wrap;">
                <div class="quantity-input">
                    <button class="quantity-btn" onclick="ProductPage.decreaseQuantity()">-</button>
                    <span class="quantity-value" id="quantityValue">1</span>
                    <button class="quantity-btn" onclick="ProductPage.increaseQuantity()">+</button>
                </div>
                
                <button class="btn btn-primary btn-lg" onclick="ProductPage.addToCart()" ${this.product.stock === 0 ? 'disabled' : ''}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="9" cy="21" r="1"/>
                        <circle cx="20" cy="21" r="1"/>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                    Add to Cart
                </button>
                
                <button class="btn btn-secondary btn-lg" onclick="ALS.addToWishlist(${this.product.id})">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    Add to Wishlist
                </button>
            </div>
            
            <div class="product-warranty" style="margin: 1.5rem 0; padding: 1rem; background: var(--color-white-light); border-radius: var(--radius-md);">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    <strong>${this.product.warranty}</strong>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--color-gray);">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                    </svg>
                    <span>${this.product.authenticityCertificate}</span>
                </div>
            </div>
        `;
    },

    // Render specifications
    renderSpecifications() {
        const specsContainer = document.getElementById('specifications');
        if (!specsContainer || !this.product.specifications) return;

        specsContainer.innerHTML = Object.entries(this.product.specifications).map(([key, value]) => `
            <div class="spec-item">
                <span class="spec-label">${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                <span class="spec-value">${value}</span>
            </div>
        `).join('');
    },

    // Initialize image gallery
    initImageGallery() {
        // Thumbnail click handlers are already in HTML
    },

    // Initialize quantity controls
    initQuantity() {
        this.quantity = 1;
    },

    // Increase quantity
    increaseQuantity() {
        if (this.quantity < this.product.stock) {
            this.quantity++;
            this.updateQuantityDisplay();
        }
    },

    // Decrease quantity
    decreaseQuantity() {
        if (this.quantity > 1) {
            this.quantity--;
            this.updateQuantityDisplay();
        }
    },

    // Update quantity display
    updateQuantityDisplay() {
        const quantityValue = document.getElementById('quantityValue');
        if (quantityValue) {
            quantityValue.textContent = this.quantity;
        }
    },

    // Initialize add to cart
    initAddToCart() {
        // Handlers are in HTML
    },

    // Add to cart
    addToCart() {
        if (this.product.stock === 0) {
            ALS.showToast('This product is out of stock', 'error');
            return;
        }

        const success = ALS.addToCart(this.product.id, this.quantity);
        if (success) {
            // Update cart UI
            ALS.updateCartCount();
        }
    },

    // Initialize tabs
    initTabs() {
        const tabButtons = document.querySelectorAll('.product-tab-btn');
        const tabContents = document.querySelectorAll('.product-tab-content');

        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                
                tabButtons.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                btn.classList.add('active');
                document.getElementById(`tab-${tab}`)?.classList.add('active');
            });
        });
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('productInfo') || document.querySelector('.product-page')) {
        ProductPage.init();
    }
});

// Export to global scope
window.ProductPage = ProductPage;
