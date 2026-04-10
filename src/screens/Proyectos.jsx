import { useState } from 'react'
import { useOKRs } from '../hooks/useOKRs'
import { useTradingEntries, useIncomeEntries, useEmergencyFund } from '../hooks/useFinancial'

function OKRItem({ okr, onUpdate }) {
  const [editing, setEditing] = useState(false)
  const [val, setVal] = useState('')

  const pct = okr.target_value > 0
    ? Math.min(100, Math.round((okr.current_value / okr.target_value) * 100))
    : 0

  const colorClass = pct >= 80 ? 'green' : pct >= 50 ? 'yellow' : ''

  function save() {
    const n = parseFloat(val)
    if (!isNaN(n) && n >= 0) onUpdate(okr.id, n)
    setEditing(false)
  }

  return (
    <div className="okr-item">
      <div className="okr-row">
        <span className="okr-desc">{okr.description}</span>
        {editing ? (
          <input autoFocus value={val} onChange={e=>setVal(e.target.value)}
            onBlur={save} onKeyDown={e=>e.key==='Enter'&&save()}
            style={{background:'var(--surface-3)',border:'1px solid var(--purple)',color:'var(--text-1)',
              fontSize:12,fontWeight:700,width:70,textAlign:'center',fontFamily:'inherit',
              borderRadius:6,padding:'3px 6px',outline:'none'}}
            type="number" step="any"/>
        ) : (
          <div style={{display:'flex',alignItems:'center',gap:4}}>
            <span className="okr-val">{okr.current_value}{okr.unit} / {okr.target_value}{okr.unit}</span>
            <button className="okr-edit" onClick={()=>{setEditing(true);setVal(String(okr.current_value))}}>✎</button>
          </div>
        )}
      </div>
      <div className="progress-track">
        <div className={`progress-fill ${colorClass}`} style={{width:`${pct}%`}}/>
      </div>
      <p style={{fontSize:10,color:'var(--text-3)',textAlign:'right'}}>{pct}%</p>
    </div>
  )
}

function AddEntryModal({ title, fields, onSave, onClose }) {
  const [vals, setVals] = useState({})
  function set(k, v) { setVals(p => ({...p, [k]: v})) }
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <p className="t-h3" style={{marginBottom:14}}>{title}</p>
        {fields.map(f => (
          <div key={f.key} style={{marginBottom:10}}>
            <p className="t-cap" style={{marginBottom:4}}>{f.label}</p>
            {f.type === 'select' ? (
              <select value={vals[f.key]||''} onChange={e=>set(f.key,e.target.value)}
                className="modal-input" style={{fontSize:14,padding:'10px 12px'}}>
                <option value="">Seleccionar…</option>
                {f.options.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            ) : (
              <input className="modal-input" type={f.type||'text'} placeholder={f.placeholder||''}
                value={vals[f.key]||''} onChange={e=>set(f.key,e.target.value)}/>
            )}
          </div>
        ))}
        <div className="modal-actions">
          <button className="btn btn-surface btn-sm" onClick={onClose}>Cancelar</button>
          <button className="btn btn-purple btn-sm" style={{flex:1}} onClick={()=>onSave(vals)}>Guardar</button>
        </div>
      </div>
    </div>
  )
}

