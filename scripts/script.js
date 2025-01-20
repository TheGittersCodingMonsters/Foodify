   // Función para obtener el carrito desde localStorage
   const cartCountElement = document.querySelector(".cart-count");
   function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || {};
}
   // Función para calcular y mostrar el número total de elementos en el carrito
   function updateCartCount() {
    const cart = getCart();
    const totalItems = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
    cartCountElement.textContent = totalItems;
}

// Cargar textos y detalles iniciales
    updateCartCount(); // Actualizar el contador del carrito