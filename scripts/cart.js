// Fetch cart items from localStorage
function fetchCart() {
    // Get cart from localStorage (stored as an object)
    const cart = JSON.parse(window.localStorage.getItem("cart")) || {};

    // Convert object to an array for easier iteration
    const cartArray = Object.values(cart);

    // Render the cart items on the page
    renderCartItems(cartArray);
}

// Render cart items in the website
function renderCartItems(cart) {
    let cartItemsHTML = ''; // Store cart item HTML
    let total = 0; // Total price calculation

    // If the cart is empty, show a message and disable checkout
    if (cart.length === 0) {
        document.querySelector('.cartItems').innerHTML = `
            <p>Your cart is empty. Add some items to proceed!</p>`;
        document.querySelector('.checkout-button').addEventListener('click', function () {
            window.location.href = "../../catalogo.html";
        });
        return;
    }

    // Loop through cart items
    cart.forEach(item => {
        cartItemsHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="item-img">                
                <div class="cart-elements">
                    <span class="item-name">${item.name}</span>
                    <span class="item-price">$${item.price.toFixed(2)}</span>
                    <span class="item-quantity">x ${item.quantity}</span>
                </div>
            </div>`;
        total += item.price * item.quantity;
    });

    // Insert items into the page
    document.querySelector('.cartItems').innerHTML = cartItemsHTML;
    
    // Show total price
    document.getElementById('totalPrice').textContent = total.toFixed(2);
}

// Redirect to checkout page
function goToCheckout() {
    const cart = JSON.parse(window.localStorage.getItem("cart")) || {};

if (location.href.indexOf("cart-en.html") !== -1) {
        window.location.href = "checkout-en.html";
} else {
        window.location.href = "checkout-es.html";
}
}

// Load cart when page opens
fetchCart();