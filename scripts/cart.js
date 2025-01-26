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
                <div class="cart-img">
                    <img src="${item.image}" alt="${item.name}" class="img-plato">
                </div>                
                <div class="cart-elements">
                    <span class="titulo">${item.name}</span>
                    <span class="precio">${item.price.toFixed(2)} €</span>
                    <div class="product-counter" data-id="${item.id}">
                    <button class="counter-btn decrement"><i class="fa-solid fa-minus"></i></button>
                     <span class="counter-value">x ${item.quantity}</span>
                    <button class="counter-btn increment"><i class="fa-solid fa-plus"></i></button>
                </div>
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
        window.location.href = "../EN/checkout-en.html";
} else {
        window.location.href = "../ES/checkout-es.html";
}
}

// Load cart when page opens
fetchCart();