function renderizarSidebar() {
    const ligasSidebar = document.getElementById('ligasSidebar');
    const deportesSidebar = document.getElementById('deportesSidebar');
    
    if (ligasSidebar) {
        ligasSidebar.innerHTML = ligas.map(l => `
            <li onclick="filtrarPorLiga('${l.nombre}')">
                <span>🏆 ${l.nombre}</span>
                <span class="menu-count">${l.count.toLocaleString()}</span>
            </li>
        `).join('');
    }
    
    if (deportesSidebar) {
        deportesSidebar.innerHTML = `
            <li><span>⚽ Fútbol</span><span class="menu-count">120,057</span></li>
            <li><span>🏀 Baloncesto</span><span class="menu-count">2,831</span></li>
            <li><span>🎾 Tenis</span><span class="menu-count">1,460</span></li>
            <li><span>🎮 E-Sports</span><span class="menu-count">2,839</span></li>
        `;
    }
}

function filtrarPorLiga(nombreLiga) {
    renderizarPartidos(nombreLiga);
}

function renderizarPartidos(ligaFiltro = null) {
    const container = document.getElementById('partidosList');
    if (!container) return;
    
    let html = '';
    const ligasAMostrar = ligaFiltro 
        ? ligas.filter(l => l.nombre === ligaFiltro)
        : ligas;
    
    for (const liga of ligasAMostrar) {
        const partidos = partidosPorLiga[liga.nombre] || [];
        if (partidos.length === 0) continue;
        
        html += `
            <div style="margin-bottom: 30px;">
                <div style="background: linear-gradient(90deg, #FFD96620, transparent); padding: 10px 15px; border-radius: 12px; margin-bottom: 15px;">
                    <h3 style="color: #FFD966; font-size: 1.3rem;">🏆 ${liga.nombre}</h3>
                </div>
        `;
        
        for (const p of partidos) {
            html += `
                <div class="partido-card">
                    <div class="equipos">
                        <span style="font-size: 1.1rem;">${p.local}</span>
                        <span style="color: #FFD966; margin: 0 8px;">VS</span>
                        <span style="font-size: 1.1rem;">${p.visitante}</span>
                    </div>
                    <div class="cuotas">
                        <div class="cuota" onclick="hacerApuesta('${p.local}', '${p.visitante}', 'local', ${p.cuotaLocal})">
                            ${p.local.split(' ').pop()}<br><small>${p.cuotaLocal}</small>
                        </div>
                        <div class="cuota" onclick="hacerApuesta('${p.local}', '${p.visitante}', 'empate', ${p.cuotaEmpate})">
                            Empate<br><small>${p.cuotaEmpate}</small>
                        </div>
                        <div class="cuota" onclick="hacerApuesta('${p.local}', '${p.visitante}', 'visitante', ${p.cuotaVisitante})">
                            ${p.visitante.split(' ').pop()}<br><small>${p.cuotaVisitante}</small>
                        </div>
                    </div>
                </div>
            `;
        }
        
        html += `</div>`;
    }
    
    if (html === '') {
        html = '<div style="text-align:center; padding:40px; color:#aaa;">⚽ No hay partidos disponibles para esta liga</div>';
    }
    
    container.innerHTML = html;
}

function hacerApuesta(local, visitante, tipo, cuota) {
    if (!usuarioActual) {
        alert("❌ Debes iniciar sesión primero");
        return;
    }
    
    let textoTipo = "";
    if (tipo === "local") textoTipo = local;
    if (tipo === "empate") textoTipo = "Empate";
    if (tipo === "visitante") textoTipo = visitante;
    
    let monto = parseInt(prompt(
        `💰 APUESTA DEPORTIVA\n\n` +
        `${local} vs ${visitante}\n` +
        `Apuesta a: ${textoTipo}\n` +
        `Cuota: ${cuota}\n` +
        `─────────────────\n` +
        `Saldo actual: $${usuarioActual.saldo.toLocaleString()}\n\n` +
        `¿Monto a apostar?`,
        "1000"
    ));
    
    if (isNaN(monto) || monto <= 0) {
        alert("❌ Monto inválido");
        return;
    }
    
    if (monto > usuarioActual.saldo) {
        alert(`❌ Saldo insuficiente\n\nTienes: $${usuarioActual.saldo.toLocaleString()}\nNecesitas: $${monto.toLocaleString()}`);
        return;
    }
    
    // Descontar la apuesta
    actualizarSaldo(monto, true);
    
    // Simular resultado
    const random = Math.random();
    let resultado = "";
    if (random < 0.4) resultado = "local";
    else if (random < 0.7) resultado = "empate";
    else resultado = "visitante";
    
    let ganado = false;
    let ganancia = 0;
    let resultadoTexto = "";
    
    if (tipo === "local" && resultado === "local") {
        ganado = true;
        resultadoTexto = local;
    } else if (tipo === "empate" && resultado === "empate") {
        ganado = true;
        resultadoTexto = "Empate";
    } else if (tipo === "visitante" && resultado === "visitante") {
        ganado = true;
        resultadoTexto = visitante;
    } else {
        if (resultado === "local") resultadoTexto = local;
        else if (resultado === "empate") resultadoTexto = "Empate";
        else resultadoTexto = visitante;
    }
    
    if (ganado) {
        ganancia = Math.floor(monto * cuota);
        actualizarSaldo(ganancia, false);
        alert(
            `🎉 ¡GANASTE! 🎉\n\n` +
            `${local} vs ${visitante}\n` +
            `Apuesta: ${textoTipo}\n` +
            `Resultado: ${resultadoTexto}\n` +
            `─────────────────\n` +
            `Ganaste: $${ganancia.toLocaleString()}\n` +
            `Nuevo saldo: $${usuarioActual.saldo.toLocaleString()}`
        );
        agregarHistorial(
            `${local} vs ${visitante} (${textoTipo})`,
            "⚽ Deportiva",
            monto,
            `🎉 GANÓ +$${ganancia.toLocaleString()}`
        );
    } else {
        alert(
            `😞 PERDISTE\n\n` +
            `${local} vs ${visitante}\n` +
            `Apuesta: ${textoTipo}\n` +
            `Resultado: ${resultadoTexto}\n` +
            `─────────────────\n` +
            `Perdiste: $${monto.toLocaleString()}\n` +
            `Nuevo saldo: $${usuarioActual.saldo.toLocaleString()}`
        );
        agregarHistorial(
            `${local} vs ${visitante} (${textoTipo})`,
            "⚽ Deportiva",
            monto,
            `😞 PERDIÓ -$${monto.toLocaleString()}`
        );
    }
    
    actualizarUIUsuario();
    renderizarHistorial();
}