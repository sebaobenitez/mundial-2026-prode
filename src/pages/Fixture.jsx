import { useState, useEffect } from 'react'
import { GROUP_MATCHES, KNOCKOUT_MATCHES } from '../data/matches'
import { etToArg } from '../lib/timeUtils'
import { flag } from '../lib/flags'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

const TABS = [
  { key: 'grupos', label: 'Grupos' },
  { key: 'R32', label: 'R32' },
  { key: 'R16', label: 'Octavos' },
  { key: 'QF', label: 'Cuartos' },
  { key: 'SF', label: 'Semis' },
  { key: 'FINAL', label: 'Final' },
]

// Mapa nombre de equipo → código (para calcular tabla de posiciones)
const NAME_TO_CODE = {
  'México': 'MEX', 'Corea del Sur': 'KOR', 'Sudáfrica': 'RSA', 'Chequia': 'CZE',
  'Canadá': 'CAN', 'Qatar': 'QAT', 'Suiza': 'SUI', 'Bosnia y Herzegovina': 'BIH',
  'Brasil': 'BRA', 'Marruecos': 'MAR', 'Escocia': 'SCO', 'Haití': 'HAI',
  'Estados Unidos': 'USA', 'Paraguay': 'PAR', 'Australia': 'AUS', 'Turquía': 'TUR',
  'Alemania': 'GER', 'Ecuador': 'ECU', 'Costa de Marfil': 'CIV', 'Curazao': 'CUW',
  'Países Bajos': 'NED', 'Japón': 'JPN', 'Túnez': 'TUN', 'Suecia': 'SWE',
  'Bélgica': 'BEL', 'Irán': 'IRN', 'Egipto': 'EGY', 'Nueva Zelanda': 'NZL',
  'España': 'ESP', 'Uruguay': 'URU', 'Arabia Saudita': 'KSA', 'Cabo Verde': 'CPV',
  'Francia': 'FRA', 'Senegal': 'SEN', 'Noruega': 'NOR', 'Irak': 'IRQ',
  'Argentina': 'ARG', 'Austria': 'AUT', 'Argelia': 'ALG', 'Jordania': 'JOR',
  'Portugal': 'POR', 'Colombia': 'COL', 'Uzbekistán': 'UZB', 'RD Congo': 'COD',
  'Inglaterra': 'ENG', 'Croacia': 'CRO', 'Ghana': 'GHA', 'Panamá': 'PAN',
}

function formatDate(dateStr) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('es-AR', {
    weekday: 'short', day: 'numeric', month: 'short', timeZone: 'America/Argentina/Buenos_Aires'
  })
}

// ── MODAL PARA CARGAR RESULTADO ─────────────────────────────────────────────
function ResultModal({ match, existing, onSave, onClose }) {
  const [homeGoals, setHomeGoals] = useState(existing?.home_goals ?? '')
  const [awayGoals, setAwayGoals] = useState(existing?.away_goals ?? '')
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    if (homeGoals === '' || awayGoals === '') return
    setSaving(true)
    await onSave(parseInt(homeGoals), parseInt(awayGoals))
    setSaving(false)
    onClose()
  }

  async function handleDelete() {
    if (!existing) return
    setSaving(true)
    await supabase.from('match_results').delete().eq('match_id', match.id)
    setSaving(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-end z-50" onClick={onClose}>
      <div className="bg-dark-2 rounded-t-3xl w-full p-6 pb-10" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-extrabold text-lg">Cargar resultado</h3>
          <button onClick={onClose} className="text-gray-400 text-2xl leading-none">×</button>
        </div>
        <p className="text-xs text-gray-500 mb-6">
          {formatDate(match.date)} · {etToArg(match.time)} ARG · {match.city}
        </p>

        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="font-bold text-sm flex-1 text-right leading-tight">
            {match.home} {flag(match.home)}
          </span>
          <div className="flex items-center gap-3">
            <input
              type="number" min="0" max="20"
              value={homeGoals}
              onChange={e => setHomeGoals(e.target.value)}
              className="w-16 h-16 text-center text-2xl font-black bg-dark-3 border-2 border-dark-4 focus:border-primary rounded-2xl outline-none text-white"
              placeholder="0"
            />
            <span className="text-gray-500 text-2xl font-bold">-</span>
            <input
              type="number" min="0" max="20"
              value={awayGoals}
              onChange={e => setAwayGoals(e.target.value)}
              className="w-16 h-16 text-center text-2xl font-black bg-dark-3 border-2 border-dark-4 focus:border-primary rounded-2xl outline-none text-white"
              placeholder="0"
            />
          </div>
          <span className="font-bold text-sm flex-1 leading-tight">
            {flag(match.away)} {match.away}
          </span>
        </div>

        <button
          onClick={handleSave}
          disabled={saving || homeGoals === '' || awayGoals === ''}
          className="btn-primary mb-3"
        >
          {saving ? 'Guardando...' : existing ? 'Actualizar resultado' : 'Guardar resultado'}
        </button>

        {existing && (
          <button
            onClick={handleDelete}
            disabled={saving}
            className="w-full py-3 rounded-2xl text-red-400 text-sm font-semibold bg-red-500/10 active:scale-95 transition-all"
          >
            Borrar resultado
          </button>
        )}
      </div>
    </div>
  )
}

