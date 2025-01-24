//SCRIPT PARA PÁGINA catalogo.html
document.addEventListener("DOMContentLoaded", () => {
    const categoryFilter = document.getElementById("filter-category");
    const typeFilter = document.getElementById("filter-type");
    const veganFilter = document.getElementById("filter-vegan");
    const gallery = document.getElementById("gallery");
    const langEs = document.getElementById("lang-es");
    const langEn = document.getElementById("lang-en");
   // const langEu = document.getElementById("lang-eu");
    let platosData = [];
    let currentLanguage = "es";

    
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
                    <div class="infoPlato">
                    <div class="titulo"><h4>${plato.nombre}</h4></div>
                    <p class="categoria"><span data-traductor="categoria"></span>: ${plato.categoria}</p>
                    <p class="precio"><span data-traductor="precio"></span>: ${plato.precio}€</p>
                    <p class="calorias"><span data-traductor="calorias"></span>: ${plato.calorias}</p>
                    <p class="vegano"><span data-traductor="vegano"></span>: ${plato.vegano}</p>
                    </div>
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
                loadMenu();
            })
            
            .catch(error => console.error("Error al leer las traducciones:", error));
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
    const menu5 = document.querySelector('.cart a');
    const ruta5 = `${carpeta}/cart-${currentLanguage}.html`;
    menu5.setAttribute('href', ruta5);

   }
   
    // Aplicar filtros
    function applyFilters() {
        const selectedCategory = categoryFilter.value;
        const selectedType = typeFilter.value;
        const selectedVegan = veganFilter.value;

        const filteredPlatos = platosData.filter(plato => {
            const matchesCategory = selectedCategory === "all" || plato.filtroCategoria === selectedCategory;
            const matchesType = selectedType === "all" || plato.filtroOrden === selectedType;
            const matchesVegan = selectedVegan === "all" || plato.filtroVegano === selectedVegan;
            return matchesCategory && matchesType && matchesVegan;
        });
        loadTexts(currentLanguage);
        displayPlatos(filteredPlatos);
  
    }

    // Eventos para filtros
    categoryFilter.addEventListener("change", applyFilters);
    typeFilter.addEventListener("change", applyFilters);
    veganFilter.addEventListener("change", applyFilters);

    
    // Eventos para cambiar idioma
    langEs.addEventListener("click", () => {
        currentLanguage = "es";
        loadTexts(currentLanguage);
        loadPlatos(currentLanguage);
    });
  //English
    langEn.addEventListener("click", () => {
        currentLanguage = "en";
        loadTexts(currentLanguage);
        loadPlatos(currentLanguage);
    });
    //PARA EUSKERA
   /*langEu.addEventListener("click", () => {
        currentLanguage = "eu";
        loadTexts(currentLanguage);
        loadPlatos(currentLanguage);
    });*/


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
function updateProductInCart(productId, productName, productPrice, quantity, image) {
    const cart = getCart();

    if (quantity === 0) {
        delete cart[productId]; // Eliminar el producto si la cantidad es 0
    } else {
        cart[productId] = {
            id: productId,
            name: productName,
            price: productPrice,
            quantity: quantity,
            image: image
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
        const productImage = counter.closest(".productDetail").querySelector(".img-plato img").getAttribute("src");
        const productName = counter.closest(".productDetail").querySelector(".titulo h4").textContent;
        const productPrice = parseFloat(
            counter.closest(".productDetail").querySelector(".precio").textContent.replace(/[^\d.]/g, "")
            //counter.closest(".productDetail") Busca el elemento más cercano con la clase .productDetail
           //.querySelector(".precio") Dentro de ese elemento, busca el primer hijo con la clase .precio
            //textContent.replace(/[^\d.]/g, "") Elimina cualquier carácter que no sea un dígito o un punto decimal:
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
                updateProductInCart(id, productName, productPrice, currentValue, productImage);
            }
        });

        // Evento para incrementar
        incrementBtn.addEventListener("click", () => {
            let currentValue = parseInt(counterValue.textContent);
            currentValue++;
            counterValue.textContent = currentValue;
            updateProductInCart(id, productName, productPrice, currentValue, productImage);
        });
    });

    // Actualizar el contador del carrito al cargar la página
    updateCartCount();
}

// Función para calcular y mostrar el número total de elementos en el carrito
function updateCartCount() {
    const cart = getCart();
       // Depuración: Verifica el contenido del carrito
       //console.log("Cart contents:", cart);
    // Calcula el total asegurándote de que quantity sea un número válido
    //reduce hace suma de los productos en cart
    const totalItems = Object.values(cart).reduce((sum, product) => {
        const quantity = parseInt(product.quantity) || 0; // Asegura que quantity sea un número
        return sum + quantity;
    }, 0);
    // Actualiza el contador total
    cartCountElement.textContent = totalItems;
}


//cambiar estilos bot0nes seleccion para filtros
document.addEventListener('DOMContentLoaded', () => {
    const selects = document.querySelectorAll('select');
  
    selects.forEach((select) => {
      select.addEventListener('change', () => {
        if (select.value !== 'all') {
          select.classList.add('not-all-active');
        } else {
          select.classList.remove('not-all-active');
        }
      });
    });
  });
  


// Llama a updateCartCount en puntos clave, como al cargar datos iniciales
   loadTexts(currentLanguage);
   loadPlatos(currentLanguage);
   loadMenu();
   updateCartCount();
// Actualizar el contador del carrito al cargar la página
    updateCartCount();
   
// localStorage.clear(); //limpia localStorage
});

  // Scroll to Top Function para el boton to top
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// muestra/Oculta el boton Back to top al hacer scroll
window.addEventListener("scroll", function() {
    const topButton = document.getElementById("top-button");
    if (window.scrollY > window.innerHeight) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
});

