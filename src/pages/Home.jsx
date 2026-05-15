import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { GROUP_MATCHES, KNOCKOUT_MATCHES } from '../data/matches'
import { etToArg } from '../lib/timeUtils'
import { flag } from '../lib/flags'

const TODAY = new Date().toISOString().split('T')[0]

function getDaysUntil(dateStr) {
  const diff = new Date(dateStr) - new Date(TODAY)
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export default function Home() {
  const { profile } = useAuth()
  const [myGroups, setMyGroups] = useState([])
  const [recentMatches, setRecentMatches] = useState([])
  const [upcomingMatches, setUpcomingMatches] = useState([])

  const allMatches = [...GROUP_MATCHES, ...KNOCKOUT_MATCHES]

  useEffect(() => {
    const upcoming = allMatches
      .filter(m => m.date >= TODAY)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 5)
    const recent = allMatches
      .filter(m => m.date < TODAY)
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 3)
    setUpcomingMatches(upcoming)
    setRecentMatches(recent)
  }, [])

  useEffect(() => {
    if (!profile) return
    supabase
      .from('prode_members')
      .select('prode_group:prode_groups(id, name, code)')
      .eq('user_id', profile.id)
      .then(({ data }) => setMyGroups(data?.map(d => d.prode_group) || []))
  }, [profile])

  const daysUntilStart = getDaysUntil('2026-06-11')

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Header */}
      <div className="card bg-gradient-to-br from-primary/20 to-dark-2 border-primary/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Hola,</p>
            <h1 className="text-2xl font-extrabold text-white">{profile?.username || 'Jugador'} 👋</h1>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black text-primary">{daysUntilStart > 0 ? daysUntilStart : 0}</div>
            <div className="text-xs text-gray-400">días para el Mundial</div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-dark-3 flex gap-4 text-sm">
          <div>
            <span className="text-primary font-bold">11 Jun</span>
            <span className="text-gray-400"> – Inicio</span>
          </div>
          <div>
            <span className="text-primary font-bold">19 Jul</span>
            <span className="text-gray-400"> – Final</span>
          </div>
          <div>
            <span className="text-primary font-bold">48</span>
            <span className="text-gray-400"> selecciones</span>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3">
        <Link to="/app/fixture" className="card flex flex-col items-center py-5 hover:border-primary/50 transition-colors active:scale-95">
          <span className="text-3xl mb-2">📅</span>
          <span className="font-semibold text-sm">Fixture</span>
          <span className="text-xs text-gray-500 mt-0.5">104 partidos</span>
        </Link>
        <Link to="/app/grupos" className="card flex flex-col items-center py-5 hover:border-primary/50 transition-colors active:scale-95">
          <span className="text-3xl mb-2">🏟️</span>
          <span className="font-semibold text-sm">Grupos</span>
          <span className="text-xs text-gray-500 mt-0.5">12 grupos</span>
        </Link>
        <Link to="/app/prode" className="card flex flex-col items-center py-5 hover:border-primary/50 transition-colors active:scale-95">
          <span className="text-3xl mb-2">🎯</span>
          <span className="font-semibold text-sm">Mi Prode</span>
          <span className="text-xs text-gray-500 mt-0.5">Predecí resultados</span>
        </Link>
        <Link to="/app/perfil" className="card flex flex-col items-center py-5 hover:border-primary/50 transition-colors active:scale-95">
          <span className="text-3xl mb-2">👤</span>
          <span className="font-semibold text-sm">Mi Perfil</span>
          <span className="text-xs text-gray-500 mt-0.5">Stats y puntos</span>
        </Link>
      </div>

      {/* Próximos partidos */}
      {upcomingMatches.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-lg">Próximos partidos</h2>
            <Link to="/app/fixture" className="text-primary text-sm font-medium">Ver todos</Link>
          </div>
          <div className="space-y-2">
            {upcomingMatches.map(match => (
              <div key={match.id} className="card flex items-center justify-between py-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <span>{flag(match.home)} {match.home}</span>
                    <span className="text-gray-500">vs</span>
                    <span>{flag(match.away)} {match.away}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{match.city} · <span className="text-primary font-medium">{etToArg(match.time)} ARG</span></div>
                </div>
                <div className="text-right">
                  <div className="text-primary font-bold text-sm">
                    {new Date(match.date).toLocaleDateString('es-AR', { day: 'numeric', month: 'short', timeZone: 'America/Argentina/Buenos_Aires' })}
                  </div>
                  {match.group && <div className="text-xs text-gray-500">Grupo {match.group}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mis grupos de prode */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-lg">Mis grupos prode</h2>
          <Link to="/app/prode" className="text-primary text-sm font-medium">Gestionar</Link>
        </div>
        {myGroups.length === 0 ? (
          <div className="card text-center py-8">
            <div className="text-4xl mb-2">🎯</div>
            <p className="text-gray-400 text-sm">No estás en ningún grupo todavía</p>
            <Link to="/app/prode" className="text-primary text-sm font-semibold mt-2 inline-block">
              Crear o unirte a uno →
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {myGroups.map(g => (
              <Link key={g.id} to={`/app/prode/${g.id}`} className="card flex justify-between items-center active:scale-95">
                <div>
                  <div className="font-semibold">{g.name}</div>
                  <div className="text-xs text-gray-500">Código: {g.code}</div>
                </div>
                <span className="text-gray-400">›</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
