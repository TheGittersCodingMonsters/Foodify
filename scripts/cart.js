// Fetch cart items from localStorage
function fetchCart() {
    // Get cart from localStorage (stored as an object)
    const cart = JSON.parse(window.localStorage.getItem("cart")) || {};

    // Convert object to an array for easier iteration
    const cartArray = Object.values(cart);

    // Render the cart items on the page
    renderCartItems(cartArray);
}

// Render cart items in the UI
function renderCartItems(cart) {
    let cartItemsHTML = ''; // Store cart item HTML
    let total = 0; // Total price calculation

    // If the cart is empty, show a message and disable checkout
    if (cart.length === 0) {
        document.getElementById('cartItems').innerHTML = `
            <p>Your cart is empty. Add some items to proceed!</p>`;
        document.querySelector('.checkout-button').disabled = true;
        return;
    }

    // Loop through cart items
    cart.forEach(item => {
        cartItemsHTML += `
            <div class="cart-item">
                <span class="item-name">${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
                <span>x ${item.quantity}</span>
            </div>`;
        total += item.price * item.quantity;
    });

    // Insert items into the page
    document.getElementById('cartItems').innerHTML = cartItemsHTML;
    
    // Show total price
    document.getElementById('totalPrice').textContent = total.toFixed(2);
}

// Redirect to checkout page
function goToCheckout() {
    const cart = JSON.parse(window.localStorage.getItem("cart")) || {};

    if (Object.keys(cart).length === 0) {
        alert("Your cart is empty. Please add items before proceeding to checkout.");
        return;
    }

    window.location.href = "checkout-en.html";
}

// Load cart when page opens
fetchCart();