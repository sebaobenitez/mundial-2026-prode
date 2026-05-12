// Fixture oficial Mundial 2026 - Fuente: FIFA / NBC Sports
// Horarios en ET (UTC-4). ARG = ET + 1h
// Asterisco en timeUtils indica madrugada ARG

export const GROUP_MATCHES = [
  // ── GRUPO A ──
  { id: 1,  group: 'A', home: 'México',         away: 'Sudáfrica',          date: '2026-06-11', time: '15:00', venue: 'Estadio Azteca',           city: 'CDMX' },
  { id: 2,  group: 'A', home: 'Corea del Sur',  away: 'Chequia',            date: '2026-06-11', time: '22:00', venue: 'Estadio Akron',             city: 'Guadalajara' },
  { id: 3,  group: 'A', home: 'Chequia',        away: 'Sudáfrica',          date: '2026-06-18', time: '12:00', venue: 'Mercedes-Benz Stadium',     city: 'Atlanta' },
  { id: 4,  group: 'A', home: 'México',         away: 'Corea del Sur',      date: '2026-06-18', time: '21:00', venue: 'Estadio Akron',             city: 'Guadalajara' },
  { id: 5,  group: 'A', home: 'Chequia',        away: 'México',             date: '2026-06-24', time: '21:00', venue: 'Estadio Azteca',            city: 'CDMX' },
  { id: 6,  group: 'A', home: 'Sudáfrica',      away: 'Corea del Sur',      date: '2026-06-24', time: '21:00', venue: 'Estadio BBVA',              city: 'Monterrey' },

  // ── GRUPO B ──
  { id: 7,  group: 'B', home: 'Canadá',                away: 'Bosnia y Herzegovina', date: '2026-06-12', time: '15:00', venue: 'BMO Field',                  city: 'Toronto' },
  { id: 8,  group: 'B', home: 'Qatar',                  away: 'Suiza',                date: '2026-06-13', time: '15:00', venue: "Levi's Stadium",              city: 'San José' },
  { id: 9,  group: 'B', home: 'Suiza',                  away: 'Bosnia y Herzegovina', date: '2026-06-18', time: '15:00', venue: 'SoFi Stadium',                city: 'Los Ángeles' },
  { id: 10, group: 'B', home: 'Canadá',                away: 'Qatar',                date: '2026-06-18', time: '18:00', venue: 'BC Place',                    city: 'Vancouver' },
  { id: 11, group: 'B', home: 'Suiza',                  away: 'Canadá',              date: '2026-06-24', time: '15:00', venue: 'BC Place',                    city: 'Vancouver' },
  { id: 12, group: 'B', home: 'Bosnia y Herzegovina',  away: 'Qatar',                date: '2026-06-24', time: '15:00', venue: 'Lumen Field',                 city: 'Seattle' },

  // ── GRUPO C ──
  { id: 13, group: 'C', home: 'Brasil',    away: 'Marruecos', date: '2026-06-13', time: '18:00', venue: 'MetLife Stadium',          city: 'Nueva York' },
  { id: 14, group: 'C', home: 'Haití',     away: 'Escocia',   date: '2026-06-13', time: '21:00', venue: 'Gillette Stadium',          city: 'Boston' },
  { id: 15, group: 'C', home: 'Escocia',   away: 'Marruecos', date: '2026-06-19', time: '18:00', venue: 'Gillette Stadium',          city: 'Boston' },
  { id: 16, group: 'C', home: 'Brasil',    away: 'Haití',     date: '2026-06-19', time: '20:30', venue: 'Lincoln Financial Field',   city: 'Filadelfia' },
  { id: 17, group: 'C', home: 'Escocia',   away: 'Brasil',    date: '2026-06-24', time: '18:00', venue: 'Hard Rock Stadium',         city: 'Miami' },
  { id: 18, group: 'C', home: 'Marruecos', away: 'Haití',     date: '2026-06-24', time: '18:00', venue: 'Mercedes-Benz Stadium',    city: 'Atlanta' },

  // ── GRUPO D ──
  { id: 19, group: 'D', home: 'Estados Unidos', away: 'Paraguay',  date: '2026-06-12', time: '21:00', venue: 'SoFi Stadium',    city: 'Los Ángeles' },
  { id: 20, group: 'D', home: 'Australia',       away: 'Turquía',   date: '2026-06-13', time: '00:00', venue: 'BC Place',        city: 'Vancouver' },
  { id: 21, group: 'D', home: 'Estados Unidos', away: 'Australia', date: '2026-06-19', time: '15:00', venue: 'Lumen Field',     city: 'Seattle' },
  { id: 22, group: 'D', home: 'Turquía',          away: 'Paraguay',  date: '2026-06-19', time: '23:00', venue: "Levi's Stadium", city: 'San José' },
  { id: 23, group: 'D', home: 'Turquía',          away: 'Estados Unidos', date: '2026-06-25', time: '22:00', venue: 'SoFi Stadium',    city: 'Los Ángeles' },
  { id: 24, group: 'D', home: 'Paraguay',         away: 'Australia', date: '2026-06-25', time: '22:00', venue: "Levi's Stadium", city: 'San José' },

  // ── GRUPO E ──
  { id: 25, group: 'E', home: 'Alemania',       away: 'Curazao',        date: '2026-06-14', time: '13:00', venue: 'NRG Stadium',             city: 'Houston' },
  { id: 26, group: 'E', home: 'Costa de Marfil', away: 'Ecuador',        date: '2026-06-14', time: '19:00', venue: 'Lincoln Financial Field', city: 'Filadelfia' },
  { id: 27, group: 'E', home: 'Alemania',       away: 'Costa de Marfil', date: '2026-06-20', time: '16:00', venue: 'BMO Field',               city: 'Toronto' },
  { id: 28, group: 'E', home: 'Ecuador',         away: 'Curazao',        date: '2026-06-20', time: '20:00', venue: 'Arrowhead Stadium',       city: 'Kansas City' },
  { id: 29, group: 'E', home: 'Ecuador',         away: 'Alemania',       date: '2026-06-25', time: '16:00', venue: 'MetLife Stadium',         city: 'Nueva York' },
  { id: 30, group: 'E', home: 'Curazao',         away: 'Costa de Marfil', date: '2026-06-25', time: '16:00', venue: 'Lincoln Financial Field', city: 'Filadelfia' },

  // ── GRUPO F ──
  { id: 31, group: 'F', home: 'Países Bajos', away: 'Japón',        date: '2026-06-14', time: '16:00', venue: 'AT&T Stadium',      city: 'Dallas' },
  { id: 32, group: 'F', home: 'Suecia',        away: 'Túnez',        date: '2026-06-14', time: '22:00', venue: 'Estadio BBVA',       city: 'Monterrey' },
  { id: 33, group: 'F', home: 'Países Bajos', away: 'Suecia',       date: '2026-06-20', time: '13:00', venue: 'NRG Stadium',        city: 'Houston' },
  { id: 34, group: 'F', home: 'Túnez',         away: 'Japón',        date: '2026-06-20', time: '00:00', venue: 'Estadio BBVA',       city: 'Monterrey' },
  { id: 35, group: 'F', home: 'Japón',          away: 'Suecia',       date: '2026-06-25', time: '19:00', venue: 'AT&T Stadium',      city: 'Dallas' },
  { id: 36, group: 'F', home: 'Túnez',          away: 'Países Bajos', date: '2026-06-25', time: '19:00', venue: 'Arrowhead Stadium', city: 'Kansas City' },

  // ── GRUPO G ──
  { id: 37, group: 'G', home: 'Bélgica',       away: 'Egipto',        date: '2026-06-15', time: '15:00', venue: 'Lumen Field',  city: 'Seattle' },
  { id: 38, group: 'G', home: 'Irán',           away: 'Nueva Zelanda', date: '2026-06-15', time: '21:00', venue: 'SoFi Stadium', city: 'Los Ángeles' },
  { id: 39, group: 'G', home: 'Bélgica',       away: 'Irán',          date: '2026-06-21', time: '15:00', venue: 'SoFi Stadium', city: 'Los Ángeles' },
  { id: 40, group: 'G', home: 'Nueva Zelanda',  away: 'Egipto',        date: '2026-06-21', time: '21:00', venue: 'BC Place',     city: 'Vancouver' },
  { id: 41, group: 'G', home: 'Egipto',         away: 'Irán',          date: '2026-06-26', time: '23:00', venue: 'Lumen Field',  city: 'Seattle' },
  { id: 42, group: 'G', home: 'Nueva Zelanda',  away: 'Bélgica',       date: '2026-06-26', time: '23:00', venue: 'BC Place',     city: 'Vancouver' },

  // ── GRUPO H ──
  { id: 43, group: 'H', home: 'España',        away: 'Cabo Verde',    date: '2026-06-15', time: '12:00', venue: 'Mercedes-Benz Stadium', city: 'Atlanta' },
  { id: 44, group: 'H', home: 'Arabia Saudita', away: 'Uruguay',       date: '2026-06-15', time: '18:00', venue: 'Hard Rock Stadium',     city: 'Miami' },
  { id: 45, group: 'H', home: 'España',        away: 'Arabia Saudita', date: '2026-06-21', time: '12:00', venue: 'Mercedes-Benz Stadium', city: 'Atlanta' },
  { id: 46, group: 'H', home: 'Uruguay',        away: 'Cabo Verde',    date: '2026-06-21', time: '18:00', venue: 'Hard Rock Stadium',     city: 'Miami' },
  { id: 47, group: 'H', home: 'Cabo Verde',     away: 'Arabia Saudita', date: '2026-06-26', time: '20:00', venue: 'NRG Stadium',           city: 'Houston' },
  { id: 48, group: 'H', home: 'Uruguay',        away: 'España',        date: '2026-06-26', time: '20:00', venue: 'Estadio Akron',          city: 'Guadalajara' },

  // ── GRUPO I ──
  { id: 49, group: 'I', home: 'Francia',  away: 'Senegal', date: '2026-06-16', time: '15:00', venue: 'MetLife Stadium',        city: 'Nueva York' },
  { id: 50, group: 'I', home: 'Irak',     away: 'Noruega', date: '2026-06-16', time: '18:00', venue: 'Gillette Stadium',        city: 'Boston' },
  { id: 51, group: 'I', home: 'Francia',  away: 'Irak',    date: '2026-06-22', time: '17:00', venue: 'Lincoln Financial Field', city: 'Filadelfia' },
  { id: 52, group: 'I', home: 'Noruega',  away: 'Senegal', date: '2026-06-22', time: '20:00', venue: 'MetLife Stadium',        city: 'Nueva York' },
  { id: 53, group: 'I', home: 'Noruega',  away: 'Francia', date: '2026-06-26', time: '15:00', venue: 'Gillette Stadium',        city: 'Boston' },
  { id: 54, group: 'I', home: 'Senegal',  away: 'Irak',    date: '2026-06-26', time: '15:00', venue: 'BMO Field',               city: 'Toronto' },

  // ── GRUPO J ──
  { id: 55, group: 'J', home: 'Argentina', away: 'Argelia',  date: '2026-06-16', time: '21:00', venue: 'Arrowhead Stadium', city: 'Kansas City' },
  { id: 56, group: 'J', home: 'Austria',   away: 'Jordania', date: '2026-06-16', time: '00:00', venue: "Levi's Stadium",    city: 'San José' },
  { id: 57, group: 'J', home: 'Argentina', away: 'Austria',  date: '2026-06-22', time: '13:00', venue: 'AT&T Stadium',       city: 'Dallas' },
  { id: 58, group: 'J', home: 'Jordania',  away: 'Argelia',  date: '2026-06-22', time: '23:00', venue: "Levi's Stadium",    city: 'San José' },
  { id: 59, group: 'J', home: 'Argelia',   away: 'Austria',  date: '2026-06-27', time: '22:00', venue: 'Arrowhead Stadium', city: 'Kansas City' },
  { id: 60, group: 'J', home: 'Jordania',  away: 'Argentina', date: '2026-06-27', time: '22:00', venue: 'AT&T Stadium',      city: 'Dallas' },

  // ── GRUPO K ──
  { id: 61, group: 'K', home: 'Portugal',    away: 'RD Congo',   date: '2026-06-17', time: '13:00', venue: 'NRG Stadium',            city: 'Houston' },
  { id: 62, group: 'K', home: 'Uzbekistán',  away: 'Colombia',   date: '2026-06-17', time: '22:00', venue: 'Estadio Azteca',         city: 'CDMX' },
  { id: 63, group: 'K', home: 'Portugal',    away: 'Uzbekistán', date: '2026-06-23', time: '13:00', venue: 'NRG Stadium',            city: 'Houston' },
  { id: 64, group: 'K', home: 'Colombia',    away: 'RD Congo',   date: '2026-06-23', time: '22:00', venue: 'Estadio Akron',          city: 'Guadalajara' },
  { id: 65, group: 'K', home: 'Colombia',    away: 'Portugal',   date: '2026-06-27', time: '19:30', venue: 'Hard Rock Stadium',      city: 'Miami' },
  { id: 66, group: 'K', home: 'RD Congo',    away: 'Uzbekistán', date: '2026-06-27', time: '19:30', venue: 'Mercedes-Benz Stadium',  city: 'Atlanta' },

  // ── GRUPO L ──
  { id: 67, group: 'L', home: 'Inglaterra', away: 'Croacia', date: '2026-06-17', time: '16:00', venue: 'AT&T Stadium',           city: 'Dallas' },
  { id: 68, group: 'L', home: 'Ghana',       away: 'Panamá',  date: '2026-06-17', time: '19:00', venue: 'BMO Field',              city: 'Toronto' },
  { id: 69, group: 'L', home: 'Inglaterra', away: 'Ghana',   date: '2026-06-23', time: '16:00', venue: 'Gillette Stadium',        city: 'Boston' },
  { id: 70, group: 'L', home: 'Panamá',      away: 'Croacia', date: '2026-06-23', time: '19:00', venue: 'BMO Field',              city: 'Toronto' },
  { id: 71, group: 'L', home: 'Panamá',      away: 'Inglaterra', date: '2026-06-27', time: '17:00', venue: 'MetLife Stadium',     city: 'Nueva York' },
  { id: 72, group: 'L', home: 'Croacia',     away: 'Ghana',   date: '2026-06-27', time: '17:00', venue: 'Lincoln Financial Field', city: 'Filadelfia' },
]