// ── TARJETA DE PARTIDO ───────────────────────────────────────────────────────
function MatchCard({ match, result, onEdit, canEdit }) {
  const hasResult = result !== null && result !== undefined
  const isTBD = match.home === 'TBD'

  return (
    <div
      className={`card transition-colors ${canEdit && !isTBD ? 'cursor-pointer active:scale-95 hover:border-primary/40' : ''}`}
      onClick={() => canEdit && !isTBD && onEdit(match)}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-500">
          {formatDate(match.date)} · <span className="text-primary font-semibold">{etToArg(match.time)} ARG</span>
        </span>
        <div className="flex items-center gap-2">
          {match.group && (
            <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-medium">
              Grupo {match.group}
            </span>
          )}
          {match.label && !match.group && (
            <span className="text-xs bg-dark-3 text-gray-300 px-2 py-0.5 rounded-full">
              {match.label}
            </span>
          )}
          {hasResult
            ? <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">✓ Final</span>
            : canEdit && !isTBD && <span className="text-xs text-gray-600">✏️</span>
          }
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 text-right">
          <span className={`font-bold text-sm ${hasResult && result.home_goals > result.away_goals ? 'text-primary' : 'text-white'}`}>
            {match.home} {flag(match.home)}
          </span>
        </div>

        <div className="flex items-center gap-2 min-w-[80px] justify-center">
          {hasResult ? (
            <div className="flex items-center gap-1 bg-dark-3 rounded-lg px-3 py-1.5">
              <span className="font-black text-white text-lg">{result.home_goals}</span>
              <span className="text-gray-500 text-sm">-</span>
              <span className="font-black text-white text-lg">{result.away_goals}</span>
            </div>
          ) : (
            <div className="bg-dark-3 rounded-lg px-3 py-1.5 text-gray-500 font-bold text-sm">
              vs
            </div>
          )}
        </div>

        <div className="flex-1 text-left">
          <span className={`font-bold text-sm ${hasResult && result.away_goals > result.home_goals ? 'text-primary' : 'text-white'}`}>
            {flag(match.away)} {match.away}
          </span>
        </div>
      </div>

      <div className="text-center mt-2 text-xs text-gray-600">{match.city}</div>
    </div>
  )
}

// ── PANTALLA PRINCIPAL ───────────────────────────────────────────────────────
export default function Fixture() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('grupos')
  const [selectedGroup, setSelectedGroup] = useState('A')
  const [results, setResults] = useState({})
  const [selectedMatch, setSelectedMatch] = useState(null)

  const groupLetters = ['A','B','C','D','E','F','G','H','I','J','K','L']
  const canEdit = !!user

  useEffect(() => { loadResults() }, [])

  async function loadResults() {
    const { data } = await supabase.from('match_results').select('*')
    if (data) {
      const map = {}
      data.forEach(r => { map[r.match_id] = r })
      setResults(map)
    }
  }

  async function saveResult(homeGoals, awayGoals) {
    await supabase.from('match_results').upsert(
      {
        match_id: selectedMatch.id,
        home_goals: homeGoals,
        away_goals: awayGoals,
        home_code: NAME_TO_CODE[selectedMatch.home] ?? null,
        away_code: NAME_TO_CODE[selectedMatch.away] ?? null,
        is_finished: true,
      },
      { onConflict: 'match_id' }
    )
    loadResults()
  }

  function getKnockoutMatches(stage) {
    return KNOCKOUT_MATCHES.filter(m => m.stage === stage)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-2xl font-extrabold">Fixture</h1>
        <p className="text-gray-400 text-sm">
          Mundial FIFA 2026
          {canEdit && <span className="text-primary ml-2 text-xs">· Tocá un partido para cargar resultado</span>}
        </p>
      </div>

      {/* Tabs */}
      <div className="px-4 overflow-x-auto">
        <div className="flex gap-2 pb-2 min-w-max">
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.key ? 'bg-primary text-dark' : 'bg-dark-3 text-gray-400 hover:bg-dark-4'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-24 pt-2">
        {activeTab === 'grupos' && (
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {groupLetters.map(g => (
                <button
                  key={g}
                  onClick={() => setSelectedGroup(g)}
                  className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                    selectedGroup === g ? 'bg-primary text-dark' : 'bg-dark-3 text-gray-400 hover:bg-dark-4'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              {GROUP_MATCHES.filter(m => m.group === selectedGroup).map(match => (
                <MatchCard
                  key={match.id}
                  match={match}
                  result={results[match.id]}
                  onEdit={setSelectedMatch}
                  canEdit={canEdit}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab !== 'grupos' && (
          <div className="space-y-3">
            <div className="text-center py-2 text-gray-400 text-sm">
              {activeTab === 'FINAL' ? '🏆 El partido más esperado' : `${getKnockoutMatches(activeTab).length} partidos`}
            </div>
            {getKnockoutMatches(activeTab).map(match => (
              <MatchCard
                key={match.id}
                match={match}
                result={results[match.id]}
                onEdit={setSelectedMatch}
                canEdit={canEdit}
              />
            ))}
          </div>
        )}
      </div>

      {selectedMatch && (
        <ResultModal
          match={selectedMatch}
          existing={results[selectedMatch.id]}
          onSave={saveResult}
          onClose={() => { setSelectedMatch(null); loadResults() }}
        />
      )}
    </div>
  )
}
