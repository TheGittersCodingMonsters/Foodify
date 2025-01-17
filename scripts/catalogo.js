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
                <div class="img-plato"><img src="${plato.foto}" alt="${plato.nombre}"><span>"${plato.calorias}" kcal</span></div>
                <div class="titulo"><h4>${plato.nombre}</h4></div>
                <p class="categoria"><span data-traductor="categoria"></span>: ${plato.categoria}</p>
                <p class="precio"><span data-traductor="precio"></span>: ${plato.precio}€</p>
                <p class="calorias"><span data-traductor="calorias"></span>: ${plato.calorias}</p>
                <p class="vegano"><span data-traductor="vegano"></span>: ${plato.vegano ? "Sí" : "No"}</p>
                </div>
            `;
               // Agrega evento al hacer clic en el plato
               platoDiv.addEventListener("click", () => {
                window.location.href = `plato.html?id=${plato.id}&lang=${currentLanguage}`;
            });
            gallery.appendChild(platoDiv);
        });
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
                    // Encuentra todos los elementos con el atributo data-traductor
                    document.querySelectorAll("[data-traductor]").forEach(element => {
                        const key = element.getAttribute("data-traductor");
                        if (data[key]) {
                            element.textContent = data[key];
                        }
                    });
                })
				.catch(error => console.error("Error lal leer las traducciones:", error));;
    }


// Función para aplicar filtros
    function applyFilters() {
        const selectedCategory = categoryFilter.value;
        const selectedType = typeFilter.value;

        const filteredPlatos = platosData.filter(plato => {
            const matchesCategory = selectedCategory === "all" || plato.filtroCategoria === selectedCategory;
            const matchesType = selectedType === "all" || plato.filtroOrden === selectedType;

            return matchesCategory && matchesType;
        });

        displayPlatos(filteredPlatos);
		loadTexts(currentLanguage);

    }
	

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


// Cargar textos y platos iniciales
    loadTexts(currentLanguage);
    loadPlatos(currentLanguage);


// Escuchar cambios en los filtros
    categoryFilter.addEventListener("change", applyFilters);
    typeFilter.addEventListener("change", applyFilters);
});