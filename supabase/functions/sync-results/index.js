import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const FOOTBALL_API = 'https://api.football-data.org/v4'

// Nombres del API (inglés) → nombres en nuestra app (español)
const TEAM_MAP = {
  'Mexico': 'México',
  'South Africa': 'Sudáfrica',
  'Korea Republic': 'Corea del Sur',
  'Republic of Korea': 'Corea del Sur',
  'Czechia': 'Chequia',
  'Czech Republic': 'Chequia',
  'Canada': 'Canadá',
  'Bosnia and Herzegovina': 'Bosnia y Herzegovina',
  'Bosnia & Herzegovina': 'Bosnia y Herzegovina',
  'Qatar': 'Qatar',
  'Switzerland': 'Suiza',
  'Brazil': 'Brasil',
  'Morocco': 'Marruecos',
  'Haiti': 'Haití',
  'Scotland': 'Escocia',
  'USA': 'Estados Unidos',
  'United States': 'Estados Unidos',
  'United States of America': 'Estados Unidos',
  'Paraguay': 'Paraguay',
  'Australia': 'Australia',
  'Turkey': 'Turquía',
  'Türkiye': 'Turquía',
  'Germany': 'Alemania',
  'Curaçao': 'Curazao',
  'Curacao': 'Curazao',
  "Côte d'Ivoire": 'Costa de Marfil',
  'Ivory Coast': 'Costa de Marfil',
  'Ecuador': 'Ecuador',
  'Netherlands': 'Países Bajos',
  'Japan': 'Japón',
  'Sweden': 'Suecia',
  'Tunisia': 'Túnez',
  'Belgium': 'Bélgica',
  'Egypt': 'Egipto',
  'Iran': 'Irán',
  'IR Iran': 'Irán',
  'New Zealand': 'Nueva Zelanda',
  'Spain': 'España',
  'Cape Verde': 'Cabo Verde',
  'Cabo Verde': 'Cabo Verde',
  'Saudi Arabia': 'Arabia Saudita',
  'Uruguay': 'Uruguay',
  'France': 'Francia',
  'Senegal': 'Senegal',
  'Iraq': 'Irak',
  'Norway': 'Noruega',
  'Argentina': 'Argentina',
  'Algeria': 'Argelia',
  'Austria': 'Austria',
  'Jordan': 'Jordania',
  'Portugal': 'Portugal',
  'DR Congo': 'RD Congo',
  'Congo DR': 'RD Congo',
  'Democratic Republic of Congo': 'RD Congo',
  'Congo, DR': 'RD Congo',
  'Uzbekistan': 'Uzbekistán',
  'Colombia': 'Colombia',
  'England': 'Inglaterra',
  'Croatia': 'Croacia',
  'Ghana': 'Ghana',
  'Panama': 'Panamá',
}

