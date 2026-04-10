import { useState } from 'react'
import { useDailyTasks } from '../hooks/useDailyTasks'
import { getToday } from '../lib/dateUtils'

function getTomorrow() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toLocaleDateString('en-CA')
}

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div style={{display:'flex',alignItems:'center',gap:10,padding:'11px 0',
      borderTop:'1px solid var(--border)'}}>
      <div onClick={()=>onToggle(task.id, task.done)}
        style={{width:22,height:22,borderRadius:7,flexShrink:0,cursor:'pointer',
          display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s',
          background:task.done?'var(--green)':'transparent',
          border:`1.5px solid ${task.done?'var(--green)':'var(--text-3)'}`}}>
        {task.done && <svg viewBox="0 0 24 24" style={{width:12,height:12,stroke:'#fff',strokeWidth:2.5,fill:'none'}}><polyline points="20 6 9 17 4 12"/></svg>}
      </div>
      <span style={{flex:1,fontSize:13,fontWeight:500,
        color:task.done?'var(--text-3)':'var(--text-1)',
        textDecoration:task.done?'line-through':'none'}}>
        {task.text}
      </span>
      <button onClick={()=>onDelete(task.id)}
        style={{background:'none',border:'none',cursor:'pointer',color:'var(--text-3)',
          fontSize:18,padding:'4px',lineHeight:1,WebkitTapHighlightColor:'transparent'}}>
        ×
      </button>
    </div>
  )
}

export default function Tareas() {
  const today    = getToday()
  const tomorrow = getTomorrow()

  const [tab, setTab]             = useState('today')
  const [showDone, setShowDone]   = useState(false)
  const [input, setInput]         = useState('')

  const activeDate = tab === 'today' ? today : tomorrow
  const { tasks, loading, addTask, toggleTask, deleteTask } = useDailyTasks(activeDate)

  const pending   = tasks.filter(t => !t.done)
  const completed = tasks.filter(t => t.done)
  const pct = tasks.length ? Math.round(completed.length / tasks.length * 100) : 0

  function handleAdd() {
    const text = input.trim()
    if (!text) return
    addTask(text)
    setInput('')
  }

  return (
    <div className="screen">
      <div style={{marginTop:8}}>
        <p className="t-cap" style={{marginBottom:4}}>Tareas</p>
        <h1 className="t-h1">Mi <span className="t-accent">lista</span></h1>
      </div>

      {/* Tab selector */}
      <div style={{display:'flex',background:'var(--surface)',border:'1px solid var(--border)',
        borderRadius:12,padding:4,gap:4}}>
        {[{id:'today',label:'Hoy'},{id:'tomorrow',label:'Mañana'}].map(t=>(
          <button key={t.id} onClick={()=>{setTab(t.id);setShowDone(false)}}
            style={{flex:1,padding:'9px 0',border:'none',borderRadius:9,cursor:'pointer',
              fontFamily:'inherit',fontSize:13,fontWeight:700,transition:'all .15s',
              background: tab===t.id ? 'var(--accent)' : 'transparent',
              color: tab===t.id ? '#fff' : 'var(--text-3)'}}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Add task input */}
      <div style={{display:'flex',gap:8}}>
        <input value={input} onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>e.key==='Enter'&&handleAdd()}
          placeholder={tab==='today' ? 'Agregar tarea para hoy…' : 'Agregar tarea para mañana…'}
          style={{flex:1,background:'var(--surface)',border:'1px solid var(--border)',
            borderRadius:12,padding:'12px 14px',fontSize:13,color:'var(--text-1)',
            fontFamily:'inherit',outline:'none'}}
          onFocus={e=>e.target.style.borderColor='var(--accent)'}
          onBlur={e=>e.target.style.borderColor='var(--border)'}/>
        <button onClick={handleAdd}
          style={{width:46,height:46,borderRadius:12,background:'var(--accent)',border:'none',
            cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,
            boxShadow:'0 4px 16px var(--accent-glow)'}}>
          <svg viewBox="0 0 24 24" style={{width:20,height:20,stroke:'#fff',strokeWidth:2.5,fill:'none',strokeLinecap:'round'}}>
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>
      </div>

      {/* Progress */}
      {!loading && tasks.length > 0 && (
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div className="progress-track" style={{flex:1}}>
            <div className="progress-fill green" style={{width:`${pct}%`}}/>
          </div>
          <span style={{fontSize:12,fontWeight:700,color:pct===100?'var(--green)':'var(--text-3)',flexShrink:0}}>
            {completed.length}/{tasks.length}
          </span>
        </div>
      )}

      {/* Pending tasks */}
      {loading ? (
        <div className="card"><p className="t-body" style={{padding:'16px 0',textAlign:'center'}}>Cargando…</p></div>
      ) : pending.length === 0 && completed.length === 0 ? (
        <div className="card" style={{padding:'24px 0',textAlign:'center'}}>
          <p style={{fontSize:32,marginBottom:8}}>📋</p>
          <p className="t-body">Sin tareas todavía</p>
        </div>
      ) : pending.length === 0 ? (
        <div className="card" style={{padding:'20px 0',textAlign:'center'}}>
          <p style={{fontSize:28,marginBottom:6}}>🎉</p>
          <p style={{fontSize:14,fontWeight:700,color:'var(--green)'}}>¡Todo completado!</p>
          <p className="t-body" style={{fontSize:12,marginTop:4}}>Excelente trabajo hoy</p>
        </div>
      ) : (
        <div className="card">
          {pending.map((task, i) => (
            <div key={task.id} style={{borderTop: i===0?'none':undefined}}>
              <TaskItem task={task} onToggle={toggleTask} onDelete={deleteTask}/>
            </div>
          ))}
        </div>
      )}

      {/* Completed section */}
      {completed.length > 0 && (
        <>
          <div className="sec-header" style={{cursor:'pointer'}} onClick={()=>setShowDone(s=>!s)}>
            <p className="sec-title">Completadas · {completed.length}</p>
            <span style={{fontSize:12,color:'var(--green)',fontWeight:700}}>
              {showDone ? 'Ocultar ▲' : 'Ver todas ▼'}
            </span>
          </div>
          {showDone && (
            <div className="card" style={{opacity:0.7}}>
              {completed.map((task, i) => (
                <div key={task.id} style={{borderTop: i===0?'none':undefined}}>
                  <TaskItem task={task} onToggle={toggleTask} onDelete={deleteTask}/>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {tab === 'tomorrow' && (
        <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:12,padding:12}}>
          <p className="t-body" style={{fontSize:12}}>
            💡 Agrega tus tareas de mañana en la noche — al despertar ya tienes todo listo en "Hoy"
          </p>
        </div>
      )}
    </div>
  )
}
