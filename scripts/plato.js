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

// Cargar textos y detalles iniciales
    loadTexts(currentLanguage);
    loadProductDetail(currentLanguage);
});