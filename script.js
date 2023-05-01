// 1. Product Data
const products = [
    { id: 1, name: "Minimalist Watch", price: 120.00, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=60" },
    { id: 2, name: "Wireless Headphones", price: 85.50, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=60" },
    { id: 3, name: "Polaroid Camera", price: 250.00, image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=500&q=60" },
    { id: 4, name: "Classic Sunglasses", price: 45.00, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=500&q=60" }
];

// 2. Load Cart from Local Storage (or empty array)
let cart = JSON.parse(localStorage.getItem('shopnest_cart')) || [];

// 3. Select DOM Elements
const productList = document.getElementById('product-list');
const cartCountElement = document.getElementById('cart-count');

// 4. Render Products
function displayProducts() {
    productList.innerHTML = "";
    products.forEach(product => {
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
        productList.innerHTML += productCard;
    });
}

// 5. Add to Cart Logic
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);

    saveCart();       // Save to storage
    updateCartCount(); // Update UI
}

// 6. Save Logic
function saveCart() {
    localStorage.setItem('shopnest_cart', JSON.stringify(cart));
}

// 7. Update Cart Count UI
function updateCartCount() {
    cartCountElement.innerText = cart.length;
}

// Initialize
displayProducts();
updateCartCount();
/* --- Phase 5: Modal Logic --- */

const modal = document.getElementById('cart-modal');
const cartBtn = document.getElementById('cart-btn');
const closeBtn = document.querySelector('.close-btn');
const cartItemsList = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

// Open Modal
cartBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Stop page from jumping to top
    renderCartItems(); // Update UI before showing
    modal.style.display = 'block';
});

// Close Modal (X button)
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close Modal (Click outside box)
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Render Cart Items inside Modal
function renderCartItems() {
    cartItemsList.innerHTML = ""; // Clear current list
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsList.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach(item => {
            totalPrice += item.price;

            const li = document.createElement('li');
            li.classList.add('cart-item');
            li.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
            `;
            cartItemsList.appendChild(li);
        });
    }

    // Update Total Price
    cartTotalElement.innerText = totalPrice.toFixed(2);
}