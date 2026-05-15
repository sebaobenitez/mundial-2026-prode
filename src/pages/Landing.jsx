const MP_LINK = 'https://mpago.la/2iSvGXj'

const features = [
  { icon: '🗓️', title: 'Fixture completo', desc: '104 partidos — fase de grupos y eliminatorias' },
  { icon: '🎯', title: 'Sistema de puntos', desc: 'Exacto: 3 pts · Ganador: 1 pt · Goleador: +1' },
  { icon: '👥', title: 'Prode grupal', desc: 'Creá o unite a grupos con tus amigos' },
  { icon: '📱', title: 'App instalable', desc: 'Funciona en Android e iPhone, sin tienda de apps' },
]

const steps = [
  { n: '1', title: 'Realizá el pago', desc: 'Pago único de $5.000 ARS vía MercadoPago. Todas las formas de pago aceptadas.' },
  { n: '2', title: 'Recibís el link por email', desc: 'En minutos te llega el acceso exclusivo a la app en tu correo.' },
  { n: '3', title: 'Instalá y jugá', desc: 'Creá tu cuenta, armá tu grupo y empezá a predecir partidos.' },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
        <div className="max-w-lg mx-auto px-6 pt-16 pb-10 text-center">
          <div className="text-7xl mb-4">⚽</div>
          <h1 className="text-4xl font-extrabold text-white leading-tight mb-3">
            Prode Mundial<br />
            <span className="text-primary">2026</span>
          </h1>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Hacé tus predicciones.<br />Jugá con amigos. Que gane el mejor.
          </p>
          <a
            href={MP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-primary text-dark font-extrabold text-xl py-4 px-8 rounded-2xl shadow-lg shadow-primary/30 hover:bg-green-400 transition-all active:scale-95"
          >
            Comprar ahora — $5.000 ARS
          </a>
          <p className="text-gray-500 text-sm mt-3">Pago único · Sin suscripción · Acceso por email</p>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-lg mx-auto px-6 py-8">
        <h2 className="text-xl font-bold text-center mb-6 text-gray-200">¿Qué incluye?</h2>
        <div className="grid grid-cols-2 gap-4">
          {features.map(f => (
            <div key={f.title} className="bg-dark-2 rounded-2xl p-4">
              <div className="text-3xl mb-2">{f.icon}</div>
              <div className="font-bold text-white text-sm mb-1">{f.title}</div>
              <div className="text-gray-400 text-xs leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="max-w-lg mx-auto px-6 py-8">
        <h2 className="text-xl font-bold text-center mb-6 text-gray-200">¿Cómo funciona?</h2>
        <div className="space-y-5">
          {steps.map(s => (
            <div key={s.n} className="flex gap-4 items-start">
              <div className="w-9 h-9 rounded-full bg-primary flex-shrink-0 flex items-center justify-center font-extrabold text-dark text-lg">
                {s.n}
              </div>
              <div>
                <div className="font-bold text-white">{s.title}</div>
                <div className="text-gray-400 text-sm mt-0.5 leading-relaxed">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price card CTA */}
      <div className="max-w-lg mx-auto px-6 py-8">
        <div className="bg-dark-2 rounded-3xl p-8 text-center border border-primary/20">
          <div className="text-5xl mb-4">🏆</div>
          <div className="text-4xl font-extrabold text-primary mb-1">$5.000 ARS</div>
          <div className="text-gray-400 text-sm mb-2">Pago único · Sin suscripción · Sin publicidad</div>
          <div className="text-gray-500 text-xs mb-6">Acceso de por vida al Prode Mundial 2026</div>
          <a
            href={MP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-primary text-dark font-extrabold text-lg py-4 px-8 rounded-2xl shadow-lg shadow-primary/30 hover:bg-green-400 transition-all active:scale-95"
          >
            Comprar ahora
          </a>
          <p className="text-gray-500 text-xs mt-3">Recibís el acceso por email tras confirmar el pago</p>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-lg mx-auto px-6 pb-12 text-center">
        <p className="text-gray-500 text-sm">
          ¿Ya compraste?{' '}
          <a href="/login" className="text-primary font-semibold hover:underline">
            Ingresá acá
          </a>
        </p>
      </div>
    </div>
  )
}
