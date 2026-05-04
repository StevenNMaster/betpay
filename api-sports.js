let apiCache = {};

async function fetchLiveMatches(leagueId, sport = 'football') {
    const cacheKey = `${sport}_${leagueId}`;
    const now = Date.now();
    
    if (apiCache[cacheKey] && (now - apiCache[cacheKey].timestamp) < 60000) {
        return apiCache[cacheKey].data;
    }
    
    const liveData = {
        success: true,
        leagueId: leagueId,
        lastUpdate: new Date().toISOString(),
        matches: [
            { 
                local: "Equipo Local", 
                visitante: "Equipo Visitante",
                local_score: 0,
                visitante_score: 0,
                minuto: 0,
                estado: "programado",
                cuotaLocal: 2.00,
                cuotaEmpate: 3.20,
                cuotaVisitante: 3.60
            }
        ]
    };
    
    apiCache[cacheKey] = { timestamp: now, data: liveData };
    return liveData;
}

function stopAutoRefresh() {
    if (window.refreshInterval) {
        clearInterval(window.refreshInterval);
        window.refreshInterval = null;
    }
}