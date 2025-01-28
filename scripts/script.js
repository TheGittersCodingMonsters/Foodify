// Eventos Click de menu y carrito
  const menuButton = document.querySelector(".menu-mobile");
  const menu = document.querySelector(".menu");
  const cartButton = document.querySelector(".cart");
  const cartOverlay = document.querySelector(".cart-overlay");
  const cartModal = document.querySelector(".cart-modal");


// Eventos
cartButton.addEventListener("click", toggleCart); // Mostrar/ocultar el carrito al hacer clic
cartOverlay.addEventListener("click", toggleCart); // Cerrar el carrito al hacer clic en el overlay
menuButton.addEventListener("click", showMenu); // Mostrar/ocultar el menu al hacer clic


// Función para mostrar/ocultar el carrito
function toggleCart() {
  cartOverlay.classList.toggle("clicked"); // Alterna la visibilidad de la superposición
  cartModal.classList.toggle("clicked"); // Alterna la visibilidad del modal
}

// Funcion para mostrar/ocultar el Menu
function showMenu(){
menu.classList.toggle("clicked");
};

// Asegúrate de que en pantallas grandes no se añade la clase `clicked`.
window.addEventListener('resize', () => {
  if (window.innerWidth >= 1024) {
      menu.classList.remove('clicked');
  }
});

// Redirect to checkout page
function goToCheckout() {
    const cart = JSON.parse(window.localStorage.getItem("cart")) || {};
  
  if (location.href.indexOf("cart-en.html") !== -1) {
        window.location.href = "../EN/checkout-en.html";
  } else {
        window.location.href = "../ES/checkout-es.html";
  }
  }
  

//------------------ CARRITO MODAL -------------------------------//
function renderCart() {
    const cart = getCart();
    const cartModal = document.querySelector(".cart-modal");
    const cartItemsContainer = cartModal.querySelector(".cartItems");
    let total = 0;

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>El carrito está vacío.</p>";
        const totalElement = document.querySelector(".total");
        if (totalElement) {
            totalElement.textContent = `Total: 0.00 €`; // Forzar 0.00 €
        }
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <div class="cart-img">
                <img src="${item.foto}" alt="${item.nombre}" class="img-plato">
            </div>
            <div class="cart-elements">
                <span class="titulo">${item.nombre}</span>
                <span class="precio">${item.precio.toFixed(2)} €</span>
                <div class="product-counter" data-id="${item.id}">
                    <button class="counter-btn-cart decrement-cart"><i class="fa-solid fa-minus"></i></button>
                    <span class="counter-value">${item.quantity}</span>
                    <button class="counter-btn-cart increment-cart"><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>
        `;

        total += item.precio * item.quantity;

        // Eventos para botones del modal
        const incrementBtn = cartItem.querySelector(".increment-cart");
        const decrementBtn = cartItem.querySelector(".decrement-cart");

        // Evento al hacer clic en la imagen
        const imgCart = cartItem.querySelector(".cart-img .img-plato");
        imgCart.addEventListener("click", () => {
        window.location.href = `plato.html?id=${item.id}&lang=${language}`;
        });
                
        incrementBtn.addEventListener("click", () => {
            addToCart(item);
            renderCart(); // Actualiza el modal
            updateProductCounter(item.id); // Sincroniza catálogo
            updateTotalPrice(); 
        });

        
        decrementBtn.addEventListener("click", () => {
            handleDecrementClick(item.id); 
            renderCart();
            updateProductCounter(item.id); // Sincroniza catálogo
            updateTotalPrice();
        });

        cartItemsContainer.appendChild(cartItem);
    });

    // Actualizar total
    const totalElement = document.querySelector(".total");
    if (totalElement) {
        totalElement.textContent = `Total: ${total.toFixed(2)} €`;
    }
}



// Inicialización del modal
updateCartCount();

// Inicializar el carrito
renderCart();


  





