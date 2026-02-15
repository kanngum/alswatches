/* ============================================
   AUTHENTIC LUXURY SHOP (ALS) - DATA
   ============================================ */

// Product Data
const products = [
    {
        id: 1,
        name: "Royal Chronograph",
        brand: "ROLEX",
        model: "Submariner Date",
        price: 12500,
        currency: "USD",
        images: [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
            "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600",
            "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600"
        ],
        description: "The Rolex Submariner Date is the ultimate diver's watch, featuring a water resistance of 300 meters, a unidirectional rotatable bezel, and the iconic Oyster Perpetual movement. This timepiece represents the pinnacle of Swiss watchmaking excellence.",
        specifications: {
            case: "41mm Oystersteel",
            movement: "Perpetual Calibre 3235",
            waterResistance: "300 meters",
            crystal: "Sapphire",
            bracelet: "Oyster",
            powerReserve: "70 hours"
        },
        stock: 5,
        warranty: "5 Years International Warranty",
        authenticityCertificate: "Included",
        rating: 4.9,
        reviews: 128,
        featured: true,
        newArrival: false,
        onSale: false
    },
    {
        id: 2,
        name: "Nautilus Automatic",
        brand: "PATEK PHILIPPE",
        model: "Nautilus 5711",
        price: 35000,
        currency: "USD",
        images: [
            "https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=600",
            "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=600",
            "https://images.unsplash.com/photo-1526045431048-f857369baa09?w=600"
        ],
        description: "The Patek Philippe Nautilus is an icon of luxury sports watches. With its distinctive porthole-shaped case and integrated bracelet, this timepiece is a symbol of understated elegance and exceptional craftsmanship.",
        specifications: {
            case: "40mm Stainless Steel",
            movement: "Automatic Calibre 26-330 S C",
            waterResistance: "120 meters",
            crystal: "Sapphire",
            bracelet: "Integrated Steel",
            powerReserve: "45 hours"
        },
        stock: 2,
        warranty: "5 Years International Warranty",
        authenticityCertificate: "Included",
        rating: 5.0,
        reviews: 89,
        featured: true,
        newArrival: true,
        onSale: false
    },
    {
        id: 3,
        name: "Speedmaster Moonwatch",
        brand: "OMEGA",
        model: "Speedmaster Professional",
        price: 7350,
        currency: "USD",
        images: [
            "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=600",
            "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=600",
            "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=600"
        ],
        description: "The Omega Speedmaster Professional is the iconic Moonwatch, worn by astronauts on all six lunar missions. This manual-winding chronograph represents the perfect blend of heritage and precision.",
        specifications: {
            case: "42mm Stainless Steel",
            movement: "Manual Calibre 1861",
            waterResistance: "50 meters",
            crystal: "Hesalite",
            bracelet: "Steel",
            powerReserve: "48 hours"
        },
        stock: 12,
        warranty: "5 Years International Warranty",
        authenticityCertificate: "Included",
        rating: 4.8,
        reviews: 256,
        featured: true,
        newArrival: false,
        onSale: false
    },
    {
        id: 4,
        name: "Royal Oak Offshore",
        brand: "AUDEMARS PIGUET",
        model: "Royal Oak Offshore",
        price: 28500,
        currency: "USD",
        images: [
            "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600",
            "https://images.unsplash.com/photo-1606744824163-985d376605aa?w=600",
            "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=600"
        ],
        description: "The Audemars Piguet Royal Oak Offshore is a bold sports watch with an octagonal bezel secured by hexagonal screws. This timepiece combines robust construction with sophisticated finishing.",
        specifications: {
            case: "43mm Stainless Steel",
            movement: "Automatic Calibre 4302",
            waterResistance: "100 meters",
            crystal: "Sapphire",
            bracelet: "Integrated Rubber",
            powerReserve: "70 hours"
        },
        stock: 4,
        warranty: "5 Years International Warranty",
        authenticityCertificate: "Included",
        rating: 4.7,
        reviews: 67,
        featured: true,
        newArrival: false,
        onSale: false
    },
    {
        id: 5,
        name: "Datejust 36",
        brand: "ROLEX",
        model: "Datejust 36",
        price: 9200,
        currency: "USD",
        images: [
            "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600",
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
            "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600"
        ],
        description: "The Rolex Datejust 36 is the classic Oyster Perpetual watch, featuring the iconic Datejust window at 3 o'clock. This timeless timepiece represents the essence of Rolex excellence.",
        specifications: {
            case: "36mm Oystersteel",
            movement: "Perpetual Calibre 3235",
            waterResistance: "100 meters",
            crystal: "Sapphire",
            bracelet: "Jubilee",
            powerReserve: "70 hours"
        },
        stock: 8,
        warranty: "5 Years International Warranty",
        authenticityCertificate: "Included",
        rating: 4.9,
        reviews: 312,
        featured: false,
        newArrival: false,
        onSale: true
    },
    {
        id: 6,
        name: "Tank Française",
        brand: "CARTIER",
        model: "Tank Française",
        price: 4750,
        currency: "USD",
        images: [
            "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600",
            "https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=600",
            "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=600"
        ],
        description: "The Cartier Tank Française reinterprets the iconic Tank design with a more integrated bracelet and rounded case. This elegant timepiece is a symbol of timeless sophistication.",
        specifications: {
            case: "36.7mm x 30.5mm Steel",
            movement: "Automatic 1853",
            waterResistance: "30 meters",
            crystal: "Sapphire",
            bracelet: "Integrated Steel",
            powerReserve: "40 hours"
        },
        stock: 6,
        warranty: "2 Years International Warranty",
        authenticityCertificate: "Included",
        rating: 4.6,
        reviews: 145,
        featured: false,
        newArrival: true,
        onSale: false
    },
    {
        id: 7,
        name: "Portugieser Chronograph",
        brand: "IWC",
        model: "Portugieser Chronograph",
        price: 8950,
        currency: "USD",
        images: [
            "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=600",
            "https://images.unsplash.com/photo-1606744824163-985d376605aa?w=600",
            "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600"
        ],
        description: "The IWC Portugieser Chronograph features the classic Portugieser design with clean dial, leaf-shaped hands, and Arabic numerals. This elegant chronograph embodies timeless style.",
        specifications: {
            case: "41mm Stainless Steel",
            movement: "Automatic Calibre 69355",
            waterResistance: "30 meters",
            crystal: "Sapphire",
            bracelet: "Alligator Leather",
            powerReserve: "46 hours"
        },
        stock: 7,
        warranty: "2 Years International Warranty",
        authenticityCertificate: "Included",
        rating: 4.7,
        reviews: 98,
        featured: false,
        newArrival: false,
        onSale: false
    },
    {
        id: 8,
        name: "Big Bang Unico",
        brand: "HUBLOT",
        model: "Big Bang Unico",
        price: 15900,
        currency: "USD",
        images: [
            "https://images.unsplash.com/photo-1609587312208-cea54be969e7?w=600",
            "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=600",
            "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=600"
        ],
        description: "The Hublot Big Bang Unico is a masterpiece of contemporary watchmaking, featuring the in-house Unico chronograph movement visible through the dial. This timepiece represents innovation and bold design.",
        specifications: {
            case: "42mm Titanium",
            movement: "Automatic Calibre HUB1280",
            waterResistance: "100 meters",
            crystal: "Sapphire",
            bracelet: "Rubber & Titanium",
            powerReserve: "72 hours"
        },
        stock: 3,
        warranty: "5 Years International Warranty",
        authenticityCertificate: "Included",
        rating: 4.8,
        reviews: 76,
        featured: true,
        newArrival: false,
        onSale: false
    },
    {
        id: 9,
        name: "Overseas Dual Time",
        brand: "VACHERON CONSTANTIN",
        model: "Overseas Dual Time",
        price: 22500,
        currency: "USD",
        images: [
            "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600",
            "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=600",
            "https://images.unsplash.com/photo-1526045431048-f857369baa09?w=600"
        ],
        description: "The Vacheron Constantin Overseas Dual Time is an elegant travel watch featuring a second time zone complication. The iconic Maltese cross bezel and interchangeable bracelets make it a versatile luxury timepiece.",
        specifications: {
            case: "41mm Stainless Steel",
            movement: "Automatic Calibre 5110 DT",
            waterResistance: "150 meters",
            crystal: "Sapphire",
            bracelet: "Interchangeable Steel/Leather",
            powerReserve: "60 hours"
        },
        stock: 2,
        warranty: "5 Years International Warranty",
        authenticityCertificate: "Included",
        rating: 4.9,
        reviews: 54,
        featured: true,
        newArrival: true,
        onSale: false
    },
    {
        id: 10,
        name: "Reverso Classic",
        brand: "JAEGER-LECOULTRE",
        model: "Reverso Classic",
        price: 8100,
        currency: "USD",
        images: [
            "https://images.unsplash.com/photo-1526045431048-f857369baa09?w=600",
            "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600",
            "https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=600"
        ],
        description: "The Jaeger-LeCoultre Reverso Classic is an iconic Art Deco design with a reversible case. This legendary timepiece has been a symbol of elegance since 1931.",
        specifications: {
            case: "45.6 x 27.4mm Steel",
            movement: "Manual Calibre 822/2",
            waterResistance: "30 meters",
            crystal: "Sapphire",
            bracelet: "Leather",
            powerReserve: "42 hours"
        },
        stock: 5,
        warranty: "2 Years International Warranty",
        authenticityCertificate: "Included",
        rating: 4.8,
        reviews: 189,
        featured: false,
        newArrival: false,
        onSale: false
    },
    {
        id: 11,
        name: "Santos de Cartier",
        brand: "CARTIER",
        model: "Santos de Cartier",
        price: 7650,
        currency: "USD",
        images: [
            "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=600",
            "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600",
            "https://images.unsplash.com/photo-1526045431048-f857369baa09?w=600"
        ],
        description: "The Cartier Santos de Cartier was the first modern wristwatch, created for aviator Alberto Santos-Dumont in 1904. This legendary timepiece combines elegance with practicality.",
        specifications: {
            case: "39.8mm Stainless Steel",
            movement: "Automatic 1847 MC",
            waterResistance: "100 meters",
            crystal: "Sapphire",
            bracelet: "Integrated Steel",
            powerReserve: "42 hours"
        },
        stock: 9,
        warranty: "2 Years International Warranty",
        authenticityCertificate: "Included",
        rating: 4.7,
        reviews: 234,
        featured: false,
        newArrival: false,
        onSale: true
    },
    {
        id: 12,
        name: "El Primero",
        brand: "ZENITH",
        model: "Chronomaster El Primero",
        price: 8900,
        currency: "USD",
        images: [
            "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=600",
            "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=600",
            "https://images.unsplash.com/photo-1606744824163-985d376605aa?w=600"
        ],
        description: "The Zenith El Primero is the world's first automatic chronograph movement, operating at 36,000 VpH. This legendary movement delivers precision to 1/10th of a second.",
        specifications: {
            case: "42mm Stainless Steel",
            movement: "Automatic El Primero 400",
            waterResistance: "100 meters",
            crystal: "Sapphire",
            bracelet: "Steel",
            powerReserve: "50 hours"
        },
        stock: 4,
        warranty: "2 Years International Warranty",
        authenticityCertificate: "Included",
        rating: 4.6,
        reviews: 87,
        featured: false,
        newArrival: false,
        onSale: false
    }
];

