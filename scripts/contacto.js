
        enviar = document.getElementById('enviarButton')
        enviar.addEventListener('click', function() {
            const form = document.getElementById('formContacto');
            const formDatos = new FormData(form);
            const jsonData = {};

            formDatos.forEach((value, key) => {
                jsonData[key] = value;
            });

            console.log(JSON.stringify(jsonData));
        });