// Clave "local-visitante" en español → match_id de nuestra app
const MATCH_LOOKUP = {
  'México-Sudáfrica': 1,
  'Corea del Sur-Chequia': 2,
  'Chequia-Sudáfrica': 3,
  'México-Corea del Sur': 4,
  'Chequia-México': 5,
  'Sudáfrica-Corea del Sur': 6,
  'Canadá-Bosnia y Herzegovina': 7,
  'Qatar-Suiza': 8,
  'Suiza-Bosnia y Herzegovina': 9,
  'Canadá-Qatar': 10,
  'Suiza-Canadá': 11,
  'Bosnia y Herzegovina-Qatar': 12,
  'Brasil-Marruecos': 13,
  'Haití-Escocia': 14,
  'Escocia-Marruecos': 15,
  'Brasil-Haití': 16,
  'Escocia-Brasil': 17,
  'Marruecos-Haití': 18,
  'Estados Unidos-Paraguay': 19,
  'Australia-Turquía': 20,
  'Estados Unidos-Australia': 21,
  'Turquía-Paraguay': 22,
  'Turquía-Estados Unidos': 23,
  'Paraguay-Australia': 24,
  'Alemania-Curazao': 25,
  'Costa de Marfil-Ecuador': 26,
  'Alemania-Costa de Marfil': 27,
  'Ecuador-Curazao': 28,
  'Ecuador-Alemania': 29,
  'Curazao-Costa de Marfil': 30,
  'Países Bajos-Japón': 31,
  'Suecia-Túnez': 32,
  'Países Bajos-Suecia': 33,
  'Túnez-Japón': 34,
  'Japón-Suecia': 35,
  'Túnez-Países Bajos': 36,
  'Bélgica-Egipto': 37,
  'Irán-Nueva Zelanda': 38,
  'Bélgica-Irán': 39,
  'Nueva Zelanda-Egipto': 40,
  'Egipto-Irán': 41,
  'Nueva Zelanda-Bélgica': 42,
  'España-Cabo Verde': 43,
  'Arabia Saudita-Uruguay': 44,
  'España-Arabia Saudita': 45,
  'Uruguay-Cabo Verde': 46,
  'Cabo Verde-Arabia Saudita': 47,
  'Uruguay-España': 48,
  'Francia-Senegal': 49,
  'Irak-Noruega': 50,
  'Francia-Irak': 51,
  'Noruega-Senegal': 52,
  'Noruega-Francia': 53,
  'Senegal-Irak': 54,
  'Argentina-Argelia': 55,
  'Austria-Jordania': 56,
  'Argentina-Austria': 57,
  'Jordania-Argelia': 58,
  'Argelia-Austria': 59,
  'Jordania-Argentina': 60,
  'Portugal-RD Congo': 61,
  'Uzbekistán-Colombia': 62,
  'Portugal-Uzbekistán': 63,
  'Colombia-RD Congo': 64,
  'Colombia-Portugal': 65,
  'RD Congo-Uzbekistán': 66,
  'Inglaterra-Croacia': 67,
  'Ghana-Panamá': 68,
  'Inglaterra-Ghana': 69,
  'Panamá-Croacia': 70,
  'Panamá-Inglaterra': 71,
  'Croacia-Ghana': 72,
}

Deno.serve(async (req) => {
  // Solo aceptar POST
  if (req.method !== 'POST' && req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 })
  }

  // Verificar secreto para que solo cron-job.org pueda llamar esta función
  const cronSecret = Deno.env.get('CRON_SECRET')
  if (cronSecret) {
    const authHeader = req.headers.get('Authorization')
    if (authHeader !== `Bearer ${cronSecret}`) {
      return new Response('Unauthorized', { status: 401 })
    }
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL'),
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  )

  const token = Deno.env.get('FOOTBALL_DATA_TOKEN')
  if (!token) {
    return new Response(
      JSON.stringify({ error: 'Falta la variable FOOTBALL_DATA_TOKEN' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }

  try {
    // Pedir al API los partidos terminados del Mundial 2026
    const res = await fetch(
      `${FOOTBALL_API}/competitions/WC/matches?season=2026&status=FINISHED`,
      { headers: { 'X-Auth-Token': token } }
    )

    if (!res.ok) {
      const text = await res.text()
      return new Response(
        JSON.stringify({ error: `Error del API: ${res.status}`, detalle: text }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const data = await res.json()
    const matches = data.matches || []

    let actualizados = 0
    let ignorados = 0
    const errores = []

    for (const match of matches) {
      // Traducir nombres de equipos
      const homeEs = TEAM_MAP[match.homeTeam?.name] ?? match.homeTeam?.name
      const awayEs = TEAM_MAP[match.awayTeam?.name] ?? match.awayTeam?.name
      const clave = `${homeEs}-${awayEs}`
      const matchId = MATCH_LOOKUP[clave]

      if (!matchId) {
        ignorados++
        continue
      }

      const homeGoals = match.score?.fullTime?.home
      const awayGoals = match.score?.fullTime?.away

      if (homeGoals === null || homeGoals === undefined) {
        ignorados++
        continue
      }

      const { error } = await supabase
        .from('match_results')
        .upsert(
          { match_id: matchId, home_goals: homeGoals, away_goals: awayGoals, is_finished: true },
          { onConflict: 'match_id' }
        )

      if (error) {
        errores.push(`Partido ${matchId}: ${error.message}`)
      } else {
        actualizados++
      }
    }

    return new Response(
      JSON.stringify({
        ok: true,
        partidos_encontrados: matches.length,
        actualizados,
        ignorados,
        errores,
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
