/* ============================================
   AUTHENTIC LUXURY SHOP (ALS) - SHOP PAGE
   ============================================ */

// Shop Page Module
const ShopPage = {
    // Current filters
    filters: {
        search: '',
        brand: [],
        minPrice: 0,
        maxPrice: 50000,
        sort: 'featured'
    },

    // Initialize shop page
    init() {
        this.initFilters();
        this.initSort();
        this.initPriceRange();
        this.renderProducts();
    },

    // Initialize filters
    initFilters() {
        // Brand filters
        const brandCheckboxes = document.querySelectorAll('.filter-option[data-brand]');
        brandCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('click', () => {
                checkbox.classList.toggle('active');
                const brand = checkbox.dataset.brand;
                
                if (checkbox.classList.contains('active')) {
                    this.filters.brand.push(brand);
                } else {
                    this.filters.brand = this.filters.brand.filter(b => b !== brand);
                }
                
                this.renderProducts();
            });
        });

        // Search filter
        const searchInput = document.getElementById('shopSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filters.search = e.target.value;
                this.renderProducts();
            });
        }

        // Clear filters
        const clearBtn = document.querySelector('.filter-clear');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.clearFilters();
            });
        }
    },

    // Initialize sort
    initSort() {
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.filters.sort = e.target.value;
                this.renderProducts();
            });
        }
    },

    // Initialize price range
    initPriceRange() {
        const minInput = document.getElementById('minPrice');
        const maxInput = document.getElementById('maxPrice');
        const applyBtn = document.getElementById('applyPrice');

        if (applyBtn) {
            applyBtn.addEventListener('click', () => {
                this.filters.minPrice = parseInt(minInput?.value) || 0;
                this.filters.maxPrice = parseInt(maxInput?.value) || 50000;
                this.renderProducts();
            });
        }
    },

    // Clear all filters
    clearFilters() {
        this.filters = {
            search: '',
            brand: [],
            minPrice: 0,
            maxPrice: 50000,
            sort: 'featured'
        };

        // Reset UI
        document.querySelectorAll('.filter-option.active').forEach(el => {
            el.classList.remove('active');
        });

        const searchInput = document.getElementById('shopSearch');
        if (searchInput) searchInput.value = '';

        const minInput = document.getElementById('minPrice');
        const maxInput = document.getElementById('maxPrice');
        if (minInput) minInput.value = 0;
        if (maxInput) maxInput.value = 50000;

        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) sortSelect.value = 'featured';

        this.renderProducts();
    },

    // Get filtered products
    getFilteredProducts() {
        let products = ALS.getAllProducts();

        // Apply filters
        products = ALS.filterProducts(products, this.filters);

        return products;
    },

    // Render products
    renderProducts() {
        const grid = document.getElementById('productsGrid');
        if (!grid) return;

        const products = this.getFilteredProducts();

        if (products.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <div class="empty-state-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"/>
                            <path d="m21 21-4.35-4.35"/>
                        </svg>
                    </div>
                    <h3 class="empty-state-title">No Products Found</h3>
                    <p class="empty-state-text">Try adjusting your filters or search terms</p>
                    <button class="btn btn-primary" onclick="ShopPage.clearFilters()">Clear Filters</button>
                </div>
            `;
            this.updateResultsCount(0);
            return;
        }

        grid.innerHTML = products.map(product => ALS.renderProductCard(product)).join('');
        
        this.updateResultsCount(products.length);
    },

    // Update results count
    updateResultsCount(count) {
        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount) {
            resultsCount.textContent = count;
        }
    },

    // Render brands filter
    renderBrands() {
        const brandsContainer = document.getElementById('brandsFilter');
        if (!brandsContainer) return;

        const brands = [...new Set(ALS.getAllProducts().map(p => p.brand))];
        
        brandsContainer.innerHTML = brands.map(brand => `
            <div class="filter-option" data-brand="${brand}">
                <div class="filter-checkbox">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                </div>
                <span class="filter-label">${brand}</span>
                <span class="filter-count">(${ALS.getAllProducts().filter(p => p.brand === brand).length})</span>
            </div>
        `).join('');

        // Re-attach event listeners
        this.initFilters();
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('productsGrid')) {
        ShopPage.init();
    }
});

// Export to global scope
window.ShopPage = ShopPage;
