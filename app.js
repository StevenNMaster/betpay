document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnLogin').addEventListener('click', () => {
        const user = document.getElementById('loginUser').value.trim();
        const pass = document.getElementById('loginPass').value;
        if (!user) { alert("Ingresa usuario"); return; }
        login(user, pass);
        actualizarVistaLogin();
    });
    
    document.getElementById('btnLogout').addEventListener('click', () => {
        logout();
        actualizarVistaLogin();
    });
    
    document.getElementById('btnRecargaGeneral').addEventListener('click', () => {
        recargarSaldo();
    });
    
    actualizarVistaLogin();
});