// Fetch cart items from localStorage for checkout page
function fetchCart() {
    // Retrieve the cart object from localStorage (or an empty object if none)
    const cart = JSON.parse(window.localStorage.getItem("cart")) || {};

    // Convert cart object into an array for easy iteration
    const cartArray = Object.values(cart);

    // Render the checkout items on the page
    renderCheckoutItems(cartArray);
}

// Render checkout items in the UI
function renderCheckoutItems(cart) {
    let checkoutItemsHTML = ''; // Store checkout items HTML
    let subtotal = 0; // Track total price

    // If cart is empty, display message
    if (cart.length === 0) {
        document.getElementById('checkoutCartItems').innerHTML = `
            <p>Your cart is empty. Please add items before checking out.</p>`;
        document.querySelector('.checkout-button').disabled = true;
        return;
    }

    // Loop through cart items
    cart.forEach(item => {
        checkoutItemsHTML += `
            <div class="checkout-item">
                <div class="product-details">
                    <!-- Display product image -->
                    <img src="${item.image}" alt="${item.name}" class="product-image" style="width: 100px; height: 100px;">
                    <div class="product-info">
                        <p class="item-name">${item.name}</p>
                        <p>Quantity: ${item.quantity}</p>
                    </div>
                </div>
                <p class="item-total">$${(item.price * item.quantity).toFixed(2)}</p>
            </div>`;

        // Calculate subtotal
        subtotal += item.price * item.quantity;
    });

    // Update the checkout page with items and total price
    document.getElementById('checkoutCartItems').innerHTML = checkoutItemsHTML;
    document.getElementById('totalPrice').textContent = `$${subtotal.toFixed(2)}`;
}

// Validate and confirm checkout
function confirmCheckout() {
    // Collect form values
    const email = document.getElementById('email').value.trim();
    const fullName = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const streetAddress = document.getElementById('streetAddress').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value.trim();
    const zipCode = document.getElementById('zipCode').value.trim();
    const paymentMethod = document.getElementById('paymentMethod').value;

    // Ensure all fields are filled
    if (!email || !fullName || !phone || !streetAddress || !city || !state || !zipCode || !paymentMethod) {
        alert("Please fill in all required fields.");
        return;
    }

    // Validate credit card details if payment is by credit card
    if (paymentMethod === 'creditCard') {
        const cardNumber = document.getElementById('cardNumber').value.trim();
        const expirationDate = document.getElementById('expirationDate').value.trim();
        const cvv = document.getElementById('cvv').value.trim();
        if (!cardNumber || !expirationDate || !cvv) {
            alert("Please enter your credit card details.");
            return;
        }
    }

    // Proceed with checkout
    alert("Checkout confirmed! Redirecting to confirmation page...");
    
    // Clear cart after checkout
    window.localStorage.removeItem("cart");

    // Redirect to confirmation page
    window.location.href = "confirmation-en.html";
}

// Load cart on page load
fetchCart();