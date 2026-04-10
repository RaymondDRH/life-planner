import { useState } from 'react'
import { BIBLE_STUDY_PLAN } from '../lib/constants'
import { useBibleSessions } from '../hooks/useBibleSessions'

function BookDetail({ book, phase, color, onBack }) {
  const { todaySession, markToday, streak } = useBibleSessions()
  const markedToday = todaySession?.book === book.book
  return (
    <div className="screen">
      <div style={{display:'flex',alignItems:'center',gap:12,marginTop:8}}>
        <button onClick={onBack} style={{background:'var(--surface-2)',border:'1px solid var(--border)',
          borderRadius:10,padding:'6px 12px',color:'var(--text-2)',fontSize:13,cursor:'pointer',fontFamily:'inherit'}}>
          ← Volver
        </button>
        <div>
          <h1 className="t-h2">{book.book}</h1>
          <p className="t-cap" style={{marginTop:2}}>{book.weeks}</p>
        </div>
      </div>

      {/* Qué leer */}
      <div className={`hero-card hero-${color}`}>
        <p className="t-cap" style={{marginBottom:6}}>Qué leer</p>
        <p style={{fontSize:15,fontWeight:700,marginBottom:6}}>{book.chapters}</p>
        <p className="t-body" style={{fontSize:12}}>{book.focus}</p>
      </div>

      {/* Tip */}
      <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--r-md)',padding:14}}>
        <p className="t-cap" style={{marginBottom:6}}>💡 Consejo</p>
        <p style={{fontSize:13,color:'var(--text-2)',lineHeight:1.6}}>{book.tip}</p>
      </div>

      {/* Preguntas de reflexión */}
      <div>
        <p className="t-cap" style={{marginBottom:10}}>Preguntas de reflexión</p>
        <div className="card">
          {book.questions.map((q, i) => (
            <div key={i} style={{display:'flex',gap:12,padding:'11px 0',
              borderTop: i===0?'none':'1px solid var(--border)'}}>
              <span style={{width:22,height:22,borderRadius:'50%',background:'var(--surface-3)',
                display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,
                fontWeight:700,color:`var(--${color})`,flexShrink:0,marginTop:1}}>{i+1}</span>
              <p style={{fontSize:13,color:'var(--text-2)',lineHeight:1.6}}>{q}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{background:'var(--surface-3)',borderRadius:'var(--r-sm)',padding:12}}>
        <p style={{fontSize:12,color:'var(--text-2)',lineHeight:1.6}}>
          📖 <strong>Recuerda:</strong> No leas para terminar capítulos. Lee para escuchar a Dios. Un versículo bien aplicado vale más que 10 capítulos olvidados.
        </p>
      </div>

      {/* Marcar sesión */}
      <div className="card">
        <div className="row-between" style={{marginBottom:12}}>
          <div>
            <p style={{fontSize:13,fontWeight:700}}>Sesión de hoy</p>
            <p style={{fontSize:11,color:'var(--text-3)',marginTop:2}}>
              {streak > 0 ? `🔥 ${streak} día${streak>1?'s':''} consecutivo${streak>1?'s':''}` : 'Sin racha aún'}
            </p>
          </div>
          {todaySession && (
            <span className="pill pill-green">Completado ✓</span>
          )}
        </div>
        <button
          disabled={!!todaySession}
          onClick={() => markToday(phase, book.book)}
          style={{
            width:'100%', padding:'13px 20px', borderRadius:'var(--r-sm)',
            fontFamily:'inherit', fontSize:14, fontWeight:700, cursor: todaySession ? 'default' : 'pointer',
            border: `1.5px solid ${todaySession ? 'var(--green)' : 'var(--accent)'}`,
            background: todaySession ? 'rgba(62,202,140,0.08)' : 'rgba(255,107,53,0.08)',
            color: todaySession ? 'var(--green)' : 'var(--accent)',
            transition:'all .15s',
          }}>
          {todaySession
            ? markedToday ? '✓ Sesión completada hoy' : `✓ Hoy estudiaste: ${todaySession.book}`
            : '+ Marcar sesión de hoy'}
        </button>
      </div>
    </div>
  )
}

function PhaseDetail({ phase, onBack }) {
  const [selectedBook, setSelectedBook] = useState(null)

  if (selectedBook) {
    return <BookDetail book={selectedBook} phase={phase.phase} color={phase.color} onBack={()=>setSelectedBook(null)}/>
  }

  const colorMap = { accent:'var(--accent)', yellow:'var(--yellow)', green:'var(--green)', purple:'var(--purple)' }
  const bgMap = {
    accent: 'linear-gradient(135deg,#1e1610,#221a10)',
    yellow: 'linear-gradient(135deg,#1a1608,#1e1a08)',
    green:  'linear-gradient(135deg,#0e1a14,#121e18)',
    purple: 'linear-gradient(135deg,#13102a,#1a1535)',
  }
  const borderMap = {
    accent: 'rgba(255,107,53,0.25)',
    yellow: 'rgba(245,200,66,0.25)',
    green:  'rgba(62,202,140,0.25)',
    purple: 'rgba(124,107,255,0.25)',
  }

  return (
    <div className="screen">
      <div style={{display:'flex',alignItems:'center',gap:12,marginTop:8}}>
        <button onClick={onBack} style={{background:'var(--surface-2)',border:'1px solid var(--border)',
          borderRadius:10,padding:'6px 12px',color:'var(--text-2)',fontSize:13,cursor:'pointer',fontFamily:'inherit'}}>
          ← Volver
        </button>
        <div>
          <p className="t-cap" style={{marginBottom:2}}>Fase {phase.phase}</p>
          <h1 className="t-h2">{phase.title}</h1>
        </div>
      </div>

      <div style={{background:bgMap[phase.color],border:`1px solid ${borderMap[phase.color]}`,
        borderRadius:'var(--r-lg)',padding:16}}>
        <span className={`pill pill-${phase.color}`} style={{marginBottom:10,display:'inline-flex'}}>{phase.subtitle}</span>
        <p style={{fontSize:13,color:'var(--text-2)',lineHeight:1.6,marginTop:8}}>{phase.description}</p>
      </div>

      <p className="t-cap">Libros de esta fase</p>
      {phase.books.map((book, i) => (
        <div key={book.book} onClick={()=>setSelectedBook(book)}
          style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--r-md)',
            padding:16,cursor:'pointer',display:'flex',alignItems:'center',gap:14,
            WebkitTapHighlightColor:'transparent'}}>
          <div style={{width:44,height:44,borderRadius:12,background:bgMap[phase.color],
            border:`1px solid ${borderMap[phase.color]}`,display:'flex',alignItems:'center',
            justifyContent:'center',flexShrink:0}}>
            <span style={{fontSize:18}}>📖</span>
          </div>
          <div style={{flex:1}}>
            <p style={{fontSize:14,fontWeight:700,marginBottom:3}}>{book.book}</p>
            <p style={{fontSize:11,color:'var(--text-3)'}}>{book.chapters}</p>
            <p style={{fontSize:11,color:`var(--${phase.color})`,marginTop:3,fontWeight:600}}>{book.weeks}</p>
          </div>
          <span style={{fontSize:11,fontWeight:700,color:`var(--${phase.color})`}}>Ver →</span>
        </div>
      ))}
    </div>
  )
}

