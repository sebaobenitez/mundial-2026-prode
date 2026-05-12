// Todos los horarios en el fixture se almacenan en ET (UTC-4, hora del Este en verano)
// Argentina es UTC-3, por lo tanto ARG = ET + 1 hora

export function etToArg(timeET) {
  const [h, m] = timeET.split(':').map(Number)
  const total = h * 60 + m + 60
  const argH = Math.floor(total / 60) % 24
  const argM = total % 60
  const nextDay = total >= 24 * 60
  return `${String(argH).padStart(2, '0')}:${String(argM).padStart(2, '0')}${nextDay ? '*' : ''}`
}
// El asterisco (*) indica que el partido es de madrugada (pasada la medianoche ARG)
