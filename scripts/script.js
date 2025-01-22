  // Eventos Click de menu y carrito
  const menuButton = document.querySelector(".menu-mobile");
  const menu = document.querySelector(".menu");

  const cartButton = document.querySelector(".cart");
  menuButton.addEventListener("click", showMenu);
//   cartButton.addEventListener("click", showCart);

  // Funcion Menu
  function showMenu(){
    menu.classList.toggle("clicked");
  }


  
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