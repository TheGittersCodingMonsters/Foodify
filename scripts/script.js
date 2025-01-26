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

//------------------ CARRITO MODAL -------------------------------//
  
// Función para obtener el carrito desde localStorage
   const cartCountElement = document.querySelector(".cart-count");
   function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || {};
}

// Función para calcular y mostrar el número total de elementos en el carrito
    function updateCartCount() {
    const cart = getCart();

// Calcula el total asegurándote de que quantity sea un número válido
    const totalItems = Object.values(cart).reduce((sum, product) => {
        const quantity = parseInt(product.quantity) || 0; // Asegura que quantity sea un número
        return sum + quantity;
    }, 0);
    
// Actualiza el contador total
    cartCountElement.textContent = totalItems;
}

// Cargar textos y detalles iniciales
    updateCartCount(); // Actualizar el contador del carrito

/* ----------------- ELEMENTOS DEL CART.JS ------------------//*/
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