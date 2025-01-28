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
            });
    }

    // Configurar eventos para los botones (igual que en catalogo.js)
    function setupCounter(plato) {
        const counter = document.querySelector(`[data-id="${plato.id}"]`);
        if (!counter) return;

        const incrementBtn = counter.querySelector(".increment");
        const decrementBtn = counter.querySelector(".decrement");

        // Actualizar contador inicial
        updateProductCounter(plato.id);

        // Eventos idénticos a catalogo.js
        incrementBtn.addEventListener("click", () => {
            addToCart(plato);
            updateProductCounter(plato.id);
            updateCartCount();
            updateTotalPrice();
        });

        decrementBtn.addEventListener("click", () => {
            handleDecrementClick(plato.id);
            updateProductCounter(plato.id);
            updateCartCount();
            updateTotalPrice();
        });
    }

    // Resto de funciones (loadTexts, loadMenu) se mantienen igual
    function loadTexts(language) { /* ... */ }
    function loadMenu() { /* ... */ }

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