export const KNOCKOUT_MATCHES = [
  // Ronda de 32
  { id: 101, stage: 'R32', label: 'R32 - P1',  home: 'TBD', away: 'TBD', date: '2026-06-29', time: '15:00', venue: 'MetLife Stadium',         city: 'Nueva York' },
  { id: 102, stage: 'R32', label: 'R32 - P2',  home: 'TBD', away: 'TBD', date: '2026-06-29', time: '21:00', venue: 'AT&T Stadium',             city: 'Dallas' },
  { id: 103, stage: 'R32', label: 'R32 - P3',  home: 'TBD', away: 'TBD', date: '2026-06-30', time: '15:00', venue: 'SoFi Stadium',             city: 'Los Ángeles' },
  { id: 104, stage: 'R32', label: 'R32 - P4',  home: 'TBD', away: 'TBD', date: '2026-06-30', time: '21:00', venue: 'Hard Rock Stadium',        city: 'Miami' },
  { id: 105, stage: 'R32', label: 'R32 - P5',  home: 'TBD', away: 'TBD', date: '2026-07-01', time: '15:00', venue: 'Mercedes-Benz Stadium',    city: 'Atlanta' },
  { id: 106, stage: 'R32', label: 'R32 - P6',  home: 'TBD', away: 'TBD', date: '2026-07-01', time: '21:00', venue: 'Gillette Stadium',         city: 'Boston' },
  { id: 107, stage: 'R32', label: 'R32 - P7',  home: 'TBD', away: 'TBD', date: '2026-07-02', time: '15:00', venue: "Levi's Stadium",           city: 'San José' },
  { id: 108, stage: 'R32', label: 'R32 - P8',  home: 'TBD', away: 'TBD', date: '2026-07-02', time: '21:00', venue: 'BC Place',                 city: 'Vancouver' },
  { id: 109, stage: 'R32', label: 'R32 - P9',  home: 'TBD', away: 'TBD', date: '2026-07-03', time: '15:00', venue: 'NRG Stadium',              city: 'Houston' },
  { id: 110, stage: 'R32', label: 'R32 - P10', home: 'TBD', away: 'TBD', date: '2026-07-03', time: '21:00', venue: 'Estadio Azteca',           city: 'CDMX' },
  { id: 111, stage: 'R32', label: 'R32 - P11', home: 'TBD', away: 'TBD', date: '2026-07-04', time: '15:00', venue: 'Arrowhead Stadium',        city: 'Kansas City' },
  { id: 112, stage: 'R32', label: 'R32 - P12', home: 'TBD', away: 'TBD', date: '2026-07-04', time: '21:00', venue: 'Lumen Field',              city: 'Seattle' },
  { id: 113, stage: 'R32', label: 'R32 - P13', home: 'TBD', away: 'TBD', date: '2026-07-05', time: '15:00', venue: 'BMO Field',                city: 'Toronto' },
  { id: 114, stage: 'R32', label: 'R32 - P14', home: 'TBD', away: 'TBD', date: '2026-07-05', time: '21:00', venue: 'Lincoln Financial Field',  city: 'Filadelfia' },
  { id: 115, stage: 'R32', label: 'R32 - P15', home: 'TBD', away: 'TBD', date: '2026-07-06', time: '15:00', venue: 'Estadio BBVA',             city: 'Monterrey' },
  { id: 116, stage: 'R32', label: 'R32 - P16', home: 'TBD', away: 'TBD', date: '2026-07-06', time: '21:00', venue: 'Estadio Akron',            city: 'Guadalajara' },

  // Octavos de Final
  { id: 201, stage: 'R16', label: 'Octavos - P1', home: 'TBD', away: 'TBD', date: '2026-07-08', time: '15:00', venue: 'MetLife Stadium',        city: 'Nueva York' },
  { id: 202, stage: 'R16', label: 'Octavos - P2', home: 'TBD', away: 'TBD', date: '2026-07-08', time: '21:00', venue: 'SoFi Stadium',           city: 'Los Ángeles' },
  { id: 203, stage: 'R16', label: 'Octavos - P3', home: 'TBD', away: 'TBD', date: '2026-07-09', time: '15:00', venue: 'AT&T Stadium',           city: 'Dallas' },
  { id: 204, stage: 'R16', label: 'Octavos - P4', home: 'TBD', away: 'TBD', date: '2026-07-09', time: '21:00', venue: 'Hard Rock Stadium',      city: 'Miami' },
  { id: 205, stage: 'R16', label: 'Octavos - P5', home: 'TBD', away: 'TBD', date: '2026-07-10', time: '15:00', venue: 'Mercedes-Benz Stadium',  city: 'Atlanta' },
  { id: 206, stage: 'R16', label: 'Octavos - P6', home: 'TBD', away: 'TBD', date: '2026-07-10', time: '21:00', venue: 'NRG Stadium',            city: 'Houston' },
  { id: 207, stage: 'R16', label: 'Octavos - P7', home: 'TBD', away: 'TBD', date: '2026-07-11', time: '15:00', venue: 'Arrowhead Stadium',      city: 'Kansas City' },
  { id: 208, stage: 'R16', label: 'Octavos - P8', home: 'TBD', away: 'TBD', date: '2026-07-11', time: '21:00', venue: 'Lumen Field',            city: 'Seattle' },

  // Cuartos de Final
  { id: 301, stage: 'QF', label: 'Cuartos - P1', home: 'TBD', away: 'TBD', date: '2026-07-14', time: '15:00', venue: 'MetLife Stadium',  city: 'Nueva York' },
  { id: 302, stage: 'QF', label: 'Cuartos - P2', home: 'TBD', away: 'TBD', date: '2026-07-14', time: '21:00', venue: 'SoFi Stadium',    city: 'Los Ángeles' },
  { id: 303, stage: 'QF', label: 'Cuartos - P3', home: 'TBD', away: 'TBD', date: '2026-07-15', time: '15:00', venue: 'AT&T Stadium',     city: 'Dallas' },
  { id: 304, stage: 'QF', label: 'Cuartos - P4', home: 'TBD', away: 'TBD', date: '2026-07-15', time: '21:00', venue: 'Hard Rock Stadium', city: 'Miami' },

  // Semifinales
  { id: 401, stage: 'SF', label: 'Semifinal 1', home: 'TBD', away: 'TBD', date: '2026-07-17', time: '21:00', venue: 'AT&T Stadium',   city: 'Dallas' },
  { id: 402, stage: 'SF', label: 'Semifinal 2', home: 'TBD', away: 'TBD', date: '2026-07-18', time: '21:00', venue: 'MetLife Stadium', city: 'Nueva York' },

  // Tercer Puesto
  { id: 501, stage: 'THIRD', label: 'Tercer Puesto', home: 'TBD', away: 'TBD', date: '2026-07-18', time: '15:00', venue: 'Hard Rock Stadium', city: 'Miami' },

  // Final
  { id: 601, stage: 'FINAL', label: '🏆 FINAL', home: 'TBD', away: 'TBD', date: '2026-07-19', time: '18:00', venue: 'MetLife Stadium', city: 'Nueva York' },
]
