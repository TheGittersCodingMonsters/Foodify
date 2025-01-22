// Consigue los items del carrito desde el browser storage
function fetchCartData() {
    // Obtiene los datos del carrito desde el almacenamiento local, o usa un array vacio si no hay datos
    const cartData = JSON.parse(window.localStorage.getItem('cartData')) || [];
    
    // Muestra los items del carrito importados desde el localStorage en la pagina
    renderCartItems(cartData);
}

// Crear un HTML para mostrar los items del carrito
function renderCartItems(cartData) {
    let cartItemsHTML = ''; // Guarda el HTML para los items del carrito
    let total = 0; // Calculara el precio total

    // Si el carrito esta vacio, mostrara un mensaje y disabiltara el checkout
    if (cartData.length === 0) {
        document.getElementById('cartItems').innerHTML = `
            <p>Your cart is empty. Add some items to proceed!</p>`;
        document.querySelector('.checkout-button').disabled = true;
        return;
    }

    // Loop para cada de los items en el carrito
    cartData.forEach(item => {
        // Crear un HTML por cada item del carrito
        // Create HTML for each cart item
        cartItemsHTML += `
            <div class="cart-item">
                <span class="item-name">${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
                <span>x ${item.quantity}</span>
            </div>`;
        // Calcula el precio total
        total += item.price * item.quantity;
    });

    // Meter los items en la pagina
    document.getElementById('cartItems').innerHTML = cartItemsHTML;
    
    // Mostrar el precio total
    document.getElementById('totalPrice').textContent = total.toFixed(2);
}

// Mover a la pagina del checkout
function goToCheckout() {
    // Consigue los datos del carrito desde el storage
    const cartData = JSON.parse(window.localStorage.getItem('cartData')) || [];
    
    // Comprueba si el carrito tiene items
    if (cartData.length === 0) {
        alert("Your cart is empty. Please add items before proceeding to checkout.");
        return;
    }

    // Ir a la pagina del checkout
    window.location.href = 'checkout.html';
}

// Carga los items del carrito cuando se abre la pagina
fetchCartData();