// Brands data
const brands = [
    { id: 1, name: "ROLEX", logo: "rolex-logo.png" },
    { id: 2, name: "PATEK PHILIPPE", logo: "patek-logo.png" },
    { id: 3, name: "OMEGA", logo: "omega-logo.png" },
    { id: 4, name: "AUDEMARS PIGUET", logo: "ap-logo.png" },
    { id: 5, name: "CARTIER", logo: "cartier-logo.png" },
    { id: 6, name: "IWC", logo: "iwc-logo.png" },
    { id: 7, name: "HUBLOT", logo: "hublot-logo.png" },
    { id: 8, name: "VACHERON CONSTANTIN", logo: "vc-logo.png" },
    { id: 9, name: "JAEGER-LECOULTRE", logo: "jl-logo.png" },
    { id: 10, name: "ZENITH", logo: "zenith-logo.png" }
];

// Default users (for demo)
const defaultUsers = [
    {
        id: 1,
        name: "Admin User",
        email: "admin@als.com",
        password: "admin123",
        role: "admin",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
        createdAt: "2024-01-01"
    },
    {
        id: 2,
        name: "John Doe",
        email: "john@example.com",
        password: "user123",
        role: "user",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        createdAt: "2024-06-15"
    }
];

// Initialize localStorage with default data
function initializeData() {
    // Initialize products in localStorage if not exists
    if (!localStorage.getItem('als_products')) {
        localStorage.setItem('als_products', JSON.stringify(products));
    }
    
    // Initialize users in localStorage if not exists
    if (!localStorage.getItem('als_users')) {
        localStorage.setItem('als_users', JSON.stringify(defaultUsers));
    }
    
    // Initialize orders in localStorage if not exists
    if (!localStorage.getItem('als_orders')) {
        localStorage.setItem('als_orders', JSON.stringify([]));
    }
    
    // Initialize cart in localStorage if not exists
    if (!localStorage.getItem('als_cart')) {
        localStorage.setItem('als_cart', JSON.stringify([]));
    }
}

// Get products from localStorage
function getProducts() {
    return JSON.parse(localStorage.getItem('als_products')) || products;
}

// Get users from localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem('als_users')) || defaultUsers;
}

// Get orders from localStorage
function getOrders() {
    return JSON.parse(localStorage.getItem('als_orders')) || [];
}

// Save products to localStorage
function saveProducts(productsData) {
    localStorage.setItem('als_products', JSON.stringify(productsData));
}

// Save users to localStorage
function saveUsers(usersData) {
    localStorage.setItem('als_users', JSON.stringify(usersData));
}

// Save orders to localStorage
function saveOrders(ordersData) {
    localStorage.setItem('als_orders', JSON.stringify(ordersData));
}

// Export functions
window.ALSData = {
    products,
    brands,
    defaultUsers,
    initializeData,
    getProducts,
    getUsers,
    getOrders,
    saveProducts,
    saveUsers,
    saveOrders
};
