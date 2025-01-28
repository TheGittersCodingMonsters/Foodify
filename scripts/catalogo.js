let categoryFilter, typeFilter, veganFilter, langEs, langEn;
let platosData = [];
let currentLanguage = 'es';
let translations = {};

// Función principal async/await
async function loadTexts(language) {
  try {
    const response = await fetch(`../assets/data/textos-${language}.json`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    translations = await response.json();
    
    document.querySelectorAll("[data-traductor]").forEach(element => {
      const key = element.getAttribute("data-traductor");
      element.textContent = translations[key] || key;
    });
    
    loadMenu();
  } catch (error) {
    console.error("Error cargando textos:", error);
  }
}

async function loadPlatos() {
  try {
    const response = await fetch(`../assets/data/platos-${currentLanguage}.json`);
    if (!response.ok) throw new Error("Error cargando platos");
    
    platosData = await response.json();
    gallery.innerHTML = "";
    
    populateFilterOptions(platosData);
    displayPlatos(platosData);
    platosData.forEach(plato => updateProductCounter(plato.id));
  } catch (error) {
    console.error("Error:", error);
  }
}



// Filtrado simplificado
function applyFilters() {

  const filters = {
    category: categoryFilter.value,
    type: typeFilter.value,
    vegan: veganFilter.value
  };

  console.log(filters)

  const filtered = platosData.filter(plato => 
    (filters.category === "all" || plato.filtroCategoria === filters.category) &&
    (filters.type === "all" || plato.filtroOrden === filters.type) &&
    (filters.vegan === "all" || plato.filtroVegano === filters.vegan)
  );


  displayPlatos(filtered);
}

// Event listeners unificados

document.body.addEventListener('change', (e) => {
  if (e.target.matches('#filter-category, #filter-type, #filter-vegan')) {
    applyFilters();
  }
});

// Cambio de idioma simplificado
async function changeLanguage(lang) {
  currentLanguage = lang;
  await loadTexts(lang);
  await loadPlatos();
}

// Inicialización
document.addEventListener("DOMContentLoaded", async () => {
  categoryFilter = document.getElementById("filter-category");
  typeFilter = document.getElementById("filter-type");
  veganFilter = document.getElementById("filter-vegan");
  langEs = document.getElementById("lang-es");
  langEn = document.getElementById("lang-en");
  gallery = document.getElementById("gallery");

  // Verificar existencia
  if (!categoryFilter || !typeFilter || !veganFilter) {
    console.error("Error: Faltan elementos del filtro!");
    return;
  }


  
  try {
    await loadTexts(currentLanguage);
    await loadPlatos();
    updateCartCount();
    updateTotalPrice();
  } catch (error) {
    console.error("Error inicial:", error);
  }
});

// Función para manejar cambio de idioma
const handleLanguageChange = async (lang) => {
  try {
    currentLanguage = lang;
    await loadTexts(currentLanguage);
    await loadPlatos();
  } catch (error) {
    console.error("Error cambiando idioma:", error);
  }
};



// Función para cargar platos
function loadPlatos() {
  gallery.innerHTML = ""; // Limpiar galería
  
  fetch(`../assets/data/platos-${currentLanguage}.json`)
    .then(response => response.json())
    .then(data => {
      platosData = data;
      populateFilterOptions(data);
      displayPlatos(data);
      platosData.forEach(plato => updateProductCounter(plato.id));
    })
    .catch(error => console.error("Error cargando platos:", error));
}

// Función para poblar opciones de filtros
function populateFilterOptions(platos) {
  const categories = getUniqueFilterValues(platos, "filtroCategoria");
  const types = getUniqueFilterValues(platos, "filtroOrden");
  const veganOptions = getUniqueFilterValues(platos, "filtroVegano");

  populateSelect(categoryFilter, categories, "categoria");
  populateSelect(typeFilter, types, "tipo");
  populateSelect(veganFilter, veganOptions, "vegano");
}

// Función auxiliar para obtener valores únicos
function getUniqueFilterValues(platos, key) {
  const values = platos.map(plato => plato[key]);
  return ["all", ...new Set(values)];
}

// Función para llenar selects con opciones traducidas
function populateSelect(selectElement, values, translationKey) {
  selectElement.innerHTML = values.map(value => 
    `<option value="${value}">${getTranslatedText(translationKey, value)}</option>`
  ).join("");
}

// Función para obtener texto traducido
function getTranslatedText(translationKey, value) {
  return translations[translationKey]?.[value] || value;
}

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

// Carga inicial de platos
function loadPlatos() {
  fetch(`../assets/data/platos-${currentLanguage}.json`)
    .then(response => {
      if (!response.ok) throw new Error(`Error al cargar los datos: ${response.status}`);
      return response.json();
    })
    .then(data => {
      platosData = data;
      displayPlatos(data);
      platosData.forEach(plato => updateProductCounter(plato.id));
    })
    .catch(error => console.error("Error al cargar los platos:", error));
}

// Función actualizada para manejar múltiples instancias
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
          element.textContent = "0"; // Reset si no está en el carrito
      });
  }
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
/*   const menu5 = document.querySelector('.cart a');
  const ruta5 = `${carpeta}/cart-${currentLanguage}.html`;
  menu5.setAttribute('href', ruta5); */

 }



 // Función para cargar textos desde el archivo JSON de idioma
 function loadTexts(language) {
  fetch(`../assets/data/textos-${currentLanguage}.json`)
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

//PARA EUSKERA
/*langEu.addEventListener("click", () => {
  currentLanguage = "eu";
  loadTexts(currentLanguage);
  loadPlatos(currentLanguage);
});*/



// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  loadPlatos();
  updateCartCount();
  updateTotalPrice();
});