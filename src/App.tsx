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
    pubgBanner: 'DEAL STORE - OFFICIAL PUBG UC STORE', 
    ffBanner: 'DEAL STORE - OFFICIAL FREE FIRE DIAMONDS STORE',
    visa: '4242', master: '8888', amex: '1001', vip: '9999',
    wapp: '+92 300 1234567', tele: '@BINRAO876',
  })

  const packs = [25000,50000,75000,100000,125000,150000,175000,200000]
  const handleBuy = (i:number) => { if(uid.length<5){ alert('UID dalo'); return; } setSel(i); setShowPay(true); }

  return (
    <div style={{background:'#05070d', color:'#fff', minHeight:'100vh'}}>
      <div style={{display:'flex', justifyContent:'space-between', padding:12, background:'#0e1525', borderBottom:'1px solid #1e293b', position:'sticky', top:0, zIndex:10}}>
        <div style={{display:'flex', gap:8}}>
          <button onClick={()=>setGame('pubg')} style={{padding:'9px 16px', borderRadius:10, fontWeight:900, border:'1px solid #334155', background: game==='pubg'?'#fbbf24':'#1e293b', color: game==='pubg'?'#000':'#fff'}}>PUBG UC</button>
          <button onClick={()=>setGame('ff')} style={{padding:'9px 16px', borderRadius:10, fontWeight:900, border:'1px solid #334155', background: game==='ff'?'#ef4444':'#1e293b', color:'#fff'}}>FREE FIRE</button>
        </div>
        <button onClick={()=>setShowSet(true)} style={{padding:'9px 14px', borderRadius:10, border:'1px solid #fbbf24', background:'#1e293b', color:'#fbbf24', fontWeight:800}}>⚙ Setting</button>
      </div>

      <div style={{maxWidth:1100, margin:'0 auto', padding:14}}>
        <div style={{background: game==='pubg'?'linear-gradient(135deg,#1a1a00,#b45309,#fbbf24)':'linear-gradient(135deg,#1a0033,#7c3aed,#ef4444)', borderRadius:16, padding:16, border:'1px solid #fbbf24'}}>
          <div style={{fontWeight:900, fontSize:14}}>{game==='pubg'?s.pubgBanner:s.ffBanner}</div>
          <div style={{fontSize:11, marginTop:4, opacity:0.9}}>⚡ 5-30 Min • ✅ Safe • 🔥 LIVE</div>
        </div>

        <div style={{background:'#0e1525', border:'1px solid #1e293b', borderRadius:14, padding:14, marginTop:14}}>
          <input value={uid} onChange={e=>setUid(e.target.value)} placeholder="Enter UID - Must Start With 5" style={{width:'100%', padding:13, borderRadius:10, background:'#020617', color:'#fff', border:'1px solid #334155'}} />
          <div style={{display:'flex', gap:8, marginTop:10}}>{[s.uid1,s.uid2,s.uid3].map(v=><button key={v} onClick={()=>setUid(v)} style={{padding:'6px 12px', borderRadius:20, background:'#1e293b', border:'1px solid #334155', color:'#94a3b8', fontSize:11}}>{v}</button>)}</div>
          {uid.length>7 && <div style={{marginTop:10, background:'#052e16', border:'1px solid #22c55e', padding:'8px 12px', borderRadius:8, fontSize:13}}>✅ Verified: {game==='pubg'?s.pubgName:s.ffName}</div>}
        </div>

        {/* PHOTO JAISA DESIGN */}
        <div style={{background:'#000', padding:12, borderRadius:12, marginTop:14, border:'1px solid #1e293b'}}>
          <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:12}}>
            <span style={{fontSize:20}}>💎</span>
            <span style={{fontWeight:900, fontSize:14}}>FREE FIRE DIAMONDS PACKS</span>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
            {packs.map((amount,i)=>{
              const selected = sel===i
              return (
                <div key={i} style={{background:'#000', border: selected?'2px solid #22c55e':'2px solid #7f1d1d', borderRadius:10, padding:8, textAlign:'center', position:'relative'}}>
                  {selected && <div style={{position:'absolute', top:5, right:5, background:'#22c55e', borderRadius:'50%', width:20, height:20, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, color:'#000', fontWeight:900}}>✓</div>}
                  <div style={{height:85, background:'radial-gradient(circle,#1e293b,#000)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
                    <div style={{fontSize:32}}>{i<2 ? '💎💎' : '🎁'}</div>
                    <div style={{fontSize:8, background:'#7c3aed', padding:'2px 6px', borderRadius:4, color:'#fff', fontWeight:800, marginTop:4}}>FREE FIRE</div>
                  </div>
                  <div style={{fontWeight:900, fontSize:15, marginTop:6}}>{amount.toLocaleString()}</div>
                  <div style={{fontSize:11, fontWeight:700}}>DIAMONDS</div>
                  <button onClick={()=>handleBuy(i)} style={{width:'100%', marginTop:8, background:'#dc2626', color:'#fff', border:'none', padding:'8px', borderRadius:6, fontWeight:800, fontSize:12}}>🛒 Buy Now</button>
                </div>
              )
            })}
          </div>
        </div>

        <div style={{marginTop:20, background:'#0e1525', border:'1px solid #1e293b', borderRadius:14, padding:16, textAlign:'center'}}>
          <div style={{fontWeight:900, color:'#22c55e'}}>Developer by BIN RAO</div>
          <div style={{fontSize:11, color:'#94a3b8', marginTop:6}}>{s.wapp} | {s.tele} | Refund: Wrong UID pe no refund - 5-30 Min Delivery</div>
          <div style={{fontSize:10, color:'#64748b', marginTop:6}}>© 2026 DEAL STORE</div>
        </div>
      </div>

      {showPay && sel!==null && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.9)', zIndex:50, display:'flex', alignItems:'center', justifyContent:'center', padding:15}}>
          <div style={{background:'#0e1525', border:'2px solid #fbbf24', borderRadius:18, width:'100%', maxWidth:430, padding:18}}>
            <div style={{display:'flex', justifyContent:'space-between'}}><h3 style={{margin:0}}>PAYMENT - {packs[sel].toLocaleString()}</h3><button onClick={()=>setShowPay(false)} style={{background:'#ef4444', color:'#fff', border:'none', padding:'6px 12px', borderRadius:8}}>X</button></div>
            <div style={{marginTop:10, background:'#020617', padding:10, borderRadius:10, fontSize:12}}>UID: <b>{uid}</b> | Player: <b style={{color:'#22c55e'}}>{game==='pubg'?s.pubgName:s.ffName}</b></div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginTop:12}}>
              <div style={{background:'#1e293b', padding:10, borderRadius:10}}><div style={{fontSize:10}}>VISA</div><b>.... {s.visa}</b></div>
              <div style={{background:'#1e293b', padding:10, borderRadius:10}}><div style={{fontSize:10}}>MC</div><b>.... {s.master}</b></div>
            </div>
            <button onClick={()=>{alert('ORDER PLACED!'); setShowPay(false)}} style={{width:'100%', marginTop:15, padding:13, background:'#22c55e', border:'none', borderRadius:11, fontWeight:900}}>CONFIRM</button>
          </div>
        </div>
      )}

      {showSet && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.95)', zIndex:60, overflow:'auto', padding:15}}>
          <div style={{background:'#0e1525', border:'1px solid #1e293b', borderRadius:16, maxWidth:600, margin:'10px auto', padding:18}}>
            <div style={{display:'flex', justifyContent:'space-between'}}><h3 style={{margin:0}}>⚙ Setting</h3><button onClick={()=>setShowSet(false)} style={{background:'#ef4444', color:'#fff', border:'none', padding:'8px 14px', borderRadius:8}}>X</button></div>
            <div style={{marginTop:12}}>
              <label style={{fontSize:11, color:'#94a3b8'}}>PUBG Name</label><input value={s.pubgName} onChange={e=>setS({...s, pubgName:e.target.value})} style={{width:'100%', padding:10, borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155', marginTop:4}} />
              <label style={{fontSize:11, color:'#94a3b8', marginTop:10, display:'block'}}>FF Name</label><input value={s.ffName} onChange={e=>setS({...s, ffName:e.target.value})} style={{width:'100%', padding:10, borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155', marginTop:4}} />
            </div>
            <button onClick={()=>setShowSet(false)} style={{width:'100%', marginTop:15, padding:14, background:'#22c55e', color:'#000', border:'none', borderRadius:10, fontWeight:900}}>SAVE</button>
          </div>
        </div>
      )}
    </div>
  )
}
