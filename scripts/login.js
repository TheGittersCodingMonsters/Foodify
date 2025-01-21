// CONSTANTES 
const google = document.getElementById('google');
const login = document.getElementById('login');
const usuario = document.getElementById('usuario');
const password = document.getElementById('password');
const telefono = document.getElementById('telefono'); // Solo está en crearcuenta
const privacy = document.getElementById('privacy'); // Solo está en crearcuenta
const crearCuentaButton = document.getElementById('crearCuentaButton'); // Solo está en crearcuenta

// DATOS PERSONALES
const usuarios = [
    { usuario: "usuario1", password: "contraseña1", telefono: "1234567890" },
    { usuario: "usuario2", password: "contraseña2", telefono: "0987654321" },
    { usuario: "belen", password: "2002", telefono: "606803157" }
];


//INICIO DE SESIÓN
function iniciarsesion() {

    if (usuario && password) { 
        const usuarioInput = usuario.value;
        const passwordInput = password.value;

        const usuariovalido = usuarios.find(u => u.usuario === usuarioInput && u.password === passwordInput);

        if (usuariovalido) {
            alert('HOLI DE NUEVO :)');
        } else {
            alert('NO SE QUIEN ERES :(');
        }
    }
}


//CREAR CUENTA
function crearCuenta() {
    if (usuario && password && telefono && privacy) { 
        const usuarioInput = usuario.value;
        const passwordInput = password.value;
        const telefonoInput = telefono.value;
        const privacyInput = privacy.checked;

    if( !usuarioInput || !passwordInput || !telefonoInput) {
        alert('COMPLETA O NO COMES :/');
        return;
    }
    if(verificarCuentaExistente(usuarioInput, passwordInput, telefonoInput)) {
        return;
    }
    if(!privacyInput) { 
        usuarios.push({ usuario: usuarioInput, password: passwordInput, telefono: telefonoInput });

        alert('HOLI, BIENVENIDO A LA FAMILIA DE FOODIEFY :)');
    } else{
        alert('ACEPTA O NO COMES :(');
    }
}
}



//VERIFICAR CUENTA EXISTENTE
function verificarCuentaExistente(usuarioInput, passwordInput, telefonoInput) {
    const usuarioExistente = usuarios.find(u => u.usuario === usuarioInput);
    const passwordExistente = usuarios.find(u => u.password === passwordInput);
    const telefonoExistente = usuarios.find(u => u.telefono === telefonoInput);

    if (usuarioExistente) {
        alert('ESTE NOMBRE YA SE ESTA USANDO, PRUEBA OTRO');
        return true;
    }

    if (passwordExistente) {
        alert('ESTA CONTRASEÑA YA SE ESTA USANDO, PRUEBA OTRA');
        return true;
    }
    if(telefonoExistente) {
        alert('ESTE TELEFONO YA SE ESTA USANDO, PRUEBA OTRO');
        return true;
    }
    return false;

}
// Validar aceptación de términos
function verificarCuentaExistente(usuarioInput, passwordInput) {
    const usuarioExistente = usuarios.find(u => u.usuario === usuarioInput);
    const passwordExistente = usuarios.find(u => u.password === passwordInput);
   
    if (usuarioExistente) {
        alert('ESTE NOMBRE YA SE ESTA USANDO, PRUEBA OTRO');
        return true;
    }

    if (passwordExistente) {
        alert('ESTA CONTRASEÑA YA SE ESTA USANDO, PRUEBA OTRA');
        return true;
    }
    return false;

    return false;
}

//LISTENER DE LOGIN
if (login) {
    login.addEventListener('click', iniciarsesion);
}


//LISTENER DE CREAR CUENTA
if (crearCuentaButton) {
    crearCuentaButton.addEventListener('click', crearCuenta);
}