export default function Biblia({ onBack }) {
  const [selectedPhase, setSelectedPhase] = useState(null)
  const { sessions, streak, todaySession } = useBibleSessions()

  if (selectedPhase) {
    return <PhaseDetail phase={selectedPhase} onBack={()=>setSelectedPhase(null)}/>
  }

  const bgMap = {
    accent: 'linear-gradient(135deg,#1e1610,#221a10)',
    yellow: 'linear-gradient(135deg,#1a1608,#1e1a08)',
    green:  'linear-gradient(135deg,#0e1a14,#121e18)',
    purple: 'linear-gradient(135deg,#13102a,#1a1535)',
  }
  const borderMap = {
    accent: 'rgba(255,107,53,0.25)',
    yellow: 'rgba(245,200,66,0.25)',
    green:  'rgba(62,202,140,0.25)',
    purple: 'rgba(124,107,255,0.25)',
  }

  return (
    <div className="screen">
      <div style={{display:'flex',alignItems:'center',gap:12,marginTop:8}}>
        {onBack && (
          <button onClick={onBack} style={{background:'var(--surface-2)',border:'1px solid var(--border)',
            borderRadius:10,padding:'6px 12px',color:'var(--text-2)',fontSize:13,cursor:'pointer',fontFamily:'inherit'}}>
            ← Volver
          </button>
        )}
        <div>
          <p className="t-cap" style={{marginBottom:4}}>Plan de estudio</p>
          <h1 className="t-h1">Biblia <span className="t-accent">✦</span></h1>
        </div>
      </div>

      {/* Stats */}
      <div className="stat-grid">
        <div className="stat-card">
          <p className="stat-val" style={{color:'var(--accent)'}}>🔥 {streak}</p>
          <p className="stat-lbl">Días consecutivos</p>
        </div>
        <div className="stat-card">
          <p className="stat-val" style={{color:'var(--green)'}}>{sessions.length}</p>
          <p className="stat-lbl">Sesiones totales</p>
        </div>
      </div>

      {todaySession && (
        <div style={{background:'linear-gradient(135deg,#0e1a14,#121e18)',border:'1px solid rgba(62,202,140,0.3)',
          borderRadius:'var(--r-md)',padding:12,display:'flex',alignItems:'center',gap:10}}>
          <span style={{fontSize:20}}>✅</span>
          <div>
            <p style={{fontSize:13,fontWeight:700,color:'var(--green)'}}>Estudiaste hoy</p>
            <p style={{fontSize:11,color:'var(--text-3)',marginTop:2}}>{todaySession.book} · Fase {todaySession.phase}</p>
          </div>
        </div>
      )}

      {/* Intro */}
      <div className="card">
        <p style={{fontSize:13,color:'var(--text-2)',lineHeight:1.7}}>
          <strong style={{color:'var(--text-1)'}}>La Palabra como base.</strong> Cada fase está diseñada para que Dios hable directamente a tu vida — como hombre, como esposo, como padre y como emprendedor.
        </p>
      </div>

      {/* Phase cards */}
      {BIBLE_STUDY_PLAN.map(phase => (
        <div key={phase.phase} onClick={()=>setSelectedPhase(phase)}
          style={{background:bgMap[phase.color],border:`1px solid ${borderMap[phase.color]}`,
            borderRadius:'var(--r-lg)',padding:20,cursor:'pointer',position:'relative',overflow:'hidden',
            WebkitTapHighlightColor:'transparent'}}>
          <div style={{position:'absolute',top:-30,right:-30,width:120,height:120,borderRadius:'50%',
            background:borderMap[phase.color],filter:'blur(35px)',pointerEvents:'none'}}/>
          <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:10}}>
            <span className={`pill pill-${phase.color}`}>Fase {phase.phase}</span>
            <span style={{fontSize:11,fontWeight:700,color:`var(--${phase.color})`}}>Ver →</span>
          </div>
          <p style={{fontSize:16,fontWeight:800,marginBottom:4}}>{phase.title}</p>
          <p style={{fontSize:11,color:'var(--text-3)',marginBottom:10}}>{phase.subtitle}</p>
          <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
            {phase.books.map(b => (
              <span key={b.book} style={{fontSize:10,fontWeight:600,background:'rgba(255,255,255,0.06)',
                padding:'3px 8px',borderRadius:100,color:'var(--text-2)'}}>
                {b.book}
              </span>
            ))}
          </div>
        </div>
      ))}

      <div style={{background:'var(--surface-3)',borderRadius:'var(--r-sm)',padding:12}}>
        <p style={{fontSize:12,color:'var(--text-2)',lineHeight:1.6}}>
          ✝️ <strong>Sugerencia:</strong> Haz una fase por trimestre. Combínala con tu versículo del día en la rutina de mañana.
        </p>
      </div>
    </div>
  )
}
