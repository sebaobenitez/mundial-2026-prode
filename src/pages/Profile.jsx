import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { profile, signOut, updateProfile } = useAuth()
  const [editing, setEditing] = useState(false)
  const [username, setUsername] = useState(profile?.username || '')
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    try {
      await updateProfile({ username })
      setSuccess(true)
      setEditing(false)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const initials = profile?.username?.slice(0, 2).toUpperCase() || '??'

  return (
    <div className="px-4 py-6 space-y-6">
      <h1 className="text-2xl font-extrabold">Mi Perfil</h1>

      {/* Avatar & info */}
      <div className="card flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-primary/20 border-2 border-primary/40 flex items-center justify-center">
          <span className="text-primary font-black text-xl">{initials}</span>
        </div>
        <div className="flex-1">
          <div className="font-extrabold text-xl">{profile?.username}</div>
          <div className="text-gray-400 text-sm">{profile?.email}</div>
        </div>
      </div>

      {success && (
        <div className="bg-primary/10 border border-primary/30 text-primary text-sm rounded-xl px-4 py-3">
          Perfil actualizado correctamente
        </div>
      )}

      {/* Edit form */}
      {editing ? (
        <form onSubmit={handleSave} className="card space-y-4">
          <h3 className="font-bold">Editar perfil</h3>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Nombre de usuario</label>
            <input
              className="input-field"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Guardando...' : 'Guardar'}
            </button>
            <button type="button" onClick={() => setEditing(false)} className="btn-secondary">
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <button onClick={() => setEditing(true)} className="btn-secondary">
          Editar perfil
        </button>
      )}

      {/* Mundial info */}
      <div className="card space-y-3">
        <h3 className="font-bold text-primary">Mundial 2026</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-dark-3 rounded-xl p-3 text-center">
            <div className="text-2xl font-black text-white">104</div>
            <div className="text-gray-500 text-xs mt-0.5">Partidos totales</div>
          </div>
          <div className="bg-dark-3 rounded-xl p-3 text-center">
            <div className="text-2xl font-black text-white">48</div>
            <div className="text-gray-500 text-xs mt-0.5">Selecciones</div>
          </div>
          <div className="bg-dark-3 rounded-xl p-3 text-center">
            <div className="text-2xl font-black text-white">12</div>
            <div className="text-gray-500 text-xs mt-0.5">Grupos</div>
          </div>
          <div className="bg-dark-3 rounded-xl p-3 text-center">
            <div className="text-2xl font-black text-white">3</div>
            <div className="text-gray-500 text-xs mt-0.5">Países sede</div>
          </div>
        </div>
      </div>

      {/* Install PWA info */}
      <div className="card bg-blue-500/10 border-blue-500/20">
        <h3 className="font-bold text-blue-400 mb-2">📱 Instalar en tu celular</h3>
        <p className="text-gray-300 text-sm">
          <strong>Android:</strong> tocá los 3 puntos del navegador → "Añadir a pantalla de inicio"
        </p>
        <p className="text-gray-300 text-sm mt-2">
          <strong>iPhone:</strong> tocá el ícono compartir → "Añadir a pantalla de inicio"
        </p>
      </div>

      {/* Sign out */}
      <button
        onClick={signOut}
        className="w-full py-3 rounded-xl border border-red-500/30 text-red-400 font-semibold hover:bg-red-500/10 transition-colors active:scale-95"
      >
        Cerrar sesión
      </button>
    </div>
  )
}
