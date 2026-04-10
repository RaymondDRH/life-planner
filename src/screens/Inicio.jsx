import { useState } from 'react'
import { getGreeting, getDayOfWeek, DAY_NAMES, getToday } from '../lib/dateUtils'
import { PROJECT_OF_DAY, getPodcastOfDay, CHECKLIST_MORNING, CHECKLIST_NIGHT } from '../lib/constants'
import { useDailyLog } from '../hooks/useDailyLog'
import { useWeeklyEnergyLog, useMonthlyEnergyLog } from '../hooks/useWeeklyData'
import BibleGuide from '../components/BibleGuide'

const WEEK_LABELS = ['L','M','X','J','V','S','D']

function EnergyBar({ label, energy, sleep }) {
  const color = !energy ? 'var(--surface-3)'
    : energy <= 3 ? '#EF4444'
    : energy <= 5 ? 'var(--yellow)'
    : energy <= 7 ? 'var(--accent)'
    : 'var(--green)'
  const height = energy ? Math.max(20, (energy / 10) * 56) : 8

  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4,flex:1}}>
      <span style={{fontSize:9,fontWeight:700,color: energy ? color : 'var(--text-3)'}}>
        {energy ?? ''}
      </span>
      <div style={{width:'100%',height:56,display:'flex',alignItems:'flex-end',justifyContent:'center'}}>
        <div style={{width:'70%',height,borderRadius:4,background:color,transition:'height .3s'}}/>
      </div>
      <span style={{fontSize:9,color:'var(--text-3)',fontWeight:600}}>{label}</span>
      {sleep ? <span style={{fontSize:8,color:'var(--purple)',fontWeight:600}}>{sleep}h</span>
               : <span style={{fontSize:8,color:'transparent'}}>-</span>}
    </div>
  )
}

function CheckItem({ item, done, onToggle, onInfo }) {
  return (
    <div className="check-item">
      <div className={`check-box ${done ? 'done' : ''}`} onClick={() => onToggle(item.key)}
        style={{cursor:'pointer'}}>
        {done && <svg viewBox="0 0 24 24" style={{width:12,height:12,stroke:'#fff',strokeWidth:2.5,fill:'none'}}><polyline points="20 6 9 17 4 12"/></svg>}
      </div>
      <span className={`check-label ${done ? 'done' : ''}`} style={{cursor:'pointer'}}
        onClick={() => onInfo ? onInfo() : onToggle(item.key)}>{item.label}</span>
      <span className="check-time">{item.time}</span>
    </div>
  )
}

