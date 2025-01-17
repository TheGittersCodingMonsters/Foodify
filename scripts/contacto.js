//guardo el botón de enviar
const enviar = document.getElementById("enviarButton");

//all pulsar el botón se generan las variables con cada campo
enviar.addEventListener("click", function (event) {
  event.preventDefault();
  var nombre = document.getElementById("nombre_contacto").value;
  var apellidos = document.getElementById("apellidos_contacto").value;
  var email = document.getElementById("email_contacto").value;
  var telefono = document.getElementById("telefono_contacto").value;
  var direccion = document.getElementById("direccion_contacto").value;
  var cp = document.getElementById("cp_contacto").value;
  var poblacion = document.getElementById("poblacion_contacto").value;
  var pais = document.getElementById("pais_contacto").value;

  // Guardar en localStorage
  localStorage.setItem("nombre", nombre);
  localStorage.setItem("apellidos", apellidos);
  localStorage.setItem("email", email);
  localStorage.setItem("telefono", telefono);
  localStorage.setItem("direccion", direccion);
  localStorage.setItem("cp", cp);
  localStorage.setItem("poblacion", poblacion);
  localStorage.setItem("pais", pais);

  alert("Datos guardados en localStorage");
});
