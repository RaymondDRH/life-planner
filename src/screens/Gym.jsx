import { GYM_ROUTINES, DAY_ROUTINE, ABS_DAYS, WEEKLY_GYM } from '../lib/constants'
import { getDayOfWeek } from '../lib/dateUtils'

function ExerciseRow({ num, ex }) {
  return (
    <div className="ex-row">
      <span className="ex-num">{num}</span>
      <div className="ex-info">
        <p className="ex-name">{ex.name}</p>
        <p className="ex-sets">{ex.sets}</p>
      </div>
      {ex.url ? (
        <a href={ex.url} target="_blank" rel="noopener noreferrer" className="ex-link">
          <svg viewBox="0 0 24 24" style={{width:12,height:12,fill:'#FF5555'}}><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
          Video
        </a>
      ) : (
        <span style={{fontSize:11,color:'var(--text-3)'}}>Calent.</span>
      )}
    </div>
  )
}

export default function Gym() {
  const day = getDayOfWeek()
  const routineKey = DAY_ROUTINE[day]
  const hasAbs = ABS_DAYS.includes(day)
  const routine = routineKey ? GYM_ROUTINES[routineKey] : null
  const absRoutine = GYM_ROUTINES.abs

  // Which column is today in the weekly grid (Mon=0 … Sat=5)
  // WEEKLY_GYM index: 0=L,1=M,2=X,3=J,4=V,5=S
  const gymDayIndex = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5 }[day]

  return (
    <div className="screen">
      <div style={{marginTop:8}}>
        <p className="t-cap" style={{marginBottom:4}}>Rutina del día</p>
        <h1 className="t-h1">
          {routine ? (
            <><span className="t-accent">{routine.name}</span>{hasAbs && <span style={{color:'var(--purple)'}}> + ABS</span>}</>
          ) : (
            <span className="t-muted">Descanso ☀️</span>
          )}
        </h1>
      </div>

      {/* Weekly grid */}
      <div className="card">
        <p className="t-cap" style={{marginBottom:10}}>Semana de entreno</p>
        <div className="gym-week-grid">
          {WEEKLY_GYM.map((g, i) => (
            <div key={g.day} className={`gym-day-cell${i === gymDayIndex ? ' today' : ''}`}>
              <p style={{color: i===gymDayIndex?'#fff':'var(--text-3)'}}>{g.day}</p>
              <p style={{fontSize:8,color:i===gymDayIndex?'#fff':'var(--text-2)',marginTop:2}}>{g.routine}</p>
              {g.abs && <p style={{fontSize:7,color:i===gymDayIndex?'rgba(255,255,255,0.7)':'var(--purple)',marginTop:1}}>+ABS</p>}
            </div>
          ))}
        </div>
      </div>

      {!routine && (
        <div className="hero-card" style={{textAlign:'center',padding:32}}>
          <p style={{fontSize:32,marginBottom:8}}>😴</p>
          <p className="t-h2">Día de descanso</p>
          <p className="t-body" style={{marginTop:8}}>Domingo — recarga energía para la semana</p>
        </div>
      )}

      {/* Main routine */}
      {routine && (
        <>
          <div className="sec-header">
            <p className="sec-title">{routine.name} · {routine.days}</p>
            <div style={{display:'flex',gap:4}}>
              {routine.muscles.map(m => (
                <span key={m} className="pill pill-accent" style={{fontSize:10}}>{m}</span>
              ))}
            </div>
          </div>
          <div className="card">
            {routine.exercises.map((ex, i) => (
              <ExerciseRow key={ex.name} num={i + 1} ex={ex} />
            ))}
          </div>
        </>
      )}

      {/* ABS routine */}
      {hasAbs && (
        <>
          <div className="sec-header" style={{marginTop:4}}>
            <p className="sec-title">ABS · {absRoutine.days}</p>
            <span className="pill pill-purple">Core</span>
          </div>
          <div className="card">
            {absRoutine.exercises.map((ex, i) => (
              <ExerciseRow key={ex.name} num={i + 1} ex={ex} />
            ))}
          </div>
        </>
      )}

      {/* Tip */}
      <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--r-md)',padding:14}}>
        <p className="t-cap" style={{marginBottom:6}}>Recordatorio</p>
        <p className="t-body" style={{fontSize:12}}>Warm-up 5 min antes · Hidratación constante · Última serie al fallo cuando aplique</p>
      </div>
    </div>
  )
}
