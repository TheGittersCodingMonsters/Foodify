//SCRIPT PARA PÁGINA catalogo.html
document.addEventListener("DOMContentLoaded", () => {
    const categoryFilter = document.getElementById("filter-category");
    const typeFilter = document.getElementById("filter-type");
    const gallery = document.getElementById("gallery");
    const langEs = document.getElementById("lang-es");
    const langEn = document.getElementById("lang-en");
    let platosData = [];
    let currentLanguage = "es";

   
    // Función para mostrar los platos en la galería
    function displayPlatos(platos) {
        gallery.innerHTML = "";
        platos.forEach(plato => {
            const platoDiv = document.createElement("div");
            platoDiv.classList.add("plato");
            platoDiv.innerHTML = `
                <div class="productDetail">
                    <div class="img-plato">
                        <img src="${plato.foto}" alt="${plato.nombre}">
                        <span>${plato.calorias} kcal</span>
                    </div>
                    <div class="titulo"><h4>${plato.nombre}</h4></div>
                    <p class="categoria"><span data-traductor="categoria"></span>: ${plato.categoria}</p>
                    <p class="precio"><span data-traductor="precio"></span>: ${plato.precio}€</p>
                    <p class="calorias"><span data-traductor="calorias"></span>: ${plato.calorias}</p>
                    <p class="vegano"><span data-traductor="vegano"></span>: ${plato.vegano ? "Sí" : "No"}</p>
                    <div class="product-counter" data-id="${plato.id}">
                        <button class="counter-btn decrement">-</button>
                        <span class="counter-value">0</span>
                        <button class="counter-btn increment">+</button>
                    </div>
                </div>
            `;
               // Agrega evento al hacer clic en la imagen del plato
               let imgPlato = platoDiv.querySelector(".img-plato img"); // Selección específica
               imgPlato.addEventListener("click", () => {
                          window.location.href = `plato.html?id=${plato.id}&lang=${currentLanguage}`;
               });

            gallery.appendChild(platoDiv);
        });

        // Inicializar los contadores después de renderizar los platos
        initializeCounters();
    }

    
    // Función para cargar platos desde el archivo JSON
    function loadPlatos(language) {
        fetch(`../assets/data/platos-${language}.json`)
            .then(response => {
                if (!response.ok) throw new Error(`Error al cargar los datos: ${response.status}`);
                return response.json();
            })
            .then(data => {
                platosData = data;
                displayPlatos(data);
                loadTexts(currentLanguage);
            })
            .catch(error => console.error("Error al cargar los platos:", error));
    }

    // Función para cargar textos desde el archivo JSON de idioma
    function loadTexts(language) {
        fetch(`../assets/data/textos-${language}.json`)
            .then(response => response.json())
            .then(data => {
                document.querySelectorAll("[data-traductor]").forEach(element => {
                    const key = element.getAttribute("data-traductor");
                    if (data[key]) {
                        element.textContent = data[key];
                    }
                });
            })
            .catch(error => console.error("Error al leer las traducciones:", error));
    }



    // Aplicar filtros
    function applyFilters() {
        const selectedCategory = categoryFilter.value;
        const selectedType = typeFilter.value;

        const filteredPlatos = platosData.filter(plato => {
            const matchesCategory = selectedCategory === "all" || plato.filtroCategoria === selectedCategory;
            const matchesType = selectedType === "all" || plato.filtroOrden === selectedType;
            return matchesCategory && matchesType;
        });
        loadTexts(currentLanguage);
        displayPlatos(filteredPlatos);
  
    }

    // Eventos para filtros
    categoryFilter.addEventListener("change", applyFilters);
    typeFilter.addEventListener("change", applyFilters);

    
    // Eventos para cambiar idioma
    langEs.addEventListener("click", () => {
        currentLanguage = "es";
        loadTexts(currentLanguage);
        loadPlatos(currentLanguage);
    });

    langEn.addEventListener("click", () => {
        currentLanguage = "en";
        loadTexts(currentLanguage);
        loadPlatos(currentLanguage);
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


   // Llama a updateCartCount en puntos clave, como al cargar datos iniciales
   loadTexts(currentLanguage);
   loadPlatos(currentLanguage);
   updateCartCount();
// Actualizar el contador del carrito al cargar la página
    updateCartCount();
   
   // localStorage.clear(); //limpia localStorage
});