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
    { usuario: "usuario1", password: "contraseña1", telefono: "1234" },
    { usuario: "usuario2", password: "contraseña2", telefono: "56789" },
    { usuario: "belen", password: "2002", telefono: "606803157" }
];


// INICIO DE SESION
function iniciarsesion() {
    if (usuario && password) { 
        const usuarioInput = usuario.value;
        const passwordInput = password.value;


        if( !usuarioInput || !passwordInput) {
            alert('COMPLETA O NO COMES :(');
            return;
        }

        const usuariovalido = usuarios.find(u => u.usuario === usuarioInput && u.password === passwordInput);

        if (usuariovalido) {
            alert('HOLI DE NUEVO :)');
        } else {
            alert('NO TE CONOZCO :(');
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
        alert('COMPLETA O NO COMES :(');
        return;
    }
 
    if(!privacyInput) { 
       alert('ACEPTA LA POLITICA DE PRIVACIDAD PARA COMER :/');
        return;
    }

    if(verificarCuentaExistente(usuarioInput, passwordInput)) {
        return;
    }

    usuarios.push({ usuario: usuarioInput, password: passwordInput, telefono: telefonoInput });
    alert('HOLI, BIENVENID@ A LA FAMILIA DE FOODIFY :)');
}
}


//VERIFICAR CUENTA EXISTENTE
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
}

//LISTENER DE LOGIN
if (login) {
    login.addEventListener('click', iniciarsesion);
}


//LISTENER DE CREAR CUENTA
if (crearCuentaButton) {
    crearCuentaButton.addEventListener('click', crearCuenta);
}
    






