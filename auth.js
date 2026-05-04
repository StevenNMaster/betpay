let usuarios = [];
let usuarioActual = null;

function cargarUsuarios() {
    const guardados = localStorage.getItem('betpay_usuarios');
    if (guardados) {
        usuarios = JSON.parse(guardados);
    } else {
        usuarios = [{ username: 'fanatico', password: '123', saldo: 100000, historial: [] }];
        localStorage.setItem('betpay_usuarios', JSON.stringify(usuarios));
    }
}

function login(username, password) {
    let usuario = usuarios.find(u => u.username === username && u.password === password);
    if (!usuario) {
        usuario = { username, password, saldo: 100000, historial: [] };
        usuarios.push(usuario);
        localStorage.setItem('betpay_usuarios', JSON.stringify(usuarios));
    }
    usuarioActual = usuario;
    return true;
}

function logout() {
    usuarioActual = null;
}

cargarUsuarios();