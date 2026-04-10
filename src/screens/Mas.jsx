import { useState } from 'react'
import { MEAL_COMBOS, DAY_COMBO, VITAMINS, BOOKS, ALARMS, BOOK_RECOMMENDATIONS, BOOK_CATEGORIES } from '../lib/constants'
import { getDayOfWeek } from '../lib/dateUtils'
import { useWeeklyEnergyLog } from '../hooks/useWeeklyData'
import { useBooks } from '../hooks/useBooks'
import Biblia from './Biblia'

// ─── Detail screens ───────────────────────────────────────

function ComidaDetail({ onBack }) {
  const day = getDayOfWeek()
  const comboKey = DAY_COMBO[day]
  const combo = comboKey ? MEAL_COMBOS[comboKey] : null
  const tomorrow = (day + 1) % 7
  const tomorrowCombo = DAY_COMBO[tomorrow] ? MEAL_COMBOS[DAY_COMBO[tomorrow]] : null

  return (
    <div className="screen">
      <div style={{display:'flex',alignItems:'center',gap:12,marginTop:8}}>
        <button onClick={onBack} style={{background:'var(--surface-2)',border:'1px solid var(--border)',
          borderRadius:10,padding:'6px 12px',color:'var(--text-2)',fontSize:13,cursor:'pointer',fontFamily:'inherit'}}>
          ← Volver
        </button>
        <h1 className="t-h2">Plan de comida</h1>
      </div>

      <div className="card" style={{background:'var(--surface-2)'}}>
        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
          <span className="pill pill-purple">Mañana</span>
          <span className="t-cap">{tomorrowCombo ? tomorrowCombo.label+' · '+tomorrowCombo.days : 'Domingo'}</span>
        </div>
        {tomorrowCombo ? (
          <div style={{display:'flex',flexDirection:'column',gap:4}}>
            {[{l:'Desayuno',m:tomorrowCombo.desayuno},{l:'Almuerzo',m:tomorrowCombo.almuerzo},{l:'Cena',m:tomorrowCombo.cena}].map(({l,m})=>(
              <div key={l} style={{display:'flex',gap:8,alignItems:'baseline'}}>
                <span style={{fontSize:10,fontWeight:700,color:'var(--text-3)',flexShrink:0,width:52}}>{l}</span>
                <span style={{fontSize:12,color:'var(--text-2)'}}>{m.title}</span>
              </div>
            ))}
          </div>
        ) : <p className="t-body" style={{fontSize:12}}>Domingo — come en familia</p>}
      </div>

      {combo ? (
        <div className="card">
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12}}>
            <span className="pill pill-green">{combo.label}</span>
            <span className="t-cap">Hoy · {combo.days}</span>
          </div>
          {[{l:'Desayuno',m:combo.desayuno},{l:'Almuerzo',m:combo.almuerzo},{l:'Cena',m:combo.cena}].map(({l,m})=>(
            <div key={l} style={{marginBottom:14}}>
              <p className="meal-section-title">{l}</p>
              <p style={{fontSize:13,fontWeight:600,color:'var(--text-1)',marginBottom:6}}>{m.title}</p>
              <ul className="meal-items">{m.items.map(i=><li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
      ) : <div className="card"><p className="t-body">Domingo — come en familia 🍽</p></div>}
    </div>
  )
}

function SuplementosDetail({ onBack }) {
  return (
    <div className="screen">
      <div style={{display:'flex',alignItems:'center',gap:12,marginTop:8}}>
        <button onClick={onBack} style={{background:'var(--surface-2)',border:'1px solid var(--border)',
          borderRadius:10,padding:'6px 12px',color:'var(--text-2)',fontSize:13,cursor:'pointer',fontFamily:'inherit'}}>
          ← Volver
        </button>
        <h1 className="t-h2">Suplementos</h1>
      </div>
      <div className="card">
        {VITAMINS.map((v,i) => (
          <div key={v.name} style={{display:'flex',justifyContent:'space-between',alignItems:'center',
            padding:'13px 0', borderTop: i===0?'none':'1px solid var(--border)'}}>
            <div>
              <p style={{fontSize:14,fontWeight:600}}>{v.name}</p>
              <p style={{fontSize:12,color:'var(--text-3)',marginTop:3}}>{v.when}</p>
            </div>
            <span className="pill pill-purple">{v.dose}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function LibrosDetail({ onBack }) {
  const { readIds, userBooks, toggleRead, addUserBook, toggleUserRead } = useBooks()
  const [addedRec, setAddedRec] = useState(new Set())
  const [showAdd, setShowAdd] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')

  async function handleManualAdd() {
    if (!newTitle.trim()) return
    await addUserBook(newTitle.trim(), newAuthor.trim() || 'Sin autor')
    setNewTitle(''); setNewAuthor(''); setShowAdd(false)
  }

  const allTitles = new Set([...BOOKS.map(b=>b.title), ...userBooks.map(b=>b.title)])
  const nextRec = BOOK_RECOMMENDATIONS.find(r => !allTitles.has(r.title))
  const readCount = BOOKS.filter(b=>readIds.has(b.id)).length + userBooks.filter(b=>readIds.has(`u_${b.id}`)).length

  async function handleAddRec(rec) {
    await addUserBook(rec.title, rec.author)
    setAddedRec(prev => new Set([...prev, rec.title]))
  }

  return (
    <div className="screen">
      <div style={{display:'flex',alignItems:'center',gap:12,marginTop:8}}>
        <button onClick={onBack} style={{background:'var(--surface-2)',border:'1px solid var(--border)',
          borderRadius:10,padding:'6px 12px',color:'var(--text-2)',fontSize:13,cursor:'pointer',fontFamily:'inherit'}}>
          ← Volver
        </button>
        <div>
          <h1 className="t-h2">Lista de lectura</h1>
          <p className="t-cap" style={{marginTop:2}}>{readCount} libros leídos</p>
        </div>
      </div>

      {nextRec && (
        <div style={{background:'linear-gradient(135deg,#13102a,#1a1535)',border:'1px solid rgba(124,107,255,0.3)',
          borderRadius:'var(--r-lg)',padding:16}}>
          <div style={{display:'flex',gap:6,marginBottom:10}}>
            <span className="pill pill-purple">Recomendado para ti</span>
            <span className={`pill pill-${BOOK_CATEGORIES[nextRec.category]?.color||'surface'}`} style={{fontSize:9}}>
              {BOOK_CATEGORIES[nextRec.category]?.label}
            </span>
          </div>
          <p style={{fontSize:15,fontWeight:700,marginBottom:2}}>{nextRec.title}</p>
          <p style={{fontSize:12,color:'var(--text-3)',marginBottom:8}}>{nextRec.author}</p>
          <p style={{fontSize:12,color:'var(--text-2)',marginBottom:12}}>💡 {nextRec.reason}</p>
          <button className="btn btn-purple btn-sm" disabled={addedRec.has(nextRec.title)}
            onClick={()=>handleAddRec(nextRec)} style={{width:'auto',padding:'8px 18px'}}>
            {addedRec.has(nextRec.title) ? 'Agregado ✓' : '+ Agregar a mi lista'}
          </button>
        </div>
      )}

      <div className="card">
        {[...BOOKS].sort((a,b)=>{
          const aR=readIds.has(a.id),bR=readIds.has(b.id)
          if(aR&&!bR)return 1;if(!aR&&bR)return -1;return a.id-b.id
        }).map((b,i)=>{
          const isRead = readIds.has(b.id)
          return (
            <div key={b.id} className="book-item" onClick={()=>toggleRead(b.id)}
              style={{cursor:'pointer',opacity:isRead?0.45:1}}>
              <span className="book-num" style={{color:isRead?'var(--green)':b.current?'var(--accent)':undefined}}>
                {isRead?'✓':i+1}
              </span>
              <div style={{flex:1}}>
                <p className="book-title" style={{
                  color:isRead?'var(--text-3)':b.current?'var(--accent)':'var(--text-1)',
                  textDecoration:isRead?'line-through':'none'
                }}>{b.title}</p>
                <p className="book-author">{b.author}</p>
              </div>
              {isRead ? <span className="pill pill-green" style={{fontSize:9}}>Leído ✓</span>
                : b.current ? <span className="pill pill-accent" style={{fontSize:9}}>Leyendo</span>
                : null}
            </div>
          )
        })}
        {userBooks.map(b=>{
          const key=`u_${b.id}`, isRead=readIds.has(key)
          return (
            <div key={b.id} className="book-item" onClick={()=>toggleUserRead(b.id)}
              style={{cursor:'pointer',opacity:isRead?0.45:1}}>
              <span className="book-num" style={{color:isRead?'var(--green)':'var(--purple)'}}>
                {isRead?'✓':'★'}
              </span>
              <div style={{flex:1}}>
                <p className="book-title" style={{color:isRead?'var(--text-3)':'var(--text-1)',textDecoration:isRead?'line-through':'none'}}>{b.title}</p>
                <p className="book-author">{b.author}</p>
              </div>
              {isRead ? <span className="pill pill-green" style={{fontSize:9}}>Leído ✓</span>
                : <span className="pill pill-purple" style={{fontSize:9}}>En lista</span>}
            </div>
          )
        })}
      </div>
      <button className="btn btn-surface" onClick={()=>setShowAdd(s=>!s)}>
        {showAdd ? 'Cancelar' : '+ Agregar libro manualmente'}
      </button>

      {showAdd && (
        <div className="card">
          <p className="t-cap" style={{marginBottom:10}}>Nuevo libro</p>
          <input className="modal-input" placeholder="Título del libro" value={newTitle}
            onChange={e=>setNewTitle(e.target.value)} style={{marginBottom:8}}/>
          <input className="modal-input" placeholder="Autor" value={newAuthor}
            onChange={e=>setNewAuthor(e.target.value)} style={{marginBottom:12}}/>
          <button className="btn btn-accent" onClick={handleManualAdd}>Agregar a mi lista</button>
        </div>
      )}

      <p className="t-cap" style={{color:'var(--text-3)'}}>Toca un libro para marcarlo como leído</p>
    </div>
  )
}

function AlarmasDetail({ onBack }) {
  return (
    <div className="screen">
      <div style={{display:'flex',alignItems:'center',gap:12,marginTop:8}}>
        <button onClick={onBack} style={{background:'var(--surface-2)',border:'1px solid var(--border)',
          borderRadius:10,padding:'6px 12px',color:'var(--text-2)',fontSize:13,cursor:'pointer',fontFamily:'inherit'}}>
          ← Volver
        </button>
        <h1 className="t-h2">Alarmas de referencia</h1>
      </div>
      {ALARMS.map(group => (
        <div key={group.category}>
          <p className="t-cap" style={{color:'var(--purple)',marginBottom:4}}>{group.category}</p>
          <div className="card" style={{padding:'0 16px',marginBottom:4}}>
            {group.items.map(a => (
              <div key={a.time+a.label} className="alarm-item">
                <span className="alarm-time">{a.time}</span>
                <span className="alarm-label">{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Main grid ────────────────────────────────────────────

const MENU_ITEMS = [
  {
    id: 'comida',
    label: 'Plan de comida',
    sub: 'Hoy y mañana',
    color: 'var(--green)',
    bg: 'linear-gradient(135deg,#0e1a14,#121e18)',
    border: 'rgba(62,202,140,0.25)',
    icon: (
      <svg viewBox="0 0 24 24" style={{width:28,height:28,stroke:'var(--green)',strokeWidth:1.8,fill:'none',strokeLinecap:'round',strokeLinejoin:'round'}}>
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
  },
  {
    id: 'suplementos',
    label: 'Suplementos',
    sub: '6 vitaminas del día',
    color: 'var(--purple)',
    bg: 'linear-gradient(135deg,#13102a,#1a1535)',
    border: 'rgba(124,107,255,0.25)',
    icon: (
      <svg viewBox="0 0 24 24" style={{width:28,height:28,stroke:'var(--purple)',strokeWidth:1.8,fill:'none',strokeLinecap:'round',strokeLinejoin:'round'}}>
        <path d="M10.5 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v3"/><circle cx="18" cy="18" r="3"/><path d="M22 22l-1.5-1.5"/>
      </svg>
    ),
  },
  {
    id: 'libros',
    label: 'Lectura',
    sub: 'Lista + recomendaciones',
    color: 'var(--accent)',
    bg: 'linear-gradient(135deg,#1e1610,#221a10)',
    border: 'rgba(255,107,53,0.25)',
    icon: (
      <svg viewBox="0 0 24 24" style={{width:28,height:28,stroke:'var(--accent)',strokeWidth:1.8,fill:'none',strokeLinecap:'round',strokeLinejoin:'round'}}>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
  {
    id: 'alarmas',
    label: 'Alarmas',
    sub: 'Horarios de referencia',
    color: 'var(--yellow)',
    bg: 'linear-gradient(135deg,#1a1608,#1e1a08)',
    border: 'rgba(245,200,66,0.25)',
    icon: (
      <svg viewBox="0 0 24 24" style={{width:28,height:28,stroke:'var(--yellow)',strokeWidth:1.8,fill:'none',strokeLinecap:'round',strokeLinejoin:'round'}}>
        <circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M5 3 2 6"/><path d="m22 6-3-3"/><path d="M6.38 18.7 4 21"/><path d="M17.64 18.67 20 21"/>
      </svg>
    ),
  },
  {
    id: 'biblia',
    label: 'Estudio Bíblico',
    sub: '4 fases · 13 semanas',
    color: 'var(--purple)',
    bg: 'linear-gradient(135deg,#13102a,#1a1535)',
    border: 'rgba(124,107,255,0.25)',
    icon: (
      <svg viewBox="0 0 24 24" style={{width:28,height:28,stroke:'var(--purple)',strokeWidth:1.8,fill:'none',strokeLinecap:'round',strokeLinejoin:'round'}}>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
]

export default function Mas({ initialView = null, onViewChange }) {
  const [view, setView] = useState(initialView)

  function changeView(v) {
    setView(v)
    onViewChange && onViewChange(v)
  }
  const { data: energyLog } = useWeeklyEnergyLog()

  const avgEnergy = energyLog.filter(r=>r.energy).length > 0
    ? (energyLog.reduce((s,r)=>s+(r.energy||0),0)/energyLog.filter(r=>r.energy).length).toFixed(1) : '—'
  const avgSleep = energyLog.filter(r=>r.sleep_hours).length > 0
    ? (energyLog.reduce((s,r)=>s+(r.sleep_hours||0),0)/energyLog.filter(r=>r.sleep_hours).length).toFixed(1) : '—'

  if (view === 'comida')      return <ComidaDetail      onBack={()=>changeView(null)}/>
  if (view === 'suplementos') return <SuplementosDetail onBack={()=>changeView(null)}/>
  if (view === 'libros')      return <LibrosDetail      onBack={()=>changeView(null)}/>
  if (view === 'alarmas')     return <AlarmasDetail     onBack={()=>changeView(null)}/>
  if (view === 'biblia')      return <Biblia            onBack={()=>changeView(null)}/>

  return (
    <div className="screen">
      <div style={{marginTop:8}}>
        <p className="t-cap" style={{marginBottom:4}}>Más</p>
        <h1 className="t-h1">Recursos <span className="t-accent">del día</span></h1>
      </div>

      {/* Health summary */}
      <div className="stat-grid">
        <div className="stat-card">
          <p className="stat-val" style={{color:'var(--accent)'}}>{avgEnergy}</p>
          <p className="stat-lbl">Energía promedio semana</p>
        </div>
        <div className="stat-card">
          <p className="stat-val" style={{color:'var(--purple)'}}>{avgSleep}h</p>
          <p className="stat-lbl">Sueño promedio semana</p>
        </div>
      </div>

      {/* Big menu cards */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
        {MENU_ITEMS.map(item => (
          <div key={item.id} onClick={()=>changeView(item.id)}
            style={{background:item.bg,border:`1px solid ${item.border}`,borderRadius:'var(--r-lg)',
              padding:20,cursor:'pointer',display:'flex',flexDirection:'column',gap:14,
              WebkitTapHighlightColor:'transparent',minHeight:130,position:'relative',overflow:'hidden'}}>
            {/* Glow blob */}
            <div style={{position:'absolute',top:-30,right:-30,width:100,height:100,borderRadius:'50%',
              background:item.border,filter:'blur(30px)',pointerEvents:'none'}}/>
            <div style={{width:52,height:52,borderRadius:14,background:'rgba(255,255,255,0.06)',
              display:'flex',alignItems:'center',justifyContent:'center'}}>
              {item.icon}
            </div>
            <div>
              <p style={{fontSize:14,fontWeight:700,color:'var(--text-1)',marginBottom:3}}>{item.label}</p>
              <p style={{fontSize:11,color:'var(--text-3)'}}>{item.sub}</p>
            </div>
            <span style={{position:'absolute',bottom:14,right:16,fontSize:11,fontWeight:700,color:item.color}}>Ver →</span>
          </div>
        ))}
      </div>

      {/* GoTrade */}
      <a href="https://aicrafterlab.com/gotrade/" target="_blank" rel="noopener noreferrer"
        className="hero-card hero-green" style={{display:'flex',alignItems:'center',gap:14,textDecoration:'none'}}>
        <div style={{width:48,height:48,borderRadius:14,background:'rgba(62,202,140,0.15)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
          <svg viewBox="0 0 24 24" style={{width:22,height:22,stroke:'var(--green)',strokeWidth:2,fill:'none',strokeLinecap:'round',strokeLinejoin:'round'}}>
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
          </svg>
        </div>
        <div style={{flex:1}}>
          <p style={{fontSize:14,fontWeight:700}}>GoTrade</p>
          <p className="t-body" style={{fontSize:11}}>Identificador de estrategias de opciones</p>
        </div>
        <span style={{fontSize:11,fontWeight:700,color:'var(--green)'}}>Abrir →</span>
      </a>
    </div>
  )
}
