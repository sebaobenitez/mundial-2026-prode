import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Fixture from './pages/Fixture'
import Grupos from './pages/Grupos'
import Prode from './pages/Prode'
import ProdeGroup from './pages/ProdeGroup'
import Profile from './pages/Profile'

function RedirectProdeGroup() {
  const { groupId } = useParams()
  return <Navigate to={`/app/prode/${groupId}`} replace />
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return (
    <div className="min-h-screen bg-dark flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl mb-4">⚽</div>
        <div className="text-primary font-bold text-lg">Cargando...</div>
      </div>
    </div>
  )
  return user ? children : <Navigate to="/login" replace />
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return null
  return !user ? children : <Navigate to="/app" replace />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

          {/* Redirects de rutas viejas → nuevas (compatibilidad con historial/PWA) */}
          <Route path="/fixture" element={<Navigate to="/app/fixture" replace />} />
          <Route path="/grupos" element={<Navigate to="/app/grupos" replace />} />
          <Route path="/prode" element={<Navigate to="/app/prode" replace />} />
          <Route path="/prode/:groupId" element={<RedirectProdeGroup />} />
          <Route path="/perfil" element={<Navigate to="/app/perfil" replace />} />

          <Route path="/app" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Home />} />
            <Route path="fixture" element={<Fixture />} />
            <Route path="grupos" element={<Grupos />} />
            <Route path="prode" element={<Prode />} />
            <Route path="prode/:groupId" element={<ProdeGroup />} />
            <Route path="perfil" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
