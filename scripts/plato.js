document.addEventListener("DOMContentLoaded", () => {
    const langEs = document.getElementById("lang-es");
    const langEn = document.getElementById("lang-en");
    const langEu = document.getElementById("lang-eu");
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
                <div class="img-plato">
                    <img src="${plato.foto}" alt="${plato.nombre}">
                </div>
                <div class="contenido-detalle">
                        <h1>${plato.nombre}</h1>
                        <div class="detalles">
                            <p class="descripcion-titulo"><span data-traductor="descripcion"></span>:</p>
                            <p class="descripcion">${plato.descripcion}</p>
                            <p class="categoria"><span data-traductor="categoria"></span>: ${plato.categoria}</p>
                            <p class="precio"><span data-traductor="precio"></span>: ${plato.precio}€</p>
                            <p class="calorias"><span data-traductor="calorias"></span>: ${plato.calorias}</p>
                            <p class="vegano"><span data-traductor="vegano"></span>: ${plato.vegano ? "Sí" : "No"}</p>
                        </div>
                    </div> `;
                
                loadTexts(currentLanguage);
            });
    }

// Resto de funciones carga Textos y Menu en distintos idiomas
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

    langEu.addEventListener("click", () => {
        currentLanguage = "eu";
        loadTexts(currentLanguage);
        loadProductDetail(currentLanguage);
    });


    // Carga inicial
    loadTexts(currentLanguage);
    loadMenu();
    loadProductDetail(currentLanguage);
});