// Cart functionality
let cart = [];
let cartPanel = null;
let cartItemsContainer = null;
let cartTotal = null;
let notification = null;
let cartCount = null;
let isSubmitting = false; // Add flag to prevent double submission

// Initialize cart
function initCart() {
    // Initialize cart elements
    cartPanel = document.querySelector('.cart-panel');
    cartItemsContainer = document.querySelector('.cart-items');
    cartTotal = document.querySelector('.total-amount');
    notification = document.querySelector('.notification');
    cartCount = document.querySelector('.cart-count');

    // Load cart from localStorage
    loadCart();

    // Add event listeners
    document.querySelector('.close-cart').addEventListener('click', toggleCart);
    document.querySelector('.submit-order').addEventListener('click', submitOrder);

    // Initialize add to cart buttons
    initializeAddToCartButtons();
}

// Initialize add to cart buttons
function initializeAddToCartButtons() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const menuItem = e.target.closest('.menu-item');
            if (menuItem) {
                const name = menuItem.querySelector('.item-name').textContent;
                const price = parseFloat(menuItem.querySelector('.item-price').textContent.replace('€', ''));
                const image = menuItem.querySelector('.item-image').src;
                addToCart({ name, price, image });
            }
            // Visual feedback: turn button green for 1 second
            const btn = e.target;
            btn.classList.add('clicked-green');
            setTimeout(() => {
                btn.classList.remove('clicked-green');
            }, 1000);
        });
    });
}

// Add item to cart
function addToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.name === item.name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }

    updateCart();
    showNotification(`${item.name} added to cart`);
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Update item quantity
function updateQuantity(index, change) {
    const item = cart[index];
    item.quantity = Math.max(0, item.quantity + change);
    
    if (item.quantity === 0) {
        removeFromCart(index);
    } else {
        updateCart();
    }
}

// Update cart display
function updateCart() {
    // Update cart items
    cartItemsContainer.innerHTML = cart.length ? cart.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-details">
                <span class="cart-item-name" title="${item.name}">${item.name}</span>
                <span class="cart-item-price">€${(item.price * item.quantity).toFixed(2)}</span>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                <span class="cart-item-quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                <button class="remove-btn" onclick="removeFromCart(${index})">&times;</button>
            </div>
        </div>
    `).join('') : '<div class="empty-cart-message">Your cart is empty</div>';

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `€${total.toFixed(2)}`;

    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Save cart to localStorage
    saveCart();
}

// Toggle cart panel
function toggleCart() {
    cartPanel.classList.toggle('open');
}

// Show notification
function showNotification(message, type = 'success') {
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 1500);
}

// Save cart to localStorage
function saveCart() {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Error saving cart:', error);
        showNotification('Error saving cart', 'error');
    }
}

// Load cart from localStorage
function loadCart() {
    try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCart();
        }
    } catch (error) {
        console.error('Error loading cart:', error);
        showNotification('Error loading cart', 'error');
    }
}

// Submit order
async function submitOrder() {
    if (isSubmitting) {
        showNotification('Please wait, order is being processed...', 'info');
        return;
    }

    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }

    try {
        isSubmitting = true;
        const submitButton = document.querySelector('.submit-order');
        submitButton.disabled = true;
        submitButton.textContent = 'Processing...';

        // Create order object
        const order = {
            id: Date.now(), // Unique order ID
            items: cart,
            total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            status: 'pending',
            timestamp: new Date().toISOString(),
            tableNumber: getTableNumber()
        };

        // Save order to localStorage
        saveOrderToDashboard(order);

        // Clear cart and show success message
        cart = [];
        updateCart();
        cartPanel.classList.remove('open');
        showNotification('Order placed successfully!', 'success');

    } catch (error) {
        console.error('Error submitting order:', error);
        showNotification('Error placing order. Please try again.', 'error');
    } finally {
        isSubmitting = false;
        const submitButton = document.querySelector('.submit-order');
        submitButton.disabled = false;
        submitButton.textContent = 'Place Order';
    }
}

// Get table number from URL or localStorage
function getTableNumber() {
    try {
        // Try to get table number from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const tableNumber = urlParams.get('table');
        
        if (tableNumber) {
            localStorage.setItem('tableNumber', tableNumber);
            return tableNumber;
        }
        
        // If not in URL, try to get from localStorage
        return localStorage.getItem('tableNumber') || 'Unknown';
    } catch (error) {
        console.error('Error getting table number:', error);
        return 'Unknown';
    }
}

// Save order to dashboard
function saveOrderToDashboard(order) {
    try {
        // Get existing orders from localStorage
        let orders = JSON.parse(localStorage.getItem('restaurantOrders')) || [];
        
        // Add new order
        orders.push(order);
        
        // Save back to localStorage
        localStorage.setItem('restaurantOrders', JSON.stringify(orders));
    } catch (error) {
        console.error('Error saving order to dashboard:', error);
        throw new Error('Failed to save order');
    }
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', initCart);

// Make functions available globally
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.toggleCart = toggleCart;
