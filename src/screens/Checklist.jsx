import { CHECKLIST_MORNING, CHECKLIST_NIGHT, WEEKLY_HABIT_KEYS } from '../lib/constants'
import { getWeekDates } from '../lib/dateUtils'

// Mon=L, Tue=M, Wed=X, Thu=J, Fri=V, Sat=S, Sun=D
const WEEK_SHORT = ['L', 'M', 'X', 'J', 'V', 'S', 'D']
import { useWeeklyCompletions } from '../hooks/useWeeklyData'

function CheckItem({ item, done, onToggle }) {
  return (
    <div className="check-item" onClick={() => onToggle(item.key)}>
      <div className={`check-box ${done ? 'done' : ''}`}>
        {done && <svg viewBox="0 0 24 24" style={{width:12,height:12,stroke:'#fff',strokeWidth:2.5,fill:'none'}}><polyline points="20 6 9 17 4 12"/></svg>}
      </div>
      <span className={`check-label ${done ? 'done' : ''}`}>{item.label}</span>
      <span className="check-time">{item.time}</span>
    </div>
  )
}

export default function Checklist({ completions, toggleItem }) {
  const { data: weeklyData, dates } = useWeeklyCompletions()

  const morningDone = CHECKLIST_MORNING.filter(i => completions.has(i.key)).length
  const nightDone   = CHECKLIST_NIGHT.filter(i => completions.has(i.key)).length
  const totalDone   = morningDone + nightDone
  const totalItems  = CHECKLIST_MORNING.length + CHECKLIST_NIGHT.length
  const pct = Math.round((totalDone / totalItems) * 100)

  return (
    <div className="screen">
      <div style={{marginTop:8}}>
        <p className="t-cap" style={{marginBottom:4}}>Checklist del día</p>
        <h1 className="t-h1"><span className="t-accent">{totalDone}</span><span className="t-muted" style={{fontSize:18}}>/{totalItems}</span> completados</h1>
      </div>

      {/* Progress bar */}
      <div className="card">
        <div className="row-between" style={{marginBottom:8}}>
          <p className="t-cap">Progreso de hoy</p>
          <span style={{fontSize:13,fontWeight:800,color:pct>=80?'var(--green)':pct>=50?'var(--yellow)':'var(--accent)'}}>{pct}%</span>
        </div>
        <div className="progress-track">
          <div className={`progress-fill ${pct>=80?'green':pct>=50?'yellow':''}`} style={{width:`${pct}%`}}/>
        </div>
        <p className="t-cap" style={{marginTop:8,color:'var(--text-3)'}}>
          Mañana: {morningDone}/{CHECKLIST_MORNING.length} · Noche: {nightDone}/{CHECKLIST_NIGHT.length}
        </p>
      </div>

      {/* Morning checklist */}
      <div className="sec-header">
        <p className="sec-title">Rutina de Mañana</p>
        <span className="pill pill-accent">{morningDone}/{CHECKLIST_MORNING.length}</span>
      </div>
      <div className="card">
        {CHECKLIST_MORNING.map(item => (
          <CheckItem key={item.key} item={item} done={completions.has(item.key)} onToggle={toggleItem}/>
        ))}
      </div>

      {/* Night checklist */}
      <div className="sec-header">
        <p className="sec-title">Rutina de Noche</p>
        <span className="pill pill-purple">{nightDone}/{CHECKLIST_NIGHT.length}</span>
      </div>
      <div className="card">
        {CHECKLIST_NIGHT.map(item => (
          <CheckItem key={item.key} item={item} done={completions.has(item.key)} onToggle={toggleItem}/>
        ))}
      </div>

      {/* Weekly habit grid */}
      <div className="sec-header">
        <p className="sec-title">Hábitos de la semana</p>
      </div>
      <div className="card" style={{overflowX:'auto'}}>
        {/* Day headers */}
        <div style={{display:'flex',gap:4,marginBottom:6,paddingLeft:94}}>
          {dates.map((d, i) => {
            const isToday = d === new Date().toLocaleDateString('en-CA')
            return (
              <div key={d} style={{flex:1,textAlign:'center',fontSize:9,fontWeight:700,
                color:isToday?'var(--accent)':'var(--text-3)'}}>
                {WEEK_SHORT[i]}
              </div>
            )
          })}
        </div>
        {WEEKLY_HABIT_KEYS.map(({ key, label }) => (
          <div key={key} className="habit-grid-row">
            <span className="habit-grid-label">{label}</span>
            <div className="habit-grid-cells">
              {dates.map(d => {
                const done = weeklyData.some(r => r.date === d && r.item_key === key)
                return (
                  <div key={d} className="hcell"
                    style={done ? {background:'var(--green)',opacity:0.8} : {}}/>
                )
              })}
            </div>
          </div>
        ))}
        <p className="t-cap" style={{marginTop:10,color:'var(--text-3)'}}>Verde = completado ese día</p>
      </div>
    </div>
  )
}