export default function Inicio({ completions, toggleItem, onGotoChecklist, onGotoBiblia }) {
  const { log, updateLog } = useDailyLog()
  const [sleepEdit, setSleepEdit] = useState(false)
  const [sleepVal, setSleepVal] = useState('')
  const [showBible, setShowBible] = useState(false)
  const [showAllChecklist, setShowAllChecklist] = useState(false)
  const [energyView, setEnergyView] = useState('week')
  const [energyExpanded, setEnergyExpanded] = useState(false)
  const day = getDayOfWeek()
  const { data: weeklyLog, dates: weekDates } = useWeeklyEnergyLog()
  const { data: monthlyLog, dates: monthDates } = useMonthlyEnergyLog()
  const project = PROJECT_OF_DAY[day] || PROJECT_OF_DAY[1]
  const podcast = getPodcastOfDay()
  const today = getToday()
  const [y, m, d] = today.split('-').map(Number)
  const dateObj = new Date(y, m - 1, d)
  const dateStr = dateObj.toLocaleDateString('es-US', { weekday:'long', day:'numeric', month:'long' })

  const energyColor = !log.energy ? 'var(--text-3)' :
    log.energy <= 3 ? '#EF4444' : log.energy <= 5 ? 'var(--yellow)' :
    log.energy <= 7 ? 'var(--accent)' : 'var(--green)'

  const projectColor = project.color === 'accent' ? 'hero-accent' :
    project.color === 'green' ? 'hero-green' : ''

  const allItems = [...CHECKLIST_MORNING, ...CHECKLIST_NIGHT]
  const totalDone = allItems.filter(i => completions.has(i.key)).length
  const pending = allItems.filter(i => !completions.has(i.key))
  const visibleItems = pending.slice(0, 6)
  const allComplete = pending.length === 0

  function saveSleep() {
    const v = parseFloat(sleepVal)
    if (!isNaN(v) && v > 0 && v <= 24) updateLog(log.energy, v)
    setSleepEdit(false)
  }

  return (
    <div className="screen">
      {/* Header */}
      <div style={{marginTop:8}}>
        <p className="t-cap" style={{marginBottom:6,textTransform:'capitalize'}}>{dateStr}</p>
        <h1 className="t-h1">{getGreeting()},<br/><span className="t-accent">Raymond</span> ✦</h1>
      </div>

      {/* Energy + Sleep */}
      <div className="card card-lg">
        <div className="row-between" style={{marginBottom:14}}>
          <div>
            <p className="t-cap" style={{marginBottom:4}}>Energía de hoy</p>
            <div className="row gap-8">
              <span style={{fontSize:28,fontWeight:800,color:energyColor}}>{log.energy ?? '—'}</span>
              <span className="t-muted" style={{fontSize:14}}>/10</span>
              {log.energy && <span className={`pill ${log.energy>=7?'pill-green':log.energy>=5?'pill-yellow':'pill-accent'}`}>
                <span className="pill-dot"/>
                {log.energy>=7?'Buena':log.energy>=5?'Regular':'Baja'}
              </span>}
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:8}}>
            <button onClick={()=>setEnergyExpanded(s=>!s)}
              style={{background:'var(--surface-3)',border:'1px solid var(--border)',borderRadius:8,
                padding:'4px 10px',color:'var(--text-3)',fontSize:11,fontWeight:600,cursor:'pointer',
                fontFamily:'inherit',display:'flex',alignItems:'center',gap:4}}>
              {energyExpanded ? 'Contraer ▲' : 'Ver gráfica ▼'}
            </button>
            <div style={{textAlign:'right'}}>
            <p className="t-cap" style={{marginBottom:6}}>Horas de sueño</p>
            <div style={{display:'flex',alignItems:'center',gap:8,justifyContent:'flex-end'}}>
              <button onClick={()=>{const v=Math.max(0,(parseFloat(log.sleep_hours)||0)-0.5);updateLog(log.energy,v)}}
                style={{width:32,height:32,borderRadius:8,background:'var(--surface-3)',border:'1px solid var(--border)',
                  color:'var(--text-1)',fontSize:18,cursor:'pointer',display:'flex',alignItems:'center',
                  justifyContent:'center',fontFamily:'inherit',lineHeight:1}}>−</button>
              <span style={{fontSize:24,fontWeight:800,minWidth:44,textAlign:'center'}}>
                {log.sleep_hours ?? '—'}<span className="t-muted" style={{fontSize:13}}>h</span>
              </span>
              <button onClick={()=>{const v=Math.min(24,(parseFloat(log.sleep_hours)||0)+0.5);updateLog(log.energy,v)}}
                style={{width:32,height:32,borderRadius:8,background:'var(--surface-3)',border:'1px solid var(--border)',
                  color:'var(--text-1)',fontSize:18,cursor:'pointer',display:'flex',alignItems:'center',
                  justifyContent:'center',fontFamily:'inherit',lineHeight:1}}>+</button>
            </div>
            </div>
          </div>
        </div>
        {energyExpanded && <><div className="e-dots">
          {[1,2,3,4,5,6,7,8,9,10].map(v => (
            <div key={v} className={`e-dot ${log.energy===v?'active':''}`} data-v={v}
              onClick={()=>updateLog(v, log.sleep_hours)}>
              {v}
            </div>
          ))}
        </div>
        {/* Toggle semanal / mensual */}
        <div style={{display:'flex',background:'var(--surface-3)',borderRadius:9,padding:3,marginTop:14,marginBottom:8}}>
          {['week','month'].map(v => (
            <button key={v} onClick={()=>setEnergyView(v)}
              style={{flex:1,padding:'5px 0',borderRadius:7,fontSize:11,fontWeight:600,cursor:'pointer',
                fontFamily:'inherit',border:'none',transition:'all .15s',
                background: energyView===v ? 'var(--surface)' : 'transparent',
                color: energyView===v ? 'var(--text-1)' : 'var(--text-3)',
                boxShadow: energyView===v ? '0 1px 3px rgba(0,0,0,0.4)' : 'none'}}>
              {v==='week' ? 'Esta semana' : 'Este mes'}
            </button>
          ))}
        </div>

        {energyView === 'week' ? (() => {
          const withEnergy = weeklyLog.filter(r => r.energy)
          const withSleep  = weeklyLog.filter(r => r.sleep_hours)
          const avgEnergy  = withEnergy.length ? (withEnergy.reduce((s,r)=>s+r.energy,0)/withEnergy.length).toFixed(1) : null
          const avgSleep   = withSleep.length  ? (withSleep.reduce((s,r)=>s+r.sleep_hours,0)/withSleep.length).toFixed(1) : null
          const eColor = !avgEnergy ? 'var(--text-3)' : avgEnergy>=7?'var(--green)':avgEnergy>=5?'var(--yellow)':'#EF4444'
          return (
            <>
              <div style={{display:'flex',gap:2,alignItems:'flex-end'}}>
                {weekDates.map((d, i) => {
                  const entry = weeklyLog.find(r => r.date === d)
                  return <EnergyBar key={d} label={WEEK_LABELS[i]} energy={entry?.energy} sleep={entry?.sleep_hours}/>
                })}
              </div>
              <div style={{display:'flex',gap:8,marginTop:10}}>
                <div style={{flex:1,background:'var(--surface-3)',borderRadius:8,padding:'8px 10px'}}>
                  <p style={{fontSize:9,color:'var(--text-3)',fontWeight:600,marginBottom:2}}>PROM. ENERGÍA</p>
                  <p style={{fontSize:18,fontWeight:800,color:eColor}}>{avgEnergy ?? '—'}<span style={{fontSize:11,color:'var(--text-3)',fontWeight:500}}>/10</span></p>
                </div>
                <div style={{flex:1,background:'var(--surface-3)',borderRadius:8,padding:'8px 10px'}}>
                  <p style={{fontSize:9,color:'var(--text-3)',fontWeight:600,marginBottom:2}}>PROM. SUEÑO</p>
                  <p style={{fontSize:18,fontWeight:800,color:'var(--purple)'}}>{avgSleep ?? '—'}<span style={{fontSize:11,color:'var(--text-3)',fontWeight:500}}>h</span></p>
                </div>
              </div>
            </>
          )
        })() : (() => {
          const withEnergy = monthlyLog.filter(r => r.energy)
          const withSleep  = monthlyLog.filter(r => r.sleep_hours)
          const avgEnergy  = withEnergy.length ? (withEnergy.reduce((s,r)=>s+r.energy,0)/withEnergy.length).toFixed(1) : null
          const avgSleep   = withSleep.length  ? (withSleep.reduce((s,r)=>s+r.sleep_hours,0)/withSleep.length).toFixed(1) : null
          const eColor = !avgEnergy ? 'var(--text-3)' : avgEnergy>=7?'var(--green)':avgEnergy>=5?'var(--yellow)':'#EF4444'
          return (
            <>
              <div style={{display:'flex',gap:1.5,alignItems:'flex-end',flexWrap:'nowrap',overflowX:'auto',paddingBottom:2}}>
                {monthDates.map((d) => {
                  const entry = monthlyLog.find(r => r.date === d)
                  const dayNum = Number(d.split('-')[2])
                  return <EnergyBar key={d} label={String(dayNum)} energy={entry?.energy} sleep={null}/>
                })}
              </div>
              <div style={{display:'flex',gap:8,marginTop:10}}>
                <div style={{flex:1,background:'var(--surface-3)',borderRadius:8,padding:'8px 10px'}}>
                  <p style={{fontSize:9,color:'var(--text-3)',fontWeight:600,marginBottom:2}}>PROM. ENERGÍA</p>
                  <p style={{fontSize:18,fontWeight:800,color:eColor}}>{avgEnergy ?? '—'}<span style={{fontSize:11,color:'var(--text-3)',fontWeight:500}}>/10</span></p>
                </div>
                <div style={{flex:1,background:'var(--surface-3)',borderRadius:8,padding:'8px 10px'}}>
                  <p style={{fontSize:9,color:'var(--text-3)',fontWeight:600,marginBottom:2}}>PROM. SUEÑO</p>
                  <p style={{fontSize:18,fontWeight:800,color:'var(--purple)'}}>{avgSleep ?? '—'}<span style={{fontSize:11,color:'var(--text-3)',fontWeight:500}}>h</span></p>
                </div>
              </div>
            </>
          )
        })()}</>}
      </div>

      {/* Proyecto del día */}
      <div className={`hero-card ${projectColor}`}>
        <div className="row-between" style={{marginBottom:10}}>
          <span className={`pill pill-${project.color}`}><span className="pill-dot"/>Proyecto del día</span>
          <span className="t-cap">{DAY_NAMES[day]}</span>
        </div>
        <p style={{fontSize:20,fontWeight:800,marginBottom:4}}>{project.project}</p>
        <p className="t-body">{project.task} · 2 horas</p>
      </div>

      {/* Quick checklist */}
      <div className="sec-header">
        <p className="sec-title">Rutina de hoy</p>
        <p className="sec-action" onClick={()=>setShowAllChecklist(s=>!s)}>
          {totalDone}/{allItems.length} · {showAllChecklist ? 'Cerrar ▲' : 'Ver todo ▼'}
        </p>
      </div>
      <div className="card">
        {allComplete ? (
          <div style={{padding:'20px 0',textAlign:'center'}}>
            <p style={{fontSize:28,marginBottom:6}}>🎉</p>
            <p style={{fontSize:14,fontWeight:700,color:'var(--green)'}}>¡Rutina completa!</p>
            <p className="t-body" style={{fontSize:12,marginTop:4}}>Excelente día, Raymond</p>
          </div>
        ) : showAllChecklist ? (
          allItems.map(item => (
            <CheckItem key={item.key} item={item} done={completions.has(item.key)} onToggle={toggleItem}
              onInfo={item.key === 'prayer_bible' ? () => setShowBible(true) : null}/>
          ))
        ) : (
          visibleItems.map(item => (
            <CheckItem key={item.key} item={item} done={false} onToggle={toggleItem}
              onInfo={item.key === 'prayer_bible' ? () => setShowBible(true) : null}/>
          ))
        )}
      </div>

      {showBible && <BibleGuide onClose={() => setShowBible(false)}/>}

      {/* Podcast del día */}
      <div className="sec-header"><p className="sec-title">Podcast del día</p></div>
      <a href={podcast?.url} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>
        <div style={{background:'linear-gradient(135deg,#1a1020,#1e1428)',border:'1px solid rgba(124,107,255,0.2)',
          borderRadius:'var(--r-md)',padding:16,display:'flex',alignItems:'center',gap:14}}>
          <div style={{width:52,height:52,borderRadius:12,background:'linear-gradient(135deg,var(--purple),#A89BFF)',
            display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:22}}>
            {podcast?.emoji ?? '🎙'}
          </div>
          <div style={{flex:1}}>
            <p style={{fontSize:13,fontWeight:700,marginBottom:2,color:'var(--text-1)'}}>{podcast?.name ?? 'Sin podcast'}</p>
            <p className="t-body" style={{fontSize:11}}>{podcast?.category}</p>
          </div>
          <div style={{width:36,height:36,borderRadius:'50%',background:'var(--purple)',display:'flex',
            alignItems:'center',justifyContent:'center',flexShrink:0,boxShadow:'0 4px 16px var(--purple-glow)'}}>
            <svg viewBox="0 0 24 24" style={{width:14,height:14,fill:'#fff',marginLeft:2}}><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
        </div>
      </a>

      {/* GoTrade */}
      <a href="https://aicrafterlab.com/gotrade/" target="_blank" rel="noopener noreferrer"
        className="hero-card hero-green" style={{display:'flex',alignItems:'center',gap:14,textDecoration:'none',cursor:'pointer'}}>
        <div style={{width:48,height:48,borderRadius:14,background:'rgba(62,202,140,0.15)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
          <svg viewBox="0 0 24 24" style={{width:22,height:22,stroke:'var(--green)',strokeWidth:2,fill:'none',strokeLinecap:'round',strokeLinejoin:'round'}}>
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
          </svg>
        </div>
        <div style={{flex:1}}>
          <p style={{fontSize:14,fontWeight:700,marginBottom:2,color:'var(--text-1)'}}>GoTrade</p>
          <p className="t-body" style={{fontSize:11}}>Identificador de estrategias de opciones</p>
        </div>
        <span style={{fontSize:11,fontWeight:700,color:'var(--green)'}}>Abrir →</span>
      </a>

      {/* Estudio Bíblico */}
      <div onClick={onGotoBiblia}
        className="hero-card" style={{display:'flex',alignItems:'center',gap:14,cursor:'pointer',
          background:'linear-gradient(135deg,#13102a,#1a1535)',borderColor:'rgba(124,107,255,0.25)'}}>
        <div style={{width:48,height:48,borderRadius:14,background:'rgba(124,107,255,0.15)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
          <svg viewBox="0 0 24 24" style={{width:22,height:22,stroke:'var(--purple)',strokeWidth:2,fill:'none',strokeLinecap:'round',strokeLinejoin:'round'}}>
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
        </div>
        <div style={{flex:1}}>
          <p style={{fontSize:14,fontWeight:700,marginBottom:2}}>Estudio Bíblico</p>
          <p className="t-body" style={{fontSize:11}}>Plan de 4 fases · 13 semanas</p>
        </div>
        <span style={{fontSize:11,fontWeight:700,color:'var(--purple)'}}>Abrir →</span>
      </div>
    </div>
  )
}
