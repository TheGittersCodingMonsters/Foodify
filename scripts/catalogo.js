//Código javacsript para página catalogo.html
//esta pagina tambien crag scripts de carrito.js y scripts.js
//Declaración de variables
let categoryFilter, typeFilter, veganFilter, langEs, langEn, langEu;
let platosData = [];
let currentLanguage = 'es';
let translations = {};//objeto vacío

// Carga inicial de platos - promesas
// los textos se leen de archivos json, hay 1 archivo para cada idioma
function loadPlatos(language) {
  fetch(`../assets/data/platos-${language}.json`)
    .then(response => {
      if (!response.ok) throw new Error(`Error al cargar los datos: ${response.status}`);
      return response.json();
    })
    .then(data => {
      platosData = data;//array de objetos
      displayPlatos(data);
      platosData.forEach(plato => updateProductCounter(plato.id));
    })
    .catch(error => console.error("Error al cargar los platos:", error));
}

/***  loadPlatos() con async/await
async function loadPlatos(language) {
  try {
    const response = await fetch(`../assets/data/platos-${language}.json`);
    if (!response.ok) {
      throw new Error(`Error al cargar los datos: ${response.status}`);
    }
    const data = await response.json();
    platosData = data;
    displayPlatos(data);
    platosData.forEach(plato => updateProductCounter(plato.id));
  } catch (error) {
    console.error("Error al cargar los platos:", error);
  }
}*/

// Leer textos de idiomas - promesas
// los textos se leen de archivos json, hay 1 archivo para cada idioma
function loadTexts(language) {
  fetch(`../assets/data/textos-${language}.json`)
    .then(response => response.json())
    .then(data => {
      // Almacena las traducciones en una variable global
      translations = data;//objeto
      
      // Aplica las traducciones a todos los elementos existentes
      document.querySelectorAll("[data-traductor]").forEach(element => {
        const key = element.getAttribute("data-traductor");
        element.textContent = translations[key] || "";
      });
      
      loadMenu();
      applyFilters();
    });
}

// Filtrado simplificado uso de objeto
function applyFilters() {

  const filters = {
    category: categoryFilter.value,
    type: typeFilter.value,
    vegan: veganFilter.value
  };

  //console.log(filters)
  //filtered es un array de objetos
  const filtered = platosData.filter(plato => 
    (filters.category === "all" || plato.filtroCategoria === filters.category) &&
    (filters.type === "all" || plato.filtroOrden === filters.type) &&
    (filters.vegan === "all" || plato.filtroVegano === filters.vegan)
  );

  displayPlatos(filtered);
}


// Función para obtener texto traducido
function getTranslatedText(translationKey, value) {
  return translations[translationKey]?.[value] || value;
}

//recibe platos enviado desde loadPlatos() que es un array de objetos
function displayPlatos(platos) {
  gallery.innerHTML = "";
  platos.forEach(plato => {
    const platoDiv = document.createElement("div");
    platoDiv.classList.add("plato");

    platoDiv.innerHTML += `
      <div class="productDetail">
          <div class="img-plato">
              <img src="${plato.foto}" alt="${plato.nombre}">
              <span>${plato.calorias} kcal</span>
          </div>
          <div class="infoPlato">
              <div class="titulo"><h4>${plato.nombre}</h4></div>
              <p class="categoria"><span data-traductor="categoria">Categoría</span>: ${plato.categoria}</p>
              <p class="precio"><span data-traductor="precio">Precio</span>: ${plato.precio}€</p>
              <p class="calorias"><span data-traductor="calorias">Calorías</span>: ${plato.calorias}</p>
              <p class="vegano"><span data-traductor="vegano">Vegano</span>: ${plato.vegano}</p>
          </div>
          <div class="product-counter" data-id="${plato.id}">
              <button class="counter-btn decrement">-</button>
              <span class="counter-value">0</span>
              <button class="counter-btn increment">+</button>
          </div>
      </div>
    `;
  // Agrega el plato al DOM
  gallery.appendChild(platoDiv);
    
    // Aplicar traducciones a los nuevos elementos dinámicos
    document.querySelectorAll("[data-traductor]").forEach(element => {
      const key = element.getAttribute("data-traductor");
      element.textContent = translations[key] || "";
    });
    
    // Evento al hacer clic en la imagen
    const imgPlato = platoDiv.querySelector(".img-plato img");
    imgPlato.addEventListener("click", () => {
      window.location.href = `plato.html?id=${plato.id}&lang=${currentLanguage}`;
    });

    // Eventos para botones de incrementar/decrementar
    const incrementBtn = platoDiv.querySelector(".increment");
    const decrementBtn = platoDiv.querySelector(".decrement");

    // Botón de incrementar (corregido)
    incrementBtn.addEventListener("click", () => {
      addToCart(plato);
      updateProductCounter(plato.id);
      updateCartCount();
      updateTotalPrice();
    });

    // Botón de decrementar (corregido)
    decrementBtn.addEventListener("click", () => {
      handleDecrementClick(plato.id);
      updateProductCounter(plato.id);
      updateCartCount();
      updateTotalPrice();
    });

    // Actualizar contador inicial
    updateProductCounter(plato.id);
    gallery.appendChild(platoDiv);
  });
}

// funcion para leer opciones de menu segun el idioma, cambia el link 
function loadMenu(){

  const menu1 = document.querySelector('.menu li:first-child a');
  const ruta1 = `index.html`;
  menu1.setAttribute('href', ruta1);
  const menu2 = document.querySelector('.menu li:nth-child(2) a');
  const ruta2 = `contacto-${currentLanguage}.html`;
  menu2.setAttribute('href', ruta2);
  const menu3 = document.querySelector('.menu li:nth-child(3) a')
  const ruta3 = `catalogo.html`;
  menu3.setAttribute('href', ruta3);
  const menu4 = document.querySelector('.menu li:nth-child(4) a');
  const ruta4 = `crearcuenta-${currentLanguage}.html`;
  menu4.setAttribute('href', ruta4);
 }

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  categoryFilter = document.getElementById("filter-category");
  typeFilter = document.getElementById("filter-type");
  veganFilter = document.getElementById("filter-vegan");
  langEs = document.getElementById("lang-es");
  langEn = document.getElementById("lang-en");
  langEu = document.getElementById("lang-eu"); 
  gallery = document.getElementById("gallery");

  //PARA español
  langEs.addEventListener("click", () => {
    currentLanguage = "es";
    loadTexts(currentLanguage);
    loadPlatos(currentLanguage);
  });

  //PARA Ingles
  langEn.addEventListener("click", () => {
    currentLanguage = "en";
    loadTexts(currentLanguage);
    loadPlatos(currentLanguage);
  });

  //PARA EUSKERA
 langEu.addEventListener("click", () => {
  currentLanguage = "eu";
  loadTexts(currentLanguage);
  loadPlatos(currentLanguage);
}); 

 // funciones iniciales: leer traducciones y platos, actualizar contador pedidos y coste total
    loadTexts(currentLanguage);
    loadPlatos(currentLanguage);
    updateCartCount();
    updateTotalPrice();
});

// Event listeners unificados
//e.target  es el elemento que dispara el evento (un filtro).
document.body.addEventListener('change', (e) => {
  if (e.target.matches('#filter-category, #filter-type, #filter-vegan')) {
    applyFilters();
  }
});