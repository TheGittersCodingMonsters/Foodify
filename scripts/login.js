const google = document.getElementById('google');
const login = document.getElementById('login');
const usuario = document.getElementById('usuario');
const password = document.getElementById('password');

//CONST USUARIO
const usuarios = [
    {usuario: "usuario1", password: "contraseña1"},
    {usuario: "usuario2", password: "contraseña2"},
    {usuario: "belen", password:"2002"}
];

// Function inicio sesión
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

// EVENTO INICIO SESION
login.addEventListener('click', iniciarsesion);
