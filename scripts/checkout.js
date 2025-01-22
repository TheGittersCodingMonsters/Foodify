// Consigue los items del carrito desde el browser storage
    function fetchCartData() {

        // Obtiene los datos los items del carrito desde el localStorage
        const cartData = JSON.parse(localStorage.getItem('cartData')) || [];

        // Muestra los items del carrito importados desde el localStorage en la pagina
        renderCheckoutItem('cartData')
    }

   // Crear un HTML para mostrar los items del carrito
    function renderCheckoutItems(cartData) {
        let checkoutItemsHTML = ''; // Guarda el HTML para los items del carrito
        let subtotal = 0; // Precio total de la calculacion

        // Loop de cada item en el carrito
        cartData.forEach(item => {
            // Genera el HTML de cada item del carrito
            checkoutItemsHTML += `
                <div class="checkout-item">
                    <div class="product-details">
                        <img src="${item.image}" alt="${item.name}" class="product-image">
                        <div class="product-info">
                            <p class="item-name">${item.name}</p>
                            <p>Price: $${item.price.toFixed(2)}</p>
                            <p>Quantity: ${item.quantity}</p>
                        </div>
                    </div>
                    <p class="item-total">$${(item.price * item.quantity).toFixed(2)}</p>
                </div>`;
            
            // Calcula el subtotal
            subtotal += item.price * item.quantity;
        });

        // Actualiza la pagina con los items del carrito y el total
        document.getElementById('checkoutCartItems').innerHTML = checkoutItemsHTML;
        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('totalPrice').textContent = `$${subtotal.toFixed(2)}`;
    }

    // Validar el proceso del checkout
    function confirmCheckout() {
        // Colecta los valores del input
        const email = document.getElementById('email').value.trim();
        const fullName = document.getElementById('fullName').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const streetAddress = document.getElementById('streetAddress').value.trim();
        const city = document.getElementById('Cuidad').value.trim();
        const state = document.getElementById('state').value.trim();
        const zipCode = document.getElementById('zipCode').value.trim();
        const paymentMethod = document.getElementById('paymentMethod').value;

        // Valida que todos los campos completos
        if (!email || !fullName || !phone || !streetAddress || !city || !state || !zipCode || !paymentMethod) {
            alert("Please fill in all required fields.");
            return;
        }

        // Validacion adicional para las tarjetas de credit
        if (paymentMethod === 'creditCard') {
            const cardNumber = document.getElementById('cardNumber').value.trim();
            const expirationDate = document.getElementById('expirationDate').value.trim();
            const cvv = document.getElementById('cvv').value.trim();
            if (!cardNumber || !expirationDate || !cvv) {
                alert("Please fill in credit card details.");
                return;
            }
        }

        // Procede la confirmacion y se va a la pagina de confirmacion
        alert("Checkout confirmed! Proceeding to payment...");
        window.location.href = "confirmation.html";
    }

    // Load cart data when page opens
    fetchCartData();
