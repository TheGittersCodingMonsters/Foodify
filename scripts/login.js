//CONST DE LOS DOS HTML
const google = document.getElementById('google');
const login = document.getElementById('login');
const usuario = document.getElementById('usuario');
const password= document.getElementById('password');
const cuentaBtn= document.querySelector("button[type='submit']");
const telefono= document.getElementById('telefono');
const politicaPrivacidad= document.getElementById('privacy');

//DATOS PERSONALES
const usuarios = [
    {usuario: "usuario1", password: "contraseña1"},
    {usuario: "usuario2", password: "contraseña2"},
    {usuario: "belen", password:"2002"}
];

// FUNCTION INICIO SESION
function iniciarsesion() {
    const usuarioInput = usuario.value;
    const passwordInput = password.value;

    const usuariovalido = usuarios.find(u => u.usuario === usuarioInput && u.password === passwordInput);
    
    if (usuariovalido) {
        alert('ERES TU :)');
    } else {
        alert('NO ERES TU :(');
    }
}
//EL CODIGO FUNCIONA HASTA AQUI <3


//FUNCTION CREAR CUENTA
function crearCuenta(){
    const usuarioInput= usuario.value;
    const passwordInput= password.value;
    const telefonoInput= telefono.value;
    const privacidadChecked= politicaPrivacidad.checked;

    if (!usuarioInput || !passwordInput|| !telefonoInput || !privacidadChecked) {
        alert("Completa y acepta o no comes");
        return;
    }

    alert("CUENTA CREADA :)");
}


// EVENTO INICIO SESION
login.addEventListener('click', iniciarsesion);


//EVENTO CREAR CUENTA
cuentaBtn.addEventListener('click', function(event) {
    event.preventDefault();
    crearCuenta();
});