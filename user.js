function guardarUsuario() {
    const index = usuarios.findIndex(u => u.username === usuarioActual.username);
    if (index !== -1) usuarios[index] = usuarioActual;
    localStorage.setItem('betpay_usuarios', JSON.stringify(usuarios));
}

function actualizarSaldo(monto, restar = false) {
    if (!usuarioActual) return false;
    if (restar) {
        if (usuarioActual.saldo < monto) return false;
        usuarioActual.saldo -= monto;
    } else {
        usuarioActual.saldo += monto;
    }
    guardarUsuario();
    actualizarUIUsuario();
    return true;
}

function agregarHistorial(evento, tipo, monto, resultado) {
    if (!usuarioActual) return;
    usuarioActual.historial.unshift({
        fecha: new Date().toLocaleString(),
        tipo, evento, monto, resultado
    });
    guardarUsuario();
    renderizarHistorial();
}

function recargarSaldo() {
    if (!usuarioActual) { alert("Inicia sesión"); return; }
    actualizarSaldo(50000, false);
    alert(`💰 Nuevo saldo: $${usuarioActual.saldo.toLocaleString()}`);
}

function actualizarUIUsuario() {
    const saldoDisplay = document.getElementById('saldoDisplay');
    const userSpan = document.getElementById('currentUserSpan');
    if (saldoDisplay && usuarioActual) saldoDisplay.innerText = "$" + usuarioActual.saldo.toLocaleString();
    if (userSpan && usuarioActual) userSpan.innerHTML = `👤 ${usuarioActual.username} | $${usuarioActual.saldo.toLocaleString()}`;
}