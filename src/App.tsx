import { useState } from 'react'

export default function App() {
  const [game, setGame] = useState('pubg')
  const [sel, setSel] = useState<number | null>(null)
  const [uid, setUid] = useState('')
  const [showSet, setShowSet] = useState(false)
  const [showPay, setShowPay] = useState(false)

  const [s, setS] = useState({
    pubgName: 'BINRAO 876', ffName: 'BINRAO FF',
    uid1: '5991827364', uid2: '5829104821', uid3: '5123456789',
    pubgBanner: 'DEAL STORE - PUBG UC OFFICIAL - 25K TO 200K',
    ffBanner: 'DEAL STORE - FREE FIRE OFFICIAL - 25K TO 200K',
    pubgD: '2', pubgH: '12', pubgM: '30', pubgS: '0',
    ffD: '3', ffH: '5', ffM: '45', ffS: '0',
    visa: '4242', master: '8888', amex: '1001', vip: '9999',
    wapp: '+92 300 1234567', tele: '@BINRAO876',
    footer: 'WhatsApp: +92 300 1234567 | Telegram: @BINRAO876 | DEAL STORE'
  })

  const packs = [25000,50000,75000,100000,125000,150000,175000,200000]
  const handleBuy = (i:number) => { if(uid.length<5){ alert('UID dalo pehle'); return; } setSel(i); setShowPay(true); }

  const labelStyle = {fontSize:11, color:'#94a3b8', fontWeight:700, marginTop:12, display:'block', letterSpacing:0.5}
  const inputStyle = {width:'100%', padding:'10px 12px', borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155', marginTop:4, outline:'none'} as any

  return (
    <div style={{background:'#070a10', color:'#fff', minHeight:'100vh'}}>
      <div style={{display:'flex', justifyContent:'space-between', padding:12, background:'#101827', borderBottom:'1px solid #1e293b', position:'sticky', top:0, zIndex:10}}>
        <div style={{display:'flex', gap:8}}>
          <button onClick={()=>setGame('pubg')} style={{padding:'8px 16px', borderRadius:8, fontWeight:700, border: game==='pubg'?'1px solid #22c55e':'1px solid #334155', background: game==='pubg'?'#16a34a':'#1e293b', color:'#fff'}}>PUBG UC</button>
          <button onClick={()=>setGame('ff')} style={{padding:'8px 16px', borderRadius:8, fontWeight:700, border: game==='ff'?'1px solid #22c55e':'1px solid #334155', background: game==='ff'?'#16a34a':'#1e293b', color:'#fff'}}>FREE FIRE</button>
        </div>
        <button onClick={()=>setShowSet(true)} style={{padding:'8px 14px', borderRadius:8, border:'1px solid #fbbf24', background:'#1e293b', color:'#fbbf24', fontWeight:700}}>⚙ Setting</button>
      </div>

      <div style={{maxWidth:1100, margin:'0 auto', padding:15}}>
        <div style={{background: game==='pubg' ? 'linear-gradient(135deg,#0f172a,#14532d)' : 'linear-gradient(135deg,#0f172a,#4c1d95)', borderRadius:16, padding:18, border:'1px solid #1e293b'}}>
          <h2 style={{margin:0, fontSize:16}}>{game==='pubg'?s.pubgBanner:s.ffBanner}</h2>
          <p style={{margin:'6px 0 0', fontSize:12, opacity:0.8}}>Instant Delivery • Verified • 5-30 Min</p>
        </div>

        <div style={{background:'#111827', border:'1px solid #1e293b', borderRadius:12, padding:14, marginTop:14}}>
          <input value={uid} onChange={e=>setUid(e.target.value)} placeholder="Enter UID - 5 se start" style={inputStyle} />
          <div style={{display:'flex', gap:8, marginTop:10}}>{[s.uid1,s.uid2,s.uid3].map(v=><button key={v} onClick={()=>setUid(v)} style={{padding:'6px 12px', borderRadius:20, background:'#1e293b', border:'1px solid #334155', color:'#94a3b8', fontSize:12}}>{v}</button>)}</div>
          {uid.length>7 && <div style={{marginTop:10, color:'#22c55e', background:'#052e16', border:'1px solid #16a34a', padding:'8px 12px', borderRadius:8, fontSize:13}}>✓ Verified: {game==='pubg'?s.pubgName:s.ffName}</div>}
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:14}}>
          {packs.map((v,i)=>(
            <div key={i} style={{background:'#1e293b', border:'1px solid #1e293b', borderRadius:14, padding:12}}>
              <div style={{display:'flex', alignItems:'center', gap:10}}><div style={{width:45,height:45, background: game==='ff'?'#7c3aed':'#16a34a', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22}}>{game==='ff'?'💎':'🔶'}</div><div><div style={{fontWeight:900}}>{v.toLocaleString()}</div><div style={{fontSize:11,color:'#94a3b8'}}>{game==='ff'?'DIAMONDS':'UC'}</div></div></div>
              <button onClick={()=>handleBuy(i)} style={{width:'100%', marginTop:10, padding:10, borderRadius:10, border:'none', fontWeight:900, background: game==='ff'?'#ef4444':'#fbbf24', color: game==='ff'?'#fff':'#000'}}>BUY NOW</button>
            </div>
          ))}
        </div>

        <div style={{textAlign:'center', marginTop:25, padding:15, borderTop:'1px solid #1e293b'}}><div style={{color:'#22c55e', fontWeight:800}}>Developer by BIN RAO</div><div style={{fontSize:11,color:'#64748b', marginTop:6}}>{s.footer}</div></div>
      </div>

      {showPay && sel!==null && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', zIndex:50, display:'flex', alignItems:'center', justifyContent:'center', padding:15}}>
          <div style={{background:'#0f172a', border:'1px solid #1e293b', borderRadius:16, width:'100%', maxWidth:420, padding:18}}>
            <div style={{display:'flex', justifyContent:'space-between'}}><h3 style={{margin:0}}>Payment</h3><button onClick={()=>setShowPay(false)} style={{background:'#ef4444', color:'#fff', border:'none', padding:'6px 12px', borderRadius:8}}>X</button></div>
            <div style={{marginTop:10, background:'#020617', padding:10, borderRadius:8, fontSize:13}}>UID: <b>{uid}</b> | {packs[sel].toLocaleString()} {game==='ff'?'Diamonds':'UC'}</div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginTop:12}}>
              <div style={{background:'#1e293b', padding:10, borderRadius:10}}><div style={{fontSize:10}}>VISA</div><b>.... {s.visa}</b></div>
              <div style={{background:'#1e293b', padding:10, borderRadius:10}}><div style={{fontSize:10}}>MC</div><b>.... {s.master}</b></div>
              <div style={{background:'#1e293b', padding:10, borderRadius:10}}><div style={{fontSize:10}}>AMEX</div><b>.... {s.amex}</b></div>
              <div style={{background:'#1e293b', border:'1px solid #fbbf24', padding:10, borderRadius:10}}><div style={{fontSize:10}}>VIP</div><b>.... {s.vip}</b></div>
            </div>
            <button onClick={()=>{alert('Order Placed!'); setShowPay(false)}} style={{width:'100%', marginTop:15, padding:12, background:'#22c55e', border:'none', borderRadius:10, fontWeight:900}}>CONFIRM PAYMENT</button>
          </div>
        </div>
      )}

      {showSet && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.92)', zIndex:60, overflow:'auto', padding:15}}>
          <div style={{background:'#0f172a', border:'1px solid #1e293b', borderRadius:16, maxWidth:600, margin:'10px auto', padding:18}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid #1e293b', paddingBottom:10}}>
              <h3 style={{margin:0}}>⚙ DEAL STORE Settings</h3>
              <button onClick={()=>setShowSet(false)} style={{background:'#ef4444', color:'#fff', border:'none', padding:'8px 14px', borderRadius:8, fontWeight:700}}>X Close</button>
            </div>

            {/* SECTION 1 */}
            <div style={{background:'#111827', border:'1px solid #1e293b', borderRadius:10, padding:12, marginTop:15}}>
              <div style={{fontSize:12, fontWeight:800, color:'#22c55e'}}>👤 PLAYER NAMES</div>
              <label style={labelStyle}>PUBG Fake Name</label><input value={s.pubgName} onChange={e=>setS({...s, pubgName:e.target.value})} style={inputStyle} />
              <label style={labelStyle}>Free Fire Fake Name</label><input value={s.ffName} onChange={e=>setS({...s, ffName:e.target.value})} style={inputStyle} />
            </div>

            {/* SECTION 2 */}
            <div style={{background:'#111827', border:'1px solid #1e293b', borderRadius:10, padding:12, marginTop:12}}>
              <div style={{fontSize:12, fontWeight:800, color:'#22c55e'}}>🆔 QUICK UID BUTTONS</div>
              <label style={labelStyle}>UID Button 1 - (5 se start)</label><input value={s.uid1} onChange={e=>setS({...s, uid1:e.target.value})} style={inputStyle} />
              <label style={labelStyle}>UID Button 2</label><input value={s.uid2} onChange={e=>setS({...s, uid2:e.target.value})} style={inputStyle} />
              <label style={labelStyle}>UID Button 3</label><input value={s.uid3} onChange={e=>setS({...s, uid3:e.target.value})} style={inputStyle} />
            </div>

            {/* SECTION 3 */}
            <div style={{background:'#111827', border:'1px solid #1e293b', borderRadius:10, padding:12, marginTop:12}}>
              <div style={{fontSize:12, fontWeight:800, color:'#22c55e'}}>🏷️ BANNER TITLES</div>
              <label style={labelStyle}>PUBG Banner Title</label><input value={s.pubgBanner} onChange={e=>setS({...s, pubgBanner:e.target.value})} style={inputStyle} />
              <label style={labelStyle}>Free Fire Banner Title</label><input value={s.ffBanner} onChange={e=>setS({...s, ffBanner:e.target.value})} style={inputStyle} />
            </div>

            {/* SECTION 4 */}
            <div style={{background:'#111827', border:'1px solid #1e293b', borderRadius:10, padding:12, marginTop:12}}>
              <div style={{fontSize:12, fontWeight:800, color:'#22c55e'}}>⏰ TIMER SETTINGS</div>
              <div style={{fontSize:11, color:'#64748b', marginTop:6}}>PUBG Timer</div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:8, marginTop:4}}>
                <div><label style={labelStyle}>Days</label><input value={s.pubgD} onChange={e=>setS({...s, pubgD:e.target.value})} style={inputStyle} /></div>
                <div><label style={labelStyle}>Hours</label><input value={s.pubgH} onChange={e=>setS({...s, pubgH:e.target.value})} style={inputStyle} /></div>
                <div><label style={labelStyle}>Mins</label><input value={s.pubgM} onChange={e=>setS({...s, pubgM:e.target.value})} style={inputStyle} /></div>
                <div><label style={labelStyle}>Secs</label><input value={s.pubgS} onChange={e=>setS({...s, pubgS:e.target.value})} style={inputStyle} /></div>
              </div>
              <div style={{fontSize:11, color:'#64748b', marginTop:12}}>Free Fire Timer</div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:8, marginTop:4}}>
                <div><label style={labelStyle}>Days</label><input value={s.ffD} onChange={e=>setS({...s, ffD:e.target.value})} style={inputStyle} /></div>
                <div><label style={labelStyle}>Hours</label><input value={s.ffH} onChange={e=>setS({...s, ffH:e.target.value})} style={inputStyle} /></div>
                <div><label style={labelStyle}>Mins</label><input value={s.ffM} onChange={e=>setS({...s, ffM:e.target.value})} style={inputStyle} /></div>
                <div><label style={labelStyle}>Secs</label><input value={s.ffS} onChange={e=>setS({...s, ffS:e.target.value})} style={inputStyle} /></div>
              </div>
            </div>

            {/* SECTION 5 */}
            <div style={{background:'#111827', border:'1px solid #1e293b', borderRadius:10, padding:12, marginTop:12}}>
              <div style={{fontSize:12, fontWeight:800, color:'#22c55e'}}>💳 PAYMENT CARDS - Last 4 Digits</div>
              <label style={labelStyle}>VISA Card</label><input value={s.visa} onChange={e=>setS({...s, visa:e.target.value})} style={inputStyle} />
              <label style={labelStyle}>MasterCard</label><input value={s.master} onChange={e=>setS({...s, master:e.target.value})} style={inputStyle} />
              <label style={labelStyle}>AMEX Card</label><input value={s.amex} onChange={e=>setS({...s, amex:e.target.value})} style={inputStyle} />
              <label style={labelStyle}>VIP Card</label><input value={s.vip} onChange={e=>setS({...s, vip:e.target.value})} style={inputStyle} />
            </div>

            {/* SECTION 6 */}
            <div style={{background:'#111827', border:'1px solid #1e293b', borderRadius:10, padding:12, marginTop:12}}>
              <div style={{fontSize:12, fontWeight:800, color:'#22c55e'}}>📞 CONTACT INFO</div>
              <label style={labelStyle}>WhatsApp Number</label><input value={s.wapp} onChange={e=>setS({...s, wapp:e.target.value})} style={inputStyle} />
              <label style={labelStyle}>Telegram ID</label><input value={s.tele} onChange={e=>setS({...s, tele:e.target.value})} style={inputStyle} />
              <label style={labelStyle}>Footer Text</label><input value={s.footer} onChange={e=>setS({...s, footer:e.target.value})} style={inputStyle} />
            </div>

            <button onClick={()=>setShowSet(false)} style={{width:'100%', marginTop:15, padding:14, background:'#22c55e', color:'#000', border:'none', borderRadius:10, fontWeight:900, fontSize:15}}>💾 SAVE ALL SETTINGS</button>
          </div>
        </div>
      )}
    </div>
  )
}
