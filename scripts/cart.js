
// Función asíncrona para obtener datos del carrito desde un archivo JSON
async function fetchCartData() {
    const response = await fetch('assets/Data/platos.json');
    const cartData = await response.json();

    // Maneja el caso de carrito vacío
    if (cartData.length === 0) {
        document.getElementById('cartItems').innerHTML = `
            <p>Your cart is empty. Add some items to proceed!</p>`;
        document.querySelector('.checkout-button').disabled = true; // Desactiva el botón de checkout
        return;
    }

    renderCartItems(cartData);
}

// Función para renderizar los items del carrito en la página
function renderCartItems(cartData) {
    let cartItemsHTML = '';
    let total = 0;

    // Genera HTML para cada item y calcula el total
    cartData.forEach(item => {
        cartItemsHTML += `
            <div class="cart-item">
                <span class="item-name">${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
                <span>x ${item.quantity}</span>
            </div>`;
        total += item.price * item.quantity;
    });

    // Actualiza el DOM con los items y el precio total
    document.getElementById('cartItems').innerHTML = cartItemsHTML;
    document.getElementById('totalPrice').textContent = total.toFixed(2);
}

// Función asíncrona para proceder al checkout
async function goToCheckout() {
    const response = await fetch('assets/Data/platos.json');
    const cartData = await response.json();

    // Previene el checkout si el carrito está vacío
    if (cartData.length === 0) {
        alert("Your cart is empty. Please add items before proceeding to checkout.");
        return;
    }

    // Guarda los datos del carrito en localStorage y redirige a la página de checkout
    localStorage.setItem('cartData', JSON.stringify(cartData));
    alert("Proceeding to checkout...");
    window.location.href = 'checkout.html';
}

// Carga automáticamente los datos del carrito al cargar la página
fetchCartData();