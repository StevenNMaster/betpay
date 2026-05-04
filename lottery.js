function renderizarLoterias() {
    const container = document.getElementById('loteriasContainer');
    if (!container) return;
    let html = '';
    loterias.forEach(l => {
        html += `<div class="loteria-card">
            <h3>🎰 ${l.nombre}</h3>
            <p>${l.bonoTexto}</p>
            <input type="number" id="num_${l.id}" placeholder="Número 1-100">
            <input type="number" id="monto_${l.id}" placeholder="Monto">
            <button class="btn-login" onclick="jugarLoteria('${l.id}')">Apostar</button>
        </div>`;
    });
    container.innerHTML = html;
}

function jugarLoteria(id) {
    if (!usuarioActual) { alert("Inicia sesión"); return; }
    const loteria = loterias.find(l => l.id === id);
    const numero = parseInt(document.getElementById(`num_${id}`).value);
    const monto = parseInt(document.getElementById(`monto_${id}`).value);
    
    if (isNaN(numero) || numero < 1 || numero > 100) { alert("Número 1-100"); return; }
    if (isNaN(monto) || monto <= 0) { alert("Monto inválido"); return; }
    if (monto > usuarioActual.saldo) { alert("Saldo insuficiente"); return; }
    
    actualizarSaldo(monto, true);
    const ganador = Math.floor(Math.random() * 100) + 1;
    let ganancia = 0;
    if (numero === ganador) {
        ganancia = monto * (Math.random() * 20 + 5);
        ganancia = Math.floor(ganancia);
        actualizarSaldo(ganancia, false);
        alert(`🎉 GANASTE! Número: ${ganador}. Premio: $${ganancia}`);
        agregarHistorial(`${loteria.nombre} - N° ${numero}`, "🎰 Lotería", monto, `GANÓ +$${ganancia}`);
    } else {
        alert(`😞 Perdiste. Número ganador: ${ganador}`);
        agregarHistorial(`${loteria.nombre} - N° ${numero}`, "🎰 Lotería", monto, `PERDIÓ -$${monto}`);
    }
    actualizarUIUsuario();
}