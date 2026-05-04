// ========== THE ODDS API - CONFIGURACIÓN ==========
// Regístrate en https://the-odds-api.com/ para obtener tu API key gratis
// Plan gratuito: 100 requests por día

const ODDS_API_KEY = 'TU_API_KEY_AQUI';  // <--- CAMBIA ESTO POR TU API KEY REAL
const SPORT = 'soccer_epl'; // Premier League

// Deportes disponibles:
// soccer_epl = Premier League
// soccer_spain_la_liga = La Liga
// soccer_italy_serie_a = Serie A
// soccer_germany_bundesliga = Bundesliga
// soccer_france_ligue_one = Ligue 1

async function obtenerPartidosConCuotas() {
    const url = `https://api.the-odds-api.com/v4/sports/${SPORT}/odds/?apiKey=${ODDS_API_KEY}&regions=us,uk,eu&markets=h2h&oddsFormat=decimal`;
    
    try {
        console.log('🔄 Cargando partidos desde The Odds API...');
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (!response.ok) {
            console.error('❌ Error de API:', data);
            return [];
        }
        
        console.log(`✅ ${data.length} partidos encontrados`);
        
        // Transformar los datos al formato que usa BetPay
        const partidos = data.map(evento => {
            // Buscar la primera casa de apuestas disponible
            const bookmaker = evento.bookmakers[0];
            const cuotas = bookmaker?.markets[0]?.outcomes || [];
            
            const cuotaLocal = cuotas.find(o => o.name === evento.home_team)?.price || 2.00;
            const cuotaEmpate = cuotas.find(o => o.name === 'Draw')?.price || 3.20;
            const cuotaVisitante = cuotas.find(o => o.name === evento.away_team)?.price || 3.60;
            
            return {
                local: evento.home_team,
                visitante: evento.away_team,
                cuotaLocal: cuotaLocal,
                cuotaEmpate: cuotaEmpate,
                cuotaVisitante: cuotaVisitante,
                fecha: evento.commence_time,
                id: evento.id
            };
        });
        
        return partidos;
        
    } catch (error) {
        console.error('❌ Error al conectar con la API:', error);
        return [];
    }
}

// Función para actualizar los partidos en la interfaz de BetPay
async function actualizarPartidosConAPI() {
    const partidosReales = await obtenerPartidosConCuotas();
    
    if (partidosReales.length > 0) {
        // Actualizar la variable global partidosPorLiga
        window.partidosAPI = partidosReales;
        
        // Refrescar la pantalla
        if (typeof renderizarPartidos === 'function') {
            renderizarPartidos();
        }
        
        console.log('✅ Partidos actualizados con datos reales');
        return partidosReales;
    } else {
        console.log('⚠️ No se pudieron cargar partidos, usando datos de prueba');
        return [];
    }
}

// Exportar funciones para usar en otros archivos
window.actualizarPartidosConAPI = actualizarPartidosConAPI;
window.obtenerPartidosConCuotas = obtenerPartidosConCuotas;
