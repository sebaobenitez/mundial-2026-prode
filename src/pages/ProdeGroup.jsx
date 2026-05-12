import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { GROUP_MATCHES, KNOCKOUT_MATCHES } from '../data/matches'
import { SCORING } from '../data/groups'
import { etToArg } from '../lib/timeUtils'
import { flag } from '../lib/flags'

const ALL_MATCHES = [...GROUP_MATCHES, ...KNOCKOUT_MATCHES]

function calculatePoints(prediction, result) {
  if (!result || result.home_goals === null) return null
  let pts = 0
  const predHome = parseInt(prediction.home_goals)
  const predAway = parseInt(prediction.away_goals)
  const resHome = result.home_goals
  const resAway = result.away_goals
  if (predHome === resHome && predAway === resAway) {
    pts += SCORING.EXACT_RESULT
  } else {
    const predWinner = predHome > predAway ? 'home' : predAway > predHome ? 'away' : 'draw'
    const resWinner = resHome > resAway ? 'home' : resAway > resHome ? 'away' : 'draw'
    if (predWinner === resWinner) pts += SCORING.CORRECT_WINNER
  }
  if (prediction.scorer && result.scorers?.includes(prediction.scorer)) {
    pts += SCORING.CORRECT_SCORER
  }
  return pts
}

function PredictionModal({ match, existing, onSave, onClose }) {
  const [homeGoals, setHomeGoals] = useState(existing?.home_goals ?? '')
  const [awayGoals, setAwayGoals] = useState(existing?.away_goals ?? '')
  const [scorer, setScorer] = useState(existing?.scorer ?? '')
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    if (homeGoals === '' || awayGoals === '') return
    setSaving(true)
    await onSave({ home_goals: parseInt(homeGoals), away_goals: parseInt(awayGoals), scorer })
    setSaving(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-end z-50" onClick={onClose}>
      <div className="bg-dark-2 rounded-t-3xl w-full p-6 pb-10" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-extrabold text-lg">Tu predicción</h3>
          <button onClick={onClose} className="text-gray-400 text-2xl">×</button>
        </div>

        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-6">
            <span className="font-bold text-lg flex-1 text-right">{match.home} {flag(match.home)}</span>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="0"
                max="20"
                value={homeGoals}
                onChange={e => setHomeGoals(e.target.value)}
                className="w-16 h-16 text-center text-2xl font-black bg-dark-3 border-2 border-dark-4 focus:border-primary rounded-2xl outline-none text-white"
                placeholder="0"
              />
              <span className="text-gray-500 text-2xl font-bold">-</span>
              <input
                type="number"
                min="0"
                max="20"
                value={awayGoals}
                onChange={e => setAwayGoals(e.target.value)}
                className="w-16 h-16 text-center text-2xl font-black bg-dark-3 border-2 border-dark-4 focus:border-primary rounded-2xl outline-none text-white"
                placeholder="0"
              />
            </div>
            <span className="font-bold text-lg flex-1 text-left">{flag(match.away)} {match.away}</span>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">Goleador del partido (opcional, +1 pt)</label>
          <input
            className="input-field"
            placeholder="ej: Messi, Mbappé, Vinicius..."
            value={scorer}
            onChange={e => setScorer(e.target.value)}
          />
        </div>

        <button onClick={handleSave} disabled={saving || homeGoals === '' || awayGoals === ''} className="btn-primary">
          {saving ? 'Guardando...' : 'Guardar predicción'}
        </button>
      </div>
    </div>
  )
}

