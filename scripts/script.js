  // Eventos Click de menu y carrito
  const menuButton = document.querySelector(".menu-mobile");
  const menu = document.querySelector(".menu");

  const cartButton = document.querySelector(".cart");
  const cartOverlay = document.querySelector(".cart-overlay");
  const cartModal = document.querySelector(".cart-modal");


// Eventos
cartButton.addEventListener("click", toggleCart); // Mostrar/ocultar el carrito al hacer clic
cartOverlay.addEventListener("click", closeCart); // Cerrar el carrito al hacer clic en el overlay

// Función para mostrar/ocultar el carrito
function toggleCart() {
  cartOverlay.classList.toggle("clicked"); // Alterna la visibilidad de la superposición
  cartModal.classList.toggle("clicked"); // Alterna la visibilidad del modal
}

// Función para cerrar el carrito
function closeCart() {
  cartOverlay.classList.remove("clicked"); // Asegura que se oculte la superposición
  cartModal.classList.remove("clicked"); // Asegura que se oculte el modal
}

/*    // Funcion Cart
   function showCart(){
    cartButton.classList.toggle("clicked");
  };
 */
   // Funcion Cart
   function showOverlay(){
    cartOverlay.classList.toggle("clicked");
    cartModal.classList.toggle("clicked");
  };

  // Asegúrate de que en pantallas grandes no se añade la clase `clicked`.
window.addEventListener('resize', () => {
  if (window.innerWidth >= 1024) {
      menu.classList.remove('clicked');
  }
});
  
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