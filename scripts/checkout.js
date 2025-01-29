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
    let total = 0; // Track total price

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
                    <img src="${item.foto}" alt="${item.nombre}" class="product-image" style="width: 80px; height: 80px; border-radius: 10px; border: solid 3px white;">
                    <div class="product-info">
                        <p class="item-name">${item.precio}</p>
                        <p>Quantity: ${item.quantity}</p>
                    </div>
                </div>
                <p class="item-total">$${(item.precio * item.quantity).toFixed(2)}</p>
            </div>`;

        // Calculate total
        total += item.precio * item.quantity;
    });

    // Update the checkout page with items and total price
    document.getElementById('checkoutCartItems').innerHTML = checkoutItemsHTML;
    // Change the currency and it is between Dollar and Euro
    if (location.href.indexOf("checkout-en.html") !== -1) {
        document.getElementById('totalPrice').textContent = `$${total.toFixed(2)}`;
    } else {
        document.getElementById('totalPrice').textContent = `€${total.toFixed(2)}`;
    }
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
    // Now for payment method
    const paymentMethod = document.getElementById('paymentMethod').value;
    const cardNumber = document.getElementById('cardNumber').value.trim();
    const expirationDate = document.getElementById('expirationDate').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    // Ensure all fields are filled
    if (!email || !fullName || !phone || !streetAddress || !city || !state || !zipCode || !paymentMethod || !cardNumber || !expirationDate || !cvv) {
        if (location.href.indexOf("checkout-en.html") !== -1) {
            alert("Please fill in all required fields");
        } else {
            alert("Por favor, rellene los campos obligatorios");
        } return;
    } 

    // Proceed with checkout if the information is filled
    if(location.href.indexOf("checkout-en.html") !== -1) {
        alert("Checkout confirmed! Redirecting to confirmation page...");
    } else {
        alert("Checkout confirmado! Redirigiendo a la pagina de confirmacion...");
    }
    

    // Clear cart after checkout
    window.localStorage.removeItem("cart");

    // Redirect to confirmation page
    if (location.href.indexOf("checkout-en.html") !== -1) {
        window.location.href = "confirmation-en.html";
    } else {
        window.location.href = "confirmation-es.html";
    }
}

// Load cart on page load
fetchCart();