export default function ProdeGroup() {
  const { groupId } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [group, setGroup] = useState(null)
  const [members, setMembers] = useState([])
  const [predictions, setPredictions] = useState([])
  const [results, setResults] = useState([])
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [activeTab, setActiveTab] = useState('predicciones')
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadAll() }, [groupId])

  async function loadAll() {
    const [{ data: g }, { data: m }, { data: p }, { data: r }] = await Promise.all([
      supabase.from('prode_groups').select('*').eq('id', groupId).single(),
      supabase.from('prode_members').select('user:profiles(id, username)').eq('group_id', groupId),
      supabase.from('predictions').select('*').eq('group_id', groupId),
      supabase.from('match_results').select('*'),
    ])
    setGroup(g)
    setMembers(m?.map(x => x.user) || [])
    setPredictions(p || [])
    setResults(r || [])
    setLoading(false)
  }

  async function savePrediction({ home_goals, away_goals, scorer }) {
    const existing = predictions.find(p => p.match_id === selectedMatch.id && p.user_id === user.id)
    if (existing) {
      await supabase.from('predictions')
        .update({ home_goals, away_goals, scorer })
        .eq('id', existing.id)
    } else {
      await supabase.from('predictions')
        .insert({ match_id: selectedMatch.id, group_id: groupId, user_id: user.id, home_goals, away_goals, scorer })
    }
    loadAll()
  }

  function getLeaderboard() {
    return members.map(member => {
      let totalPts = 0
      predictions.filter(p => p.user_id === member.id).forEach(pred => {
        const result = results.find(r => r.match_id === pred.match_id)
        const pts = calculatePoints(pred, result)
        if (pts !== null) totalPts += pts
      })
      return { ...member, points: totalPts }
    }).sort((a, b) => b.points - a.points)
  }

  const myPredictions = predictions.filter(p => p.user_id === user.id)
  const upcomingMatches = ALL_MATCHES.filter(m =>
    m.home !== 'TBD' &&
    new Date(m.date) >= new Date(new Date().toISOString().split('T')[0])
  ).slice(0, 20)

  if (loading) return <div className="flex items-center justify-center h-full"><div className="text-primary font-bold">Cargando...</div></div>
  if (!group) return <div className="px-4 py-6 text-gray-400">Grupo no encontrado</div>

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-3">
        <button onClick={() => navigate('/prode')} className="text-gray-400 text-sm mb-2">← Volver</button>
        <h1 className="text-xl font-extrabold">{group.name}</h1>
        <p className="text-gray-400 text-sm">Código: <span className="text-primary font-mono font-bold">{group.code}</span> · {members.length}/10 participantes</p>
      </div>

      {/* Tabs */}
      <div className="px-4 flex gap-2 mb-3">
        {['predicciones', 'tabla'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all capitalize ${
              activeTab === tab ? 'bg-primary text-dark' : 'bg-dark-3 text-gray-400'
            }`}
          >
            {tab === 'predicciones' ? 'Mis predicciones' : 'Tabla'}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-24">
        {activeTab === 'predicciones' && (
          <div className="space-y-3">
            {upcomingMatches.map(match => {
              const myPred = myPredictions.find(p => p.match_id === match.id)
              return (
                <button
                  key={match.id}
                  onClick={() => setSelectedMatch(match)}
                  className="card w-full text-left hover:border-primary/40 transition-colors active:scale-95"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-gray-500">
                      {new Date(match.date + 'T12:00:00').toLocaleDateString('es-AR', { day: 'numeric', month: 'short', timeZone: 'America/Argentina/Buenos_Aires' })}
                      {match.group && ` · Grupo ${match.group}`} · <span className="text-primary">{etToArg(match.time)} ARG</span>
                    </span>
                    {myPred ? (
                      <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">✓ Predicho</span>
                    ) : (
                      <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">Pendiente</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm flex-1 text-right">{match.home} {flag(match.home)}</span>
                    <div className="mx-4 text-center">
                      {myPred ? (
                        <span className="font-black text-primary">{myPred.home_goals} - {myPred.away_goals}</span>
                      ) : (
                        <span className="text-gray-600 font-bold">? - ?</span>
                      )}
                    </div>
                    <span className="font-bold text-sm flex-1">{flag(match.away)} {match.away}</span>
                  </div>
                  {myPred?.scorer && (
                    <div className="text-xs text-blue-400 mt-1 text-center">⚽ {myPred.scorer}</div>
                  )}
                </button>
              )
            })}
          </div>
        )}

        {activeTab === 'tabla' && (
          <div className="space-y-2">
            <div className="card bg-primary/5 border-primary/20 mb-4">
              <p className="text-xs text-gray-400 text-center">Puntos se actualizan cuando se cargan resultados oficiales</p>
            </div>
            {getLeaderboard().map((member, idx) => (
              <div key={member.id} className={`card flex items-center gap-3 ${member.id === user.id ? 'border-primary/40' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${
                  idx === 0 ? 'bg-yellow-500 text-dark' :
                  idx === 1 ? 'bg-gray-400 text-dark' :
                  idx === 2 ? 'bg-amber-700 text-white' :
                  'bg-dark-3 text-gray-400'
                }`}>
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <div className="font-bold">{member.username}</div>
                  {member.id === user.id && <div className="text-xs text-primary">Vos</div>}
                </div>
                <div className="text-right">
                  <div className="font-black text-xl text-primary">{member.points}</div>
                  <div className="text-xs text-gray-500">puntos</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedMatch && (
        <PredictionModal
          match={selectedMatch}
          existing={myPredictions.find(p => p.match_id === selectedMatch.id)}
          onSave={savePrediction}
          onClose={() => setSelectedMatch(null)}
        />
      )}
    </div>
  )
}