export default function Proyectos() {
  const { okrs, loading: okrLoading, updateKR } = useOKRs()
  const { fund, update: updateFund } = useEmergencyFund()
  const { entries: trades, addEntry: addTrade, weeklyNet, count: tradeCount } = useTradingEntries()
  const { entries: income, addEntry: addIncome, aicrafterTotal, amazonTotal } = useIncomeEntries()

  const [modal, setModal] = useState(null) // 'trade' | 'income' | 'fund'
  const [fundEdit, setFundEdit] = useState(false)
  const [fundVal, setFundVal] = useState('')

  const fundPct = Math.min(100, Math.round((fund.amount / fund.goal) * 100))

  const okrByProject = okrs.reduce((acc, o) => {
    ;(acc[o.project] = acc[o.project] || []).push(o)
    return acc
  }, {})

  const projectColors = {
    'AICrafterLab': 'accent',
    'Trading':      'purple',
    'Amazon FBA':   'green',
  }

  async function handleAddTrade(vals) {
    const today = new Date().toLocaleDateString('en-CA')
    await addTrade({
      date: today,
      asset: vals.asset || '',
      entry_price: parseFloat(vals.entry_price) || 0,
      exit_price:  parseFloat(vals.exit_price)  || 0,
      result:      parseFloat(vals.result)      || 0,
      notes:       vals.notes || '',
    })
    setModal(null)
  }

  async function handleAddIncome(vals) {
    const today = new Date().toLocaleDateString('en-CA')
    await addIncome({
      date:   today,
      source: vals.source,
      amount: parseFloat(vals.amount) || 0,
      notes:  vals.notes || '',
    })
    setModal(null)
  }

  function saveFund() {
    const v = parseFloat(fundVal)
    if (!isNaN(v) && v >= 0) updateFund(v)
    setFundEdit(false)
  }

  return (
    <div className="screen">
      <div style={{marginTop:8}}>
        <p className="t-cap" style={{marginBottom:4}}>Proyectos & OKRs</p>
        <h1 className="t-h1">Mis <span className="t-accent">Métricas</span></h1>
      </div>

      {/* OKRs by project */}
      {okrLoading ? (
        <div className="card"><p className="t-body">Cargando OKRs…</p></div>
      ) : (
        Object.entries(okrByProject).map(([proj, items]) => (
          <div key={proj}>
            <div className="sec-header">
              <p className="sec-title">{proj}</p>
              <span className={`pill pill-${projectColors[proj]||'surface'}`}>
                <span className="pill-dot"/>Q2 2026
              </span>
            </div>
            <div className="card">
              {items.map(o => <OKRItem key={o.id} okr={o} onUpdate={updateKR}/>)}
            </div>
          </div>
        ))
      )}

      {/* Weekly financials */}
      <div className="sec-header">
        <p className="sec-title">Semana actual</p>
        <button className="btn btn-surface btn-sm" style={{width:'auto',padding:'6px 12px'}}
          onClick={()=>setModal('income')}>+ Ingreso</button>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <p className="stat-val" style={{color:'var(--accent)'}}>
            ${aicrafterTotal.toFixed(0)}
          </p>
          <p className="stat-lbl">AICrafterLab</p>
        </div>
        <div className="stat-card">
          <p className="stat-val" style={{color:'var(--green)'}}>
            ${amazonTotal.toFixed(0)}
          </p>
          <p className="stat-lbl">Amazon FBA</p>
        </div>
      </div>

      {/* Trading */}
      <div className="sec-header">
        <p className="sec-title">Trading esta semana</p>
        <button className="btn btn-surface btn-sm" style={{width:'auto',padding:'6px 12px'}}
          onClick={()=>setModal('trade')}>+ Trade</button>
      </div>
      <div className="hero-card" style={{background:'linear-gradient(135deg,#13102a,#1a1535)'}}>
        <div className="row-between" style={{marginBottom:12}}>
          <div>
            <p className="t-cap" style={{marginBottom:4}}>Resultado neto</p>
            <p style={{fontSize:28,fontWeight:800,
              color:weeklyNet>=0?'var(--green)':weeklyNet<0?'#EF4444':'var(--text-1)'}}>
              {weeklyNet>=0?'+':''}{weeklyNet.toFixed(2)}
            </p>
          </div>
          <div style={{textAlign:'right'}}>
            <p className="t-cap" style={{marginBottom:4}}>Operaciones</p>
            <p style={{fontSize:28,fontWeight:800}}>{tradeCount}</p>
          </div>
        </div>
        {trades.slice(0,3).map(t => (
          <div key={t.id} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',
            borderTop:'1px solid var(--border)',fontSize:12}}>
            <span style={{color:'var(--text-2)'}}>{t.asset || 'Sin activo'} · {t.date}</span>
            <span style={{fontWeight:700,color:parseFloat(t.result)>=0?'var(--green)':'#EF4444'}}>
              {parseFloat(t.result)>=0?'+':''}{parseFloat(t.result).toFixed(2)}
            </span>
          </div>
        ))}
        {trades.length === 0 && <p className="t-body" style={{fontSize:12}}>Sin operaciones esta semana</p>}
      </div>

      {/* Emergency fund */}
      <div className="sec-header">
        <p className="sec-title">Fondo de emergencia</p>
      </div>
      <div className="card-lg card">
        <div className="row-between" style={{marginBottom:12}}>
          <div>
            <p className="t-cap" style={{marginBottom:4}}>Ahorrado</p>
            {fundEdit ? (
              <input autoFocus value={fundVal} onChange={e=>setFundVal(e.target.value)}
                onBlur={saveFund} onKeyDown={e=>e.key==='Enter'&&saveFund()}
                style={{background:'transparent',border:'none',color:'var(--green)',fontSize:26,
                  fontWeight:800,width:120,fontFamily:'inherit',outline:'none'}}
                type="number" step="0.01" placeholder="0"/>
            ) : (
              <p onClick={()=>{setFundEdit(true);setFundVal(String(fund.amount))}}
                style={{fontSize:26,fontWeight:800,color:'var(--green)',cursor:'pointer'}}>
                ${fund.amount.toFixed(0)}
              </p>
            )}
          </div>
          <div style={{textAlign:'right'}}>
            <p className="t-cap" style={{marginBottom:4}}>Meta</p>
            <p style={{fontSize:26,fontWeight:800}}>${fund.goal.toFixed(0)}</p>
          </div>
        </div>
        <div className="progress-track" style={{height:8}}>
          <div className="progress-fill green" style={{width:`${fundPct}%`}}/>
        </div>
        <div className="row-between" style={{marginTop:8}}>
          <p className="t-cap">{fundPct}% logrado</p>
          <p className="t-cap">${(fund.goal - fund.amount).toFixed(0)} restante</p>
        </div>
        <p className="t-cap" style={{marginTop:8,color:'var(--text-3)'}}>Toca el monto para actualizar</p>
      </div>

      {/* Modals */}
      {modal === 'trade' && (
        <AddEntryModal
          title="Agregar operación"
          onClose={()=>setModal(null)}
          onSave={handleAddTrade}
          fields={[
            {key:'asset',     label:'Activo (ticker)',  placeholder:'SPY, QQQ…'},
            {key:'entry_price',label:'Precio entrada',  type:'number', placeholder:'0.00'},
            {key:'exit_price', label:'Precio salida',   type:'number', placeholder:'0.00'},
            {key:'result',     label:'Resultado ($)',   type:'number', placeholder:'+/- 0.00'},
            {key:'notes',      label:'Notas (opcional)', placeholder:''},
          ]}
        />
      )}

      {modal === 'income' && (
        <AddEntryModal
          title="Agregar ingreso"
          onClose={()=>setModal(null)}
          onSave={handleAddIncome}
          fields={[
            {key:'source', label:'Fuente', type:'select', options:[
              {value:'aicrafterlab', label:'AICrafterLab'},
              {value:'amazon_fba',   label:'Amazon FBA'},
              {value:'other',        label:'Otro'},
            ]},
            {key:'amount', label:'Monto ($)', type:'number', placeholder:'0.00'},
            {key:'notes',  label:'Notas (opcional)', placeholder:''},
          ]}
        />
      )}
    </div>
  )
}
