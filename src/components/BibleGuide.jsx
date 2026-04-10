import { getVerseOfDay } from '../lib/constants'

const ANALYSIS_QUESTIONS = [
  '¿Qué dice exactamente este versículo? (léelo 2–3 veces lentamente)',
  '¿Qué significa para ti hoy, en tu situación actual?',
  '¿Hay algo que Dios te está diciendo a través de estas palabras?',
  '¿Cómo puedes aplicar esto en tu día de hoy?',
]

const PRAYER_GUIDE = [
  { icon: '🙏', step: 'Gratitud', desc: 'Empieza dando gracias — por la vida, la familia, la salud, las oportunidades.' },
  { icon: '🔍', step: 'Confesión', desc: 'Pide perdón por lo que sabes que no estuvo bien. Sin carga, con confianza.' },
  { icon: '🤲', step: 'Intercesión', desc: 'Ora por tu familia (esposa, hija), por tus negocios, por alguien que lo necesite.' },
  { icon: '🎯', step: 'Petición', desc: 'Presenta tus metas y necesidades a Dios con fe. Sé específico.' },
  { icon: '👂', step: 'Escucha', desc: 'Quédate 1–2 minutos en silencio. Deja que Dios hable a tu corazón.' },
]

export default function BibleGuide({ onClose }) {
  const verse = getVerseOfDay()

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
        style={{background:'var(--surface-2)',border:'1px solid var(--border)',borderRadius:'var(--r-lg)',
          padding:24,width:'100%',maxWidth:420,maxHeight:'85vh',overflowY:'auto',
          display:'flex',flexDirection:'column',gap:20}}>

        {/* Header */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
          <div>
            <p className="t-cap" style={{marginBottom:4}}>Guía de hoy</p>
            <h2 className="t-h2">Oración + Biblia</h2>
          </div>
          <button onClick={onClose}
            style={{background:'var(--surface-3)',border:'none',borderRadius:8,width:32,height:32,
              cursor:'pointer',color:'var(--text-2)',fontSize:18,display:'flex',alignItems:'center',
              justifyContent:'center',flexShrink:0}}>×</button>
        </div>

        {/* Versículo del día */}
        <div style={{background:'linear-gradient(135deg,#13102a,#1a1535)',border:'1px solid rgba(124,107,255,0.3)',
          borderRadius:'var(--r-md)',padding:16}}>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12}}>
            <span style={{fontSize:18}}>✝️</span>
            <span className="pill pill-purple">Versículo del día</span>
          </div>
          <p style={{fontSize:15,fontWeight:700,color:'var(--text-1)',lineHeight:1.6,marginBottom:8,fontStyle:'italic'}}>
            "{verse.text}"
          </p>
          <p style={{fontSize:12,fontWeight:700,color:'var(--purple)'}}>— {verse.ref}</p>
        </div>

        {/* Cómo leerlo */}
        <div>
          <p className="t-cap" style={{marginBottom:10}}>Cómo leerlo</p>
          <div className="card" style={{padding:14}}>
            {[
              { n:'1', text:'Lee el versículo completo una vez en voz alta' },
              { n:'2', text:'Cierra los ojos y repite la frase clave que más te impactó' },
              { n:'3', text:'Léelo una tercera vez muy despacio, palabra por palabra' },
            ].map(s => (
              <div key={s.n} style={{display:'flex',gap:10,alignItems:'flex-start',
                padding:'8px 0',borderTop: s.n==='1'?'none':'1px solid var(--border)'}}>
                <span style={{width:22,height:22,borderRadius:'50%',background:'var(--surface-3)',
                  display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,
                  fontWeight:700,color:'var(--accent)',flexShrink:0}}>{s.n}</span>
                <p style={{fontSize:13,color:'var(--text-2)',lineHeight:1.5}}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Preguntas de análisis */}
        <div>
          <p className="t-cap" style={{marginBottom:10}}>Analízalo</p>
          <div className="card" style={{padding:14}}>
            {ANALYSIS_QUESTIONS.map((q, i) => (
              <div key={i} style={{display:'flex',gap:10,alignItems:'flex-start',
                padding:'8px 0',borderTop:i===0?'none':'1px solid var(--border)'}}>
                <span style={{fontSize:11,fontWeight:700,color:'var(--yellow)',flexShrink:0,marginTop:2}}>Q{i+1}</span>
                <p style={{fontSize:13,color:'var(--text-2)',lineHeight:1.5}}>{q}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guía de oración */}
        <div>
          <p className="t-cap" style={{marginBottom:10}}>Guía de oración (~20 min)</p>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {PRAYER_GUIDE.map((p, i) => (
              <div key={i} style={{background:'var(--surface)',border:'1px solid var(--border)',
                borderRadius:'var(--r-sm)',padding:12,display:'flex',gap:12,alignItems:'flex-start'}}>
                <span style={{fontSize:20,flexShrink:0}}>{p.icon}</span>
                <div>
                  <p style={{fontSize:13,fontWeight:700,marginBottom:3}}>{p.step}</p>
                  <p style={{fontSize:12,color:'var(--text-2)',lineHeight:1.5}}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tip final */}
        <div style={{background:'var(--surface-3)',borderRadius:'var(--r-sm)',padding:12}}>
          <p style={{fontSize:12,color:'var(--text-2)',lineHeight:1.6}}>
            💡 <strong>Tip:</strong> No necesitas tener todo resuelto al orar. Llega con honestidad. Dios conoce tu corazón más de lo que tú mismo lo conoces.
          </p>
        </div>

        <button className="btn btn-purple" onClick={onClose}>Listo, empezar el día</button>
      </div>
    </div>
  )
}
