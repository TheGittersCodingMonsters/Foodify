let platosData = [];
const language = 'es'; // O el idioma dinámico que uses
const gallery = document.querySelector(".gallery");

function displayPlatos(platos) {
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

    // Evento al hacer clic en la imagen
    const imgPlato = platoDiv.querySelector(".img-plato img");
    imgPlato.addEventListener("click", () => {
      window.location.href = `plato.html?id=${plato.id}&lang=${language}`;
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
  fetch(`../assets/data/platos-${language}.json`)
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

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  loadPlatos();
  updateCartCount();
  updateTotalPrice();
});