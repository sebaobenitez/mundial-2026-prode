import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export default function Prode() {
  const { user, profile } = useAuth()
  const [myGroups, setMyGroups] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [showJoin, setShowJoin] = useState(false)
  const [groupName, setGroupName] = useState('')
  const [joinCode, setJoinCode] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (profile) loadMyGroups()
  }, [profile])

  async function loadMyGroups() {
    setLoading(true)
    const { data } = await supabase
      .from('prode_members')
      .select('prode_group:prode_groups(id, name, code, created_by)')
      .eq('user_id', user.id)
    setMyGroups(data?.map(d => d.prode_group) || [])
    setLoading(false)
  }

  async function handleCreate(e) {
    e.preventDefault()
    setError('')
    if (myGroups.length >= 5) return setError('Podés estar en máximo 5 grupos')
    const code = generateCode()
    const { data: group, error: err } = await supabase
      .from('prode_groups')
      .insert({ name: groupName, code, created_by: user.id })
      .select()
      .single()
    if (err) return setError('Error al crear el grupo')
    await supabase.from('prode_members').insert({ group_id: group.id, user_id: user.id })
    setSuccess(`Grupo creado. Código: ${code}`)
    setGroupName('')
    setShowCreate(false)
    loadMyGroups()
  }

  async function handleJoin(e) {
    e.preventDefault()
    setError('')
    const { data: group } = await supabase
      .from('prode_groups')
      .select('*')
      .eq('code', joinCode.toUpperCase())
      .single()
    if (!group) return setError('Código no encontrado')
    const { data: members } = await supabase
      .from('prode_members')
      .select('id')
      .eq('group_id', group.id)
    if (members?.length >= 10) return setError('El grupo ya tiene 10 participantes (máximo)')
    const alreadyIn = members?.find(m => m.user_id === user.id)
    if (alreadyIn) return setError('Ya estás en este grupo')
    await supabase.from('prode_members').insert({ group_id: group.id, user_id: user.id })
    setSuccess(`Te uniste a "${group.name}"`)
    setJoinCode('')
    setShowJoin(false)
    loadMyGroups()
  }

  return (
    <div className="px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold">Mi Prode</h1>
        <p className="text-gray-400 text-sm">Competí con tus amigos</p>
      </div>

      {/* Scoring info */}
      <div className="card mb-6 bg-primary/5 border-primary/20">
        <h3 className="font-bold text-primary mb-3">Sistema de puntos</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-300">Resultado exacto (ej: 2-1)</span>
            <span className="font-bold text-primary">3 pts</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Ganador correcto</span>
            <span className="font-bold text-yellow-400">1 pt</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Goleador correcto</span>
            <span className="font-bold text-blue-400">+1 pt</span>
          </div>
        </div>
      </div>

      {success && (
        <div className="bg-primary/10 border border-primary/30 text-primary text-sm rounded-xl px-4 py-3 mb-4">
          {success}
        </div>
      )}

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={() => { setShowCreate(!showCreate); setShowJoin(false); setError('') }}
          className="btn-primary"
        >
          + Crear grupo
        </button>
        <button
          onClick={() => { setShowJoin(!showJoin); setShowCreate(false); setError('') }}
          className="btn-secondary"
        >
          Unirme a grupo
        </button>
      </div>

      {/* Create form */}
      {showCreate && (
        <form onSubmit={handleCreate} className="card mb-4 space-y-3">
          <h3 className="font-bold">Nuevo grupo</h3>
          <input
            className="input-field"
            placeholder="Nombre del grupo (ej: Los Pibes)"
            value={groupName}
            onChange={e => setGroupName(e.target.value)}
            required
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" className="btn-primary">Crear</button>
        </form>
      )}

      {/* Join form */}
      {showJoin && (
        <form onSubmit={handleJoin} className="card mb-4 space-y-3">
          <h3 className="font-bold">Unirme a un grupo</h3>
          <input
            className="input-field uppercase"
            placeholder="Código del grupo (ej: AB12CD)"
            value={joinCode}
            onChange={e => setJoinCode(e.target.value)}
            required
            maxLength={6}
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" className="btn-primary">Unirme</button>
        </form>
      )}

      {/* My groups */}
      <div>
        <h2 className="font-bold text-lg mb-3">Mis grupos ({myGroups.length}/5)</h2>
        {loading ? (
          <div className="text-center py-8 text-gray-500">Cargando...</div>
        ) : myGroups.length === 0 ? (
          <div className="card text-center py-10">
            <div className="text-4xl mb-3">🎯</div>
            <p className="text-gray-400">Creá o unite a un grupo para empezar a predecir</p>
          </div>
        ) : (
          <div className="space-y-3">
            {myGroups.map(g => (
              <Link key={g.id} to={`/prode/${g.id}`} className="card flex justify-between items-center hover:border-primary/30 transition-colors active:scale-95">
                <div>
                  <div className="font-bold">{g.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Código: <span className="text-primary font-mono font-bold">{g.code}</span>
                    {g.created_by === user.id && <span className="ml-2 text-yellow-400">· Admin</span>}
                  </div>
                </div>
                <span className="text-gray-400 text-lg">›</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
