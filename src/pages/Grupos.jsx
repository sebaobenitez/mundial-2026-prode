import { useState, useEffect } from 'react'
import { GROUPS } from '../data/groups'
import { supabase } from '../lib/supabase'

function StandingsTable({ group, standings }) {
  return (
    <div className="card overflow-hidden p-0">
      <div className="bg-primary/10 px-4 py-3 border-b border-dark-3">
        <h3 className="font-extrabold text-lg text-primary">Grupo {group.id}</h3>
      </div>
      <table className="w-full">
        <thead>
          <tr className="text-xs text-gray-500 border-b border-dark-3">
            <th className="text-left px-4 py-2">Equipo</th>
            <th className="px-2 py-2 text-center">PJ</th>
            <th className="px-2 py-2 text-center">G</th>
            <th className="px-2 py-2 text-center">E</th>
            <th className="px-2 py-2 text-center">P</th>
            <th className="px-2 py-2 text-center">GF</th>
            <th className="px-2 py-2 text-center">GC</th>
            <th className="px-2 py-2 text-center font-bold text-primary">Pts</th>
          </tr>
        </thead>
        <tbody>
          {group.teams.map((team, idx) => {
            const s = standings[team.code] || { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
            const isQualified = idx < 2
            return (
              <tr key={team.code} className={`border-b border-dark-3/50 last:border-0 ${isQualified && s.pj > 0 ? 'bg-primary/5' : ''}`}>
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-4">{idx + 1}</span>
                    <span className="text-base">{team.flag}</span>
                    <span className="text-sm font-medium text-white truncate max-w-[100px]">{team.name}</span>
                    {isQualified && s.pj > 0 && (
                      <span className="text-xs bg-primary/20 text-primary px-1 rounded">Q</span>
                    )}
                  </div>
                </td>
                <td className="px-2 py-2.5 text-center text-sm text-gray-400">{s.pj}</td>
                <td className="px-2 py-2.5 text-center text-sm text-gray-400">{s.g}</td>
                <td className="px-2 py-2.5 text-center text-sm text-gray-400">{s.e}</td>
                <td className="px-2 py-2.5 text-center text-sm text-gray-400">{s.p}</td>
                <td className="px-2 py-2.5 text-center text-sm text-gray-400">{s.gf}</td>
                <td className="px-2 py-2.5 text-center text-sm text-gray-400">{s.gc}</td>
                <td className="px-2 py-2.5 text-center text-sm font-bold text-white">{s.pts}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default function Grupos() {
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [standings, setStandings] = useState({})

  useEffect(() => {
    supabase.from('match_results').select('*').then(({ data }) => {
      if (!data) return
      const calc = {}
      data.forEach(r => {
        if (r.home_goals === null || r.away_goals === null) return
        const homeWin = r.home_goals > r.away_goals
        const awayWin = r.away_goals > r.home_goals
        const draw = r.home_goals === r.away_goals
        if (!calc[r.home_code]) calc[r.home_code] = { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
        if (!calc[r.away_code]) calc[r.away_code] = { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
        calc[r.home_code].pj++; calc[r.away_code].pj++
        calc[r.home_code].gf += r.home_goals; calc[r.home_code].gc += r.away_goals
        calc[r.away_code].gf += r.away_goals; calc[r.away_code].gc += r.home_goals
        if (homeWin) { calc[r.home_code].g++; calc[r.home_code].pts += 3; calc[r.away_code].p++ }
        else if (awayWin) { calc[r.away_code].g++; calc[r.away_code].pts += 3; calc[r.home_code].p++ }
        else { calc[r.home_code].e++; calc[r.home_code].pts++; calc[r.away_code].e++; calc[r.away_code].pts++ }
      })
      setStandings(calc)
    })
  }, [])

  const groupLetters = GROUPS.map(g => g.id)

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-3">
        <h1 className="text-2xl font-extrabold">Grupos</h1>
        <p className="text-gray-400 text-sm">Fase de grupos · 12 grupos · 48 equipos</p>
      </div>

      {/* Group filter */}
      <div className="px-4 overflow-x-auto mb-3">
        <div className="flex gap-2 pb-2 min-w-max">
          <button
            onClick={() => setSelectedGroup(null)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              selectedGroup === null ? 'bg-primary text-dark' : 'bg-dark-3 text-gray-400'
            }`}
          >
            Todos
          </button>
          {groupLetters.map(g => (
            <button
              key={g}
              onClick={() => setSelectedGroup(g)}
              className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                selectedGroup === g ? 'bg-primary text-dark' : 'bg-dark-3 text-gray-400'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-24 space-y-4">
        {GROUPS
          .filter(g => selectedGroup === null || g.id === selectedGroup)
          .map(group => (
            <StandingsTable key={group.id} group={group} standings={standings} />
          ))}
      </div>
    </div>
  )
}
