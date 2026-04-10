import { useState } from 'react'
import { useChecklist } from './hooks/useChecklist'
import Inicio    from './screens/Inicio'
import Gym       from './screens/Gym'
import Tareas    from './screens/Tareas'
import Mas       from './screens/Mas'
import Biblia    from './screens/Biblia'

const TABS = [
  {
    id: 'inicio',
    label: 'Inicio',
    icon: <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  },
  {
    id: 'gym',
    label: 'Gym',
    icon: <svg viewBox="0 0 24 24"><path d="M6.5 6.5h11M6.5 17.5h11M4 9h16M4 15h16M2 11h2M20 11h2M2 13h2M20 13h2"/></svg>,
  },
  {
    id: 'tareas',
    label: 'Tareas',
    icon: <svg viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  },
  {
    id: 'mas',
    label: 'Más',
    icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>,
  },
]

export default function App() {
  const [tab, setTab] = useState('inicio')
  const [masView, setMasView] = useState(null)
  const [showBiblia, setShowBiblia] = useState(false)
  const { completions, toggle } = useChecklist()

  // Si Biblia está abierta la mostramos encima de todo
  if (showBiblia) {
    return (
      <div className="app">
        <Biblia onBack={() => setShowBiblia(false)}/>
        <nav className="bottom-nav">
          {TABS.map(t => (
            <div key={t.id} className={`nav-item ${tab===t.id?'active':''}`}
              onClick={()=>{ setShowBiblia(false); setTab(t.id) }}>
              {t.icon}
              <span>{t.label}</span>
            </div>
          ))}
        </nav>
      </div>
    )
  }

  return (
    <div className="app">
      <div style={{display: tab==='inicio' ?'block':'none'}}>
        <Inicio completions={completions} toggleItem={toggle}
          onGotoChecklist={()=>setTab('tareas')}
          onGotoBiblia={()=>setShowBiblia(true)}/>
      </div>
      <div style={{display: tab==='gym'    ?'block':'none'}}><Gym/></div>
      <div style={{display: tab==='tareas' ?'block':'none'}}><Tareas/></div>
      <div style={{display: tab==='mas'    ?'block':'none'}}>
        <Mas initialView={masView} onViewChange={setMasView}/>
      </div>

      <nav className="bottom-nav">
        {TABS.map(t => (
          <div key={t.id} className={`nav-item ${tab===t.id?'active':''}`}
            onClick={()=>{ setMasView(null); setTab(t.id) }}>
            {t.icon}
            <span>{t.label}</span>
          </div>
        ))}
      </nav>
    </div>
  )
}
