// Always use local date, never UTC
export const getToday = () => new Date().toLocaleDateString('en-CA') // YYYY-MM-DD

export const getDayOfWeek = () => new Date().getDay() // 0=Sun,1=Mon...6=Sat

export const getWeekDates = () => {
  const today = new Date()
  const day = today.getDay()
  const diff = today.getDate() - day + (day === 0 ? -6 : 1) // Monday
  const monday = new Date(today.setDate(diff))
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return d.toLocaleDateString('en-CA')
  })
}

export const formatDateDisplay = (dateStr) => {
  const [year, month, day] = dateStr.split('-').map(Number)
  const d = new Date(year, month - 1, day)
  return d.toLocaleDateString('es-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

export const DAY_NAMES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
export const DAY_NAMES_SHORT = ['D', 'L', 'M', 'X', 'J', 'V', 'S']

export const getGreeting = () => {
  const h = new Date().getHours()
  if (h < 12) return 'Buenos días'
  if (h < 18) return 'Buenas tardes'
  return 'Buenas noches'
}

export const isMarketOpen = () => {
  const now = new Date()
  const day = now.getDay()
  if (day === 0 || day === 6) return false
  // EST = UTC-5 (no DST adjustment for simplicity)
  const utcHour = now.getUTCHours()
  const utcMin = now.getUTCMinutes()
  const estMinutes = utcHour * 60 + utcMin - 300
  return estMinutes >= 9 * 60 + 30 && estMinutes < 16 * 60
}
