document.addEventListener("DOMContentLoaded", () => {
    const langEs = document.getElementById("lang-es");
    const langEn = document.getElementById("lang-en");
    let currentLanguage = "es";
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");
    currentLanguage = params.get("lang") || "es";

    // Función para cargar detalles del producto
    function loadProductDetail(language) {
        fetch(`../assets/data/platos-${language}.json`)
            .then(response => response.json())
            .then(data => {
                const plato = data.find(p => p.id == productId);
                const productDetail = document.getElementById("productDetail");
                
                if (!plato) {
                    productDetail.innerHTML = "<p>Producto no encontrado</p>";
                    return;
                }

                productDetail.innerHTML = `
                    <h1>${plato.nombre}</h1>
                    <div class="contenido-detalle">
                        <div class="img-plato">
                            <img src="${plato.foto}" alt="${plato.nombre}">
                        </div>
                        <div class="detalles">
                            <p class="descripcion-titulo"><span data-traductor="descripcion"></span>:</p>
                            <p class="descripcion">${plato.descripcion}</p>
                            <p class="categoria"><span data-traductor="categoria"></span>: ${plato.categoria}</p>
                            <p class="precio"><span data-traductor="precio"></span>: ${plato.precio}€</p>
                            <p class="calorias"><span data-traductor="calorias"></span>: ${plato.calorias}</p>
                            <p class="vegano"><span data-traductor="vegano"></span>: ${plato.vegano ? "Sí" : "No"}</p>
                        </div>
                    </div>
                    <div class="product-counter" data-id="${plato.id}">
                        <button class="counter-btn decrement">-</button>
                        <span class="counter-value">0</span>
                        <button class="counter-btn increment">+</button>
                    </div>`;
                
                loadTexts(currentLanguage);
                setupCounter(plato);
                updateProductCounter(plato.id); 
            });
    }

    // Configurar eventos para los botones (igual que en catalogo.js)
    function setupCounter(plato) {
        const counter = document.querySelector(`[data-id="${plato.id}"]`);
    if (!counter) return;
    
    // Obtener cantidad actual del carrito
    const cart = getCart();
    const cartItem = cart.find(item => item.id == plato.id);
    const initialValue = cartItem ? cartItem.quantity : 0; // <-- Aquí

    // Reemplazar HTML incluyendo el valor inicial
    counter.innerHTML = `
        <button class="counter-btn decrement">-</button>
        <span class="counter-value">${initialValue}</span>
        <button class="counter-btn increment">+</button>
    `;
        // Obtener los nuevos botones
        const incrementBtn = counter.querySelector(".increment");
        const decrementBtn = counter.querySelector(".decrement");
      
        // Evento para incrementar
        incrementBtn.addEventListener("click", () => {
          addToCart(plato);
          updateProductCounter(plato.id);
          updateCartCount();
          updateTotalPrice();
        });
      
        // Evento para decrementar
        decrementBtn.addEventListener("click", () => {
          handleDecrementClick(plato.id);
          updateProductCounter(plato.id);
          updateCartCount();
          updateTotalPrice();
        });
      
        // Actualizar el contador inicial
        updateProductCounter(plato.id);
      }

    // Resto de funciones (loadTexts, loadMenu) se mantienen igual
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
                        loadMenu();
                    });
                });
}

   // funcion para leer opciones de menu segun el idioma, cambia el link 
   function loadMenu(){
    const carpeta = currentLanguage.toUpperCase();
    const menu1 = document.querySelector('.menu li:first-child a');
    const ruta1 = `${carpeta}/index-${currentLanguage}.html`;
    menu1.setAttribute('href', ruta1);
    const menu2 = document.querySelector('.menu li:nth-child(2) a');
    const ruta2 = `${carpeta}/contacto-${currentLanguage}.html`;
    menu2.setAttribute('href', ruta2);
   // const menu3 = document.querySelector('.menu li:nth-child(3) a')
    //const ruta3 = `catalogo-${currentLanguage}.html`;
   // menu3.setAttribute('href', ruta3);
    const menu4 = document.querySelector('.menu li:nth-child(4) a');
    const ruta4 = `${carpeta}/crearcuenta-${currentLanguage}.html`;
    menu4.setAttribute('href', ruta4);
    //link en icono carrito
/*         const menu5 = document.querySelector('.cart a');
    const ruta5 = `${carpeta}/cart-${currentLanguage}.html`;
    menu5.setAttribute('href', ruta5); */

   }


    // Eventos de cambio de idioma
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

    // Carga inicial
    loadTexts(currentLanguage);
    loadMenu();
    loadProductDetail(currentLanguage);
    updateCartCount();
});