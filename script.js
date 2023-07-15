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

// Updated Add to Cart Logic (Phase 6)
function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        // If it exists, just increase quantity
        existingItem.quantity++;
    } else {
        // If new, add it with quantity 1
        // We use { ...product } to create a copy so we don't mess up the original list
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartCount();
}

// 6. Save Logic
function saveCart() {
    localStorage.setItem('shopnest_cart', JSON.stringify(cart));
}
function updateCartCount() {
    // Calculate total quantity (e.g., 2 watches + 1 camera = 3 items)
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.innerText = totalCount;
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

function renderCartItems() {
    cartItemsList.innerHTML = "";
    let totalPrice = 0;
    let totalItems = 0; // To count total quantity for the badge

    if (cart.length === 0) {
        cartItemsList.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach(item => {
            // Calculate total price based on quantity
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;
            totalItems += item.quantity; // Sum up quantities

            const li = document.createElement('li');
            li.classList.add('cart-item');
            li.innerHTML = `
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)} x ${item.quantity} = <strong>$${itemTotal.toFixed(2)}</strong></p>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            `;
            cartItemsList.appendChild(li);
        });
    }

    // Update the Total Price in the modal
    cartTotalElement.innerText = totalPrice.toFixed(2);

    // Update the Cart Count Badge (Header) to show total ITEMS, not just rows
    // (Optional: Update the global counter here or in updateCartCount)
    // Let's make sure the badge reflects total quantity:
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.innerText = totalItems;
}
// Remove Item from Cart
function removeFromCart(productId) {
    // Filter out the item with the matching ID
    cart = cart.filter(item => item.id !== productId);

    saveCart();
    updateCartCount();
    renderCartItems(); // Re-render the modal to show the item is gone
}
/* --- Phase 7: Checkout Logic --- */

const checkoutSection = document.getElementById('checkout-section');
const productsSection = document.getElementById('products');
const checkoutTotalElement = document.getElementById('checkout-total');

// Function called when clicking "Checkout" in the Modal
function goToCheckout() {
    // 1. Close the modal
    modal.style.display = 'none';

    // 2. Hide Products, Show Checkout
    productsSection.style.display = 'none';
    checkoutSection.style.display = 'block';

    // 3. Update total in the form
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    checkoutTotalElement.innerText = total.toFixed(2);
}

// Function to go back to shop
function returnToShop() {
    checkoutSection.style.display = 'none';
    productsSection.style.display = 'block'; // Or 'grid' depending on your layout, usually block works for containers
}