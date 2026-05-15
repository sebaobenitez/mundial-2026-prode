import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/app', label: 'Inicio', icon: '🏠', exact: true },
  { to: '/app/fixture', label: 'Fixture', icon: '📅' },
  { to: '/app/grupos', label: 'Grupos', icon: '🏟️' },
  { to: '/app/prode', label: 'Prode', icon: '🎯' },
  { to: '/app/perfil', label: 'Perfil', icon: '👤' },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-dark-2 border-t border-dark-3 safe-bottom z-40 max-w-lg mx-auto">
      <div className="flex">
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.exact}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center py-3 text-xs transition-colors ${
                isActive ? 'text-primary' : 'text-gray-500'
              }`
            }
          >
            <span className="text-xl mb-0.5">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
