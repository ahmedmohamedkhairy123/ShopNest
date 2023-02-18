// 1. Product Data (Mock Database)
const products = [
    {
        id: 1,
        name: "Minimalist Watch",
        price: 120.00,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 2,
        name: "Wireless Headphones",
        price: 85.50,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 3,
        name: "Polaroid Camera",
        price: 250.00,
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 4,
        name: "Classic Sunglasses",
        price: 45.00,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=500&q=60"
    }
];

// 2. Function to Render Products
const productList = document.getElementById('product-list');

function displayProducts() {
    // Clear existing content (optional here, but good practice)
    productList.innerHTML = "";

    // Loop through the products array
    products.forEach(product => {
        // Create the card HTML
        const productCard = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;

        // Add card to the grid container
        productList.innerHTML += productCard;
    });
}

// 3. Placeholder function for Phase 3
function addToCart(id) {
    console.log("Added product with ID:", id);
    alert("Phase 3: Logic to add Item " + id + " to cart coming next!");
}

// Initialize the app
displayProducts();