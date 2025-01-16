// CONSTANTES SEGÚN DISPONIBILIDAD
const google = document.getElementById('google');
const login = document.getElementById('login');
const usuario = document.getElementById('usuario');
const password = document.getElementById('password');
const telefono = document.getElementById('telefono'); // Solo está en crearcuenta.html
const privacy = document.getElementById('privacy'); // Solo está en crearcuenta.html
const crearCuentaButton = document.getElementById('crearCuentaButton'); // Solo está en crearcuenta.html

// DATOS PERSONALES
const usuarios = [
    { usuario: "usuario1", password: "contraseña1", telefono: "1234567890" },
    { usuario: "usuario2", password: "contraseña2", telefono: "0987654321" },
    { usuario: "belen", password: "2002", telefono: "606803157" }
];

// FUNCIÓN DE INICIO DE SESIÓN
function iniciarsesion() {
    if (usuario && password) { // Asegurarse de que los elementos existen
        const usuarioInput = usuario.value;
        const passwordInput = password.value;

        const usuariovalido = usuarios.find(u => u.usuario === usuarioInput && u.password === passwordInput);

        if (usuariovalido) {
            alert('ERES TU :)');
        } else {
            alert('NO ERES TU :(');
        }
    }
}

// FUNCIÓN PARA CREAR CUENTA
function crearCuenta() {
    if (usuario && password && telefono && privacy) { // Asegurarse de que los elementos existen
        const usuarioInput = usuario.value;
        const passwordInput = password.value;
        const telefonoInput = telefono.value;
        const privacyInput = privacy.checked;

        if (privacyInput) {
            usuarios.push({ usuario: usuarioInput, password: passwordInput, telefono: telefonoInput });
            alert('Cuenta creada correctamente.');
        } else {
            alert('Debes aceptar la política de privacidad.');
        }
    }
}

// ASIGNAR EVENTOS SEGÚN DISPONIBILIDAD
if (login) {
    login.addEventListener('click', iniciarsesion);
}

if (crearCuentaButton) {
    crearCuentaButton.addEventListener('click', crearCuenta);
}

if (google) {
    google.addEventListener('click', () => {
        alert("Función de Google no implementada todavía.");
    });
}
