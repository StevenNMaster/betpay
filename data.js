const ligas = [
    { nombre: "Premier League", count: 7963 },
    { nombre: "La Liga", count: 8399 },
    { nombre: "Serie A", count: 4432 },
    { nombre: "Bundesliga", count: 3658 },
    { nombre: "Ligue 1", count: 3630 },
    { nombre: "Liga BetPlay Dimayor", count: 504 },
    { nombre: "Champions League", count: 1313 }
];

const partidosPorLiga = {
    "Premier League": [
        { local: "Manchester City", visitante: "Arsenal", cuotaLocal: 2.10, cuotaEmpate: 3.40, cuotaVisitante: 3.20 },
        { local: "Liverpool", visitante: "Chelsea", cuotaLocal: 1.85, cuotaEmpate: 3.60, cuotaVisitante: 4.00 },
        { local: "Manchester United", visitante: "Tottenham", cuotaLocal: 2.05, cuotaEmpate: 3.50, cuotaVisitante: 3.30 }
    ],
    "La Liga": [
        { local: "Real Madrid", visitante: "Barcelona", cuotaLocal: 2.20, cuotaEmpate: 3.30, cuotaVisitante: 3.10 },
        { local: "Atlético Madrid", visitante: "Sevilla", cuotaLocal: 1.95, cuotaEmpate: 3.20, cuotaVisitante: 4.20 },
        { local: "Real Sociedad", visitante: "Athletic Bilbao", cuotaLocal: 2.30, cuotaEmpate: 3.10, cuotaVisitante: 3.00 }
    ],
    "Serie A": [
        { local: "Inter Milan", visitante: "Juventus", cuotaLocal: 2.15, cuotaEmpate: 3.25, cuotaVisitante: 3.40 },
        { local: "AC Milan", visitante: "Napoli", cuotaLocal: 2.30, cuotaEmpate: 3.40, cuotaVisitante: 2.90 }
    ],
    "Bundesliga": [
        { local: "Bayern Munich", visitante: "Borussia Dortmund", cuotaLocal: 1.75, cuotaEmpate: 3.80, cuotaVisitante: 4.20 }
    ],
    "Ligue 1": [
        { local: "PSG", visitante: "Marseille", cuotaLocal: 1.60, cuotaEmpate: 4.00, cuotaVisitante: 5.50 }
    ],
    "Liga BetPlay Dimayor": [
        { local: "Atlético Nacional", visitante: "Millonarios", cuotaLocal: 2.00, cuotaEmpate: 3.10, cuotaVisitante: 3.80 },
        { local: "Junior", visitante: "América de Cali", cuotaLocal: 2.20, cuotaEmpate: 3.00, cuotaVisitante: 3.50 },
        { local: "Santa Fe", visitante: "Medellín", cuotaLocal: 2.10, cuotaEmpate: 3.20, cuotaVisitante: 3.60 }
    ],
    "Champions League": [
        { local: "Real Madrid", visitante: "Bayern Munich", cuotaLocal: 2.15, cuotaEmpate: 3.50, cuotaVisitante: 3.20 },
        { local: "Manchester City", visitante: "PSG", cuotaLocal: 1.90, cuotaEmpate: 3.70, cuotaVisitante: 3.80 }
    ]
};

const loterias = [
    { id: "mega", nombre: "MEGA", premioMax: 500000000, bonoTexto: "💎 Gana hasta 500 millones", color: "#FFB347" },
    { id: "super", nombre: "SUPER", premioMax: 50000000, bonoTexto: "⭐ Gana hasta $50 millones", color: "#4CAF7A" },
    { id: "extra", nombre: "EXTRA", premioMax: 1000000, bonoTexto: "🍀 Gana hasta $1 millón", color: "#C7A252" }
];