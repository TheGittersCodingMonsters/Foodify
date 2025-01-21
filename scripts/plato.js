// SCRIPT PARA plato.js
document.addEventListener("DOMContentLoaded", () => {
const langEs = document.getElementById("lang-es");
const langEn = document.getElementById("lang-en");
let currentLanguage = "es"; // Idioma por defecto

// Obtenemos el ID del producto desde la URL
 const params = new URLSearchParams(window.location.search);
 const productId = params.get("id");



//ESTA función para cargar los detalles del producto desde el archivo JSON del idioma
function loadProductDetail(language) {
      fetch(`../assets/data/platos-${language}.json`)
         .then(response => response.json())
         .then(data => {
            const plato = data.find(p => p.id == productId);
             if (plato) {
                document.getElementById("productDetail").innerHTML = `
                      
                      <h1>${plato.nombre}</h1>
                         <div class="img-plato"><img src="${plato.foto}" alt="${plato.nombre}"></div> <!-- Foto del plato -->
                         <p class ="descripcion"><span data-traductor="descripcion"></span>: ${plato.descripcion}</p>
						 <p class ="categoria"><span data-traductor="categoria"></span>: ${plato.categoria}</p>
                         <p class ="precio"><span data-traductor="precio"></span>: ${plato.precio}€</p>
                         <p class ="calorias"><span data-traductor="calorias"></span>: ${plato.calorias}</p>
                         <p class ="vegano"><span data-traductor="vegano"></span>: ${plato.vegano ? "Sí" : "No"}</p>
                              <div class="product-counter" data-id="${plato.id}">
                               <button class="counter-btn decrement">-</button>
                              <span class="counter-value">0</span>
                              <button class="counter-btn increment">+</button>
                    </div>
                    `;
					loadTexts(currentLanguage);
           } else {
                  document.getElementById("product-detail").innerHTML = "<p>Producto no encontrado</p>";
            }
      });
}

// Función para cargar textos de la interfaz desde el archivo JSON del idioma
// cogerá textos-en.js o textos-es.json segun la opcion pinchada en los iconos de idioma
//ojo con la ruta- template string
//Esta funcion carga los textos dela pagina identificados por sus id
  function loadTexts(language) {
        fetch(`../assets/data/textos-${language}.json`)
                .then(response => response.json())
                .then(data => {
                    // Encuentra todos los elementos con el atributo data-traductor
                    document.querySelectorAll("[data-traductor]").forEach(element => {
                        const key = element.getAttribute("data-traductor");
                        if (data[key]) {
                            element.textContent = data[key];
                        }
                    });
                });
}

// Alternar entre idiomas
langEs.addEventListener("click", () => {
      currentLanguage = "es";
      loadTexts(currentLanguage);
      loadProductDetail(currentLanguage);
});

langEn.addEventListener("click", () => {
    currentLanguage = "en";
    loadTexts(currentLanguage);
    loadProductDetail(currentLanguage);
});
 //CONTADORES Y CARRITO 
 const cartCountElement = document.querySelector(".cart-count");

 // Función para obtener el carrito desde localStorage
 function getCart() {
     return JSON.parse(localStorage.getItem("cart")) || {}; // El carrito será un objeto con claves de ID de producto
 }
 
 // Función para guardar el carrito en localStorage
 function saveCart(cart) {
     localStorage.setItem("cart", JSON.stringify(cart));
 }
 
 // Función para actualizar un producto en el carrito
 function updateProductInCart(productId, productName, productPrice, quantity) {
     const cart = getCart();
 
     if (quantity === 0) {
         delete cart[productId]; // Eliminar el producto si la cantidad es 0
     } else {
         cart[productId] = {
             id: productId,
             name: productName,
             price: productPrice,
             quantity: quantity,
         };
     }
 
     saveCart(cart);
     updateCartCount(); // Actualizar el contador del carrito
 }
 
 // Función para inicializar los contadores
 function initializeCounters() {
     const counters = document.querySelectorAll(".product-counter");
     const cart = getCart();
 
     counters.forEach(counter => {
         const id = counter.getAttribute("data-id");
         const productName = counter.closest(".productDetail").querySelector(".titulo h4").textContent;
         const productPrice = parseFloat(
             counter.closest(".productDetail").querySelector(".precio").textContent.replace(/[^\d.]/g, "")
         );
 
         const decrementBtn = counter.querySelector(".decrement");
         const incrementBtn = counter.querySelector(".increment");
         const counterValue = counter.querySelector(".counter-value");
 
         // Mostrar el valor inicial desde el carrito
         counterValue.textContent = cart[id]?.quantity || 0;
 
         // Evento para decrementar
         decrementBtn.addEventListener("click", () => {
             let currentValue = parseInt(counterValue.textContent);
             if (currentValue > 0) {
                 currentValue--;
                 counterValue.textContent = currentValue;
                 updateProductInCart(id, productName, productPrice, currentValue);
             }
         });
 
         // Evento para incrementar
         incrementBtn.addEventListener("click", () => {
             let currentValue = parseInt(counterValue.textContent);
             currentValue++;
             counterValue.textContent = currentValue;
             updateProductInCart(id, productName, productPrice, currentValue);
         });
     });
 
     // Actualizar el contador del carrito al cargar la página
     updateCartCount();
 }
 
 // Función para calcular y mostrar el número total de elementos en el carrito
 function updateCartCount() {
     const cart = getCart();
        // Depuración: Verifica el contenido del carrito
        console.log("Cart contents:", cart);
     // Calcula el total asegurándote de que quantity sea un número válido
     const totalItems = Object.values(cart).reduce((sum, product) => {
         const quantity = parseInt(product.quantity) || 0; // Asegura que quantity sea un número
         return sum + quantity;
     }, 0);
     // Actualiza el contador total
     cartCountElement.textContent = totalItems;
 }
 
 
 
// Cargar textos y detalles iniciales
    loadTexts(currentLanguage);
    loadProductDetail(currentLanguage);
    // Actualizar el contador del carrito al cargar la página
    updateCartCount();
});