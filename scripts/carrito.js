function getCart() {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartArray = Object.values(cart);  
    return  cartArray;
  }
  
  function saveCart(cart) {
    // Si el carrito está vacío, borramos la clave en lugar de guardar array vacío
    if (cart.length === 0) {
        localStorage.removeItem("cart");
    } else {
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}
  
  function updateCartCount() {
    cart = getCart();
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const cartCountElement = document.querySelector(".cart-count");

    if (cartCountElement) {
        cartCountElement.textContent = totalCount;
    }
  }
  
  function addToCart(product) {
    const cart = getCart();
    const existingProduct = cart.find(item => item.id == product.id);
    
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ 
        id: product.id, // Asegurar que solo se guardan propiedades necesarias
        nombre: product.nombre,
        precio: product.precio,
        foto: product.foto,
        quantity: 1 
      });
    }
    
    saveCart(cart);
    updateCartCount();
    renderCart(); // Forzar actualización del modal del carrito
    return cart;
  }
  
  function removeFromCart(productId) {
    let cart = getCart();
    let updatedCart = cart.filter(item => item.id !== productId); // Filtramos el producto
    
    // Si el carrito queda vacío, borramos completamente la clave
    if (updatedCart.length === 0) {
        localStorage.removeItem("cart");
    } else {
        saveCart(updatedCart); // Si aún hay items, guardamos normalmente
    }
    
    updateCartCount();
    renderCart(); // Forzar actualización del modal
}

  function updateCartItemCounter(itemId) {
    const cart = getCart();
    let cartArray = Object.values(cart);
    const cartItem = cartArray.find(item => item.id === itemId);
    const counterElement = document.querySelector(`[data-id="${itemId}"] .counter-value`);

    if (cartItem && counterElement) {
        counterElement.textContent = `${cartItem.quantity}`;
    }
}

function updateTotalPrice() {
    const cart = getCart();
    let total = 0;
    cart.forEach(item => {
        total += item.precio * item.quantity;  // Actualizar el precio total
    });

    // Mostrar el precio total en el carrito
    const totalElement = document.querySelector(".cart-total");
    if (totalElement) {
        totalElement.textContent = `Total: ${total.toFixed(2)} €`;
    } 
}

function handleIncrementClick(productId) { // Recibir el ID del producto
    const cart = getCart();
    const existingProduct = cart.find(item => item.id == productId); // Buscar en el carrito
    if (existingProduct) {
        existingProduct.quantity += 1;
        saveCart(cart);
        updateCartItemCounter(productId); // Actualizar contador específico
        updateTotalPrice(); // Actualizar precio total
        updateCartCount(); // Actualizar contador general
    }
}

function handleDecrementClick(productId) {
    const cart = getCart();
    const existingProduct = cart.find(item => item.id == productId);
    
    if (existingProduct) {
        if (existingProduct.quantity > 1) {
            existingProduct.quantity -= 1;
            saveCart(cart);

        } else {
            // Si la cantidad llega a 0, eliminamos el producto
            removeFromCart(productId);
            total = 0;
        }
        
        updateProductCounter(productId);
        updateTotalPrice();
        updateCartCount();
    }
}

function updateProductCounter(platoId) {
    const cart = getCart();
    const plato = cart.find(item => item.id === platoId);
    const counterElements = document.querySelectorAll(`[data-id="${platoId}"] .counter-value`);
  
    if (plato && counterElements.length > 0) {
        counterElements.forEach(element => {
            element.textContent = plato.quantity;
        });
    } else {
        counterElements.forEach(element => {
            element.textContent = "0";
        });
    }
  }
  

  