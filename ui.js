function renderizarHistorial() {
    const container = document.getElementById('historialLista');
    if (!container) return;
    if (!usuarioActual || !usuarioActual.historial.length) {
        container.innerHTML = '<div class="historial-item">No hay apuestas</div>';
        return;
    }
    container.innerHTML = usuarioActual.historial.map(h => `
        <div class="historial-item">
            <strong>${h.fecha}</strong> | ${h.tipo} | ${h.evento} | $${h.monto} | ${h.resultado}
        </div>
    `).join('');
}

function setupTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('tabDeportes').style.display = btn.dataset.tab === 'deportes' ? 'block' : 'none';
            document.getElementById('tabLoterias').style.display = btn.dataset.tab === 'loterias' ? 'block' : 'none';
            document.getElementById('tabHistorial').style.display = btn.dataset.tab === 'historial' ? 'block' : 'none';
            if (btn.dataset.tab === 'loterias') renderizarLoterias();
            if (btn.dataset.tab === 'historial') renderizarHistorial();
        });
    });
}

function actualizarVistaLogin() {
    const loginForm = document.getElementById('loginFormContainer');
    const userInfo = document.getElementById('loginUserInfo');
    const mainApp = document.getElementById('mainApp');
    
    if (usuarioActual) {
        loginForm.style.display = 'none';
        userInfo.style.display = 'block';
        mainApp.style.display = 'block';
        actualizarUIUsuario();
        renderizarSidebar();
        renderizarPartidos();
        setupTabs();
        renderizarHistorial();
    } else {
        loginForm.style.display = 'flex';
        userInfo.style.display = 'none';
        mainApp.style.display = 'none';
    }
}