import { useState } from 'react'
import { GROUP_MATCHES, KNOCKOUT_MATCHES } from '../data/matches'
import { etToArg } from '../lib/timeUtils'
import { flag } from '../lib/flags'

const TABS = [
  { key: 'grupos', label: 'Grupos' },
  { key: 'R32', label: 'R32' },
  { key: 'R16', label: 'Octavos' },
  { key: 'QF', label: 'Cuartos' },
  { key: 'SF', label: 'Semis' },
  { key: 'FINAL', label: 'Final' },
]

function formatDate(dateStr) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('es-AR', {
    weekday: 'short', day: 'numeric', month: 'short', timeZone: 'America/Argentina/Buenos_Aires'
  })
}

function MatchCard({ match, showGroup = false }) {
  const hasResult = match.home_goals !== undefined && match.home_goals !== null
  const isFinished = hasResult

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-500">{formatDate(match.date)} · <span className="text-primary font-semibold">{etToArg(match.time)} ARG</span></span>
        {showGroup && match.group && (
          <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-medium">
            Grupo {match.group}
          </span>
        )}
        {match.label && (
          <span className="text-xs bg-dark-3 text-gray-300 px-2 py-0.5 rounded-full">
            {match.label}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 text-right">
          <span className="font-bold text-white text-sm">{match.home} {flag(match.home)}</span>
        </div>

        <div className="flex items-center gap-2 min-w-[80px] justify-center">
          {isFinished ? (
            <div className="flex items-center gap-1 bg-dark-3 rounded-lg px-3 py-1.5">
              <span className="font-black text-white text-lg">{match.home_goals}</span>
              <span className="text-gray-500 text-sm">-</span>
              <span className="font-black text-white text-lg">{match.away_goals}</span>
            </div>
          ) : (
            <div className="bg-dark-3 rounded-lg px-3 py-1.5 text-gray-500 font-bold text-sm">
              vs
            </div>
          )}
        </div>

        <div className="flex-1 text-left">
          <span className="font-bold text-white text-sm">{flag(match.away)} {match.away}</span>
        </div>
      </div>

      <div className="text-center mt-2 text-xs text-gray-600">
        {match.city} · <span className="text-primary font-medium">{etToArg(match.time)} ARG</span>
      </div>
    </div>
  )
}

export default function Fixture() {
  const [activeTab, setActiveTab] = useState('grupos')
  const [selectedGroup, setSelectedGroup] = useState('A')

  const groupLetters = ['A','B','C','D','E','F','G','H','I','J','K','L']

  function getKnockoutMatches(stage) {
    return KNOCKOUT_MATCHES.filter(m => m.stage === stage)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-2xl font-extrabold">Fixture</h1>
        <p className="text-gray-400 text-sm">Mundial FIFA 2026</p>
      </div>

      {/* Tabs */}
      <div className="px-4 overflow-x-auto">
        <div className="flex gap-2 pb-2 min-w-max">
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.key
                  ? 'bg-primary text-dark'
                  : 'bg-dark-3 text-gray-400 hover:bg-dark-4'
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
            {/* Group selector */}
            <div className="flex flex-wrap gap-2 mb-4">
              {groupLetters.map(g => (
                <button
                  key={g}
                  onClick={() => setSelectedGroup(g)}
                  className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                    selectedGroup === g
                      ? 'bg-primary text-dark'
                      : 'bg-dark-3 text-gray-400 hover:bg-dark-4'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {GROUP_MATCHES.filter(m => m.group === selectedGroup).map(match => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        )}

        {activeTab !== 'grupos' && (
          <div className="space-y-3">
            <div className="text-center py-2 text-gray-400 text-sm">
              {activeTab === 'FINAL'
                ? '🏆 El partido más esperado'
                : `${getKnockoutMatches(activeTab).length} partidos`}
            </div>
            {getKnockoutMatches(activeTab).map(match => (
              <MatchCard key={match.id} match={match} showGroup={false} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
