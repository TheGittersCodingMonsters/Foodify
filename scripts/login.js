//CONST DE LOS DOS HTML
const google = document.getElementById('google');
const login = document.getElementById('login');
const usuario = document.getElementById('usuario');
const password= document.getElementById('password');
const telefono = document.getElementById('telefono');
const privacy= document.getElementById('privacy');
const crearCuentaButton = document.getElementById('crearCuentaButton');



//DATOS PERSONALES
const usuarios = [
    {usuario: "usuario1", password: "contraseña1", telefono: "1234567890"},
    {usuario: "usuario2", password: "contraseña2", telefono: "0987654321" },
    {usuario: "belen", password:"2002", telefono: "606803157"}
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
function crearcuenta() {
    const privacyInput =document.getElementById('privacy');
    if (privacyInput.checked){
        alert('marcado');
    }else{
        alert('no marcado');
    }
    alert(privacyInput);
    const usuarioInput = usuario.value;
    const passwordInput = password.value;
    const telefonoInput = telefono.value;
}


// EVENTO INICIO SESION
login.addEventListener('click', iniciarsesion);


//EVENTO CREAR CUENTA

crearCuentaButton.addEventListener('click', crearcuenta);