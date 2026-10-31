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
    pubgD: '2', pubgH: '12', pubgM: '30', pubgS: '0',
    ffD: '3', ffH: '5', ffM: '45', ffS: '0',
    visa: '4242', master: '8888', amex: '1001', vip: '9999',
    wapp: '+92 300 1234567', tele: '@BINRAO876',
    footer: 'DEAL STORE Trusted Seller Since 2020 - 100% Safe'
  })

  const packs = [
    {uc:25000, bonus:3000, price:'$299'},
    {uc:50000, bonus:7000, price:'$549'},
    {uc:75000, bonus:12000, price:'$799'},
    {uc:100000, bonus:20000, price:'$999'},
    {uc:125000, bonus:28000, price:'$1249'},
    {uc:150000, bonus:35000, price:'$1499'},
    {uc:175000, bonus:45000, price:'$1699'},
    {uc:200000, bonus:60000, price:'$1899'},
  ]

  const handleBuy = (i:number) => { if(uid.length<7){ alert('Bhai pehle UID dalo - 5 se start'); return; } setSel(i); setShowPay(true); }

  const inputS = {width:'100%', padding:'10px 12px', borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155', marginTop:4} as any
  const labelS = {fontSize:11, color:'#94a3b8', fontWeight:700, marginTop:12, display:'block'} as any

  return (
    <div style={{background:'#05070d', color:'#fff', minHeight:'100vh'}}>
      {/* TOP */}
      <div style={{display:'flex', justifyContent:'space-between', padding:12, background:'#0e1525', borderBottom:'1px solid #1e293b', position:'sticky', top:0, zIndex:10}}>
        <div style={{display:'flex', gap:8}}>
          <button onClick={()=>setGame('pubg')} style={{padding:'9px 16px', borderRadius:10, fontWeight:900, border: game==='pubg'?'1px solid #fbbf24':'1px solid #334155', background: game==='pubg'?'#fbbf24':'#1e293b', color: game==='pubg'?'#000':'#fff'}}>PUBG UC</button>
          <button onClick={()=>setGame('ff')} style={{padding:'9px 16px', borderRadius:10, fontWeight:900, border: game==='ff'?'1px solid #ef4444':'1px solid #334155', background: game==='ff'?'#ef4444':'#1e293b', color:'#fff'}}>FREE FIRE</button>
        </div>
        <button onClick={()=>setShowSet(true)} style={{padding:'9px 14px', borderRadius:10, border:'1px solid #fbbf24', background:'#1e293b', color:'#fbbf24', fontWeight:800}}>⚙ Setting</button>
      </div>

      <div style={{maxWidth:1100, margin:'0 auto', padding:14}}>
        {/* PRO BANNER */}
        <div style={{background: game==='pubg' ? 'linear-gradient(135deg,#1a1a00,#b45309,#fbbf24)' : 'linear-gradient(135deg,#1a0033,#7c3aed,#ef4444)', borderRadius:16, padding:16, border:'1px solid #fbbf24', display:'flex', gap:14, alignItems:'center'}}>
          <div style={{width:64, height:64, background:'#fff', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', fontSize:32, boxShadow:'0 0 20px rgba(251,191,36,0.5)'}}>{game==='pubg'?'🪙':'💎'}</div>
          <div style={{flex:1}}>
            <div style={{fontWeight:900, fontSize:14, letterSpacing:0.5}}>{game==='pubg'?s.pubgBanner:s.ffBanner}</div>
            <div style={{fontSize:11, opacity:0.9, marginTop:4}}>🔥 OFFICIAL PARTNER • ⚡ 5-30 Min Delivery • ✅ 100% Safe • {s.pubgD}D {s.pubgH}H Left</div>
            <div style={{display:'flex', gap:6, marginTop:8}}>
              <span style={{background:'#000', color:'#fbbf24', fontSize:9, fontWeight:800, padding:'4px 8px', borderRadius:20, border:'1px solid #fbbf24'}}>TRUSTED SELLER</span>
              <span style={{background:'#22c55e', color:'#000', fontSize:9, fontWeight:800, padding:'4px 8px', borderRadius:20}}>LIVE</span>
              <span style={{background:'#fff', color:'#000', fontSize:9, fontWeight:800, padding:'4px 8px', borderRadius:20}}>25K - 200K</span>
            </div>
          </div>
        </div>

        {/* UID BOX */}
        <div style={{background:'#0e1525', border:'1px solid #1e293b', borderRadius:14, padding:14, marginTop:14, boxShadow:'0 4px 20px rgba(0,0,0,0.5)'}}>
          <div style={{fontSize:12, fontWeight:800, color:'#fbbf24', marginBottom:8}}>ENTER YOUR GAME UID</div>
          <input value={uid} onChange={e=>setUid(e.target.value)} placeholder="Enter UID - Must Start With 5" style={{width:'100%', padding:13, borderRadius:10, background:'#020617', color:'#fff', border:'1px solid #334155', outline:'none', fontSize:14}} />
          <div style={{display:'flex', gap:8, marginTop:10}}>{[s.uid1,s.uid2,s.uid3].map(v=><button key={v} onClick={()=>setUid(v)} style={{padding:'6px 12px', borderRadius:20, background:'#1e293b', border:'1px solid #334155', color:'#94a3b8', fontSize:11}}>{v}</button>)}</div>
          {uid.length>7 && <div style={{marginTop:10, background:'linear-gradient(90deg,#052e16,#16a34a)', border:'1px solid #22c55e', padding:'10px 12px', borderRadius:10, fontSize:13, fontWeight:700}}>✅ VERIFIED PLAYER: {game==='pubg'?s.pubgName:s.ffName} | UID: {uid} | LEVEL 85</div>}
        </div>

        {/* PROFESSIONAL PACKS */}
        <div style={{marginTop:16, display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
          {packs.map((p,i)=>{
            const isBest = i===7
            const isHot = i===5 || i===6
            return (
              <div key={i} style={{background: isBest?'linear-gradient(180deg,#422006,#0e1525)':'linear-gradient(180deg,#1e293b,#0e1525)', border: isBest?'2px solid #fbbf24':'1px solid #1e293b', borderRadius:16, padding:12, position:'relative', boxShadow: isBest?'0 0 25px rgba(251,191,36,0.3)':'none'}}>
                {isBest && <div style={{position:'absolute', top:-8, right:12, background:'#fbbf24', color:'#000', fontSize:9, fontWeight:900, padding:'4px 10px', borderRadius:20, border:'1px solid #fff'}}>👑 BEST VALUE</div>}
                {isHot && <div style={{position:'absolute', top:-8, right:12, background:'#ef4444', color:'#fff', fontSize:9, fontWeight:900, padding:'4px 10px', borderRadius:20}}>🔥 HOT</div>}
                
                <div style={{display:'flex', alignItems:'center', gap:10}}>
                  <div style={{width:52, height:52, background: game==='pubg'?'radial-gradient(circle,#fbbf24,#b45309)':'radial-gradient(circle,#a78bfa,#7c3aed)', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, border:'2px solid #fff', boxShadow:'0 2px 10px rgba(0,0,0,0.5)'}}>{game==='pubg'?'💰':'💠'}</div>
                  <div>
                    <div style={{fontWeight:900, fontSize:16, lineHeight:1}}>{p.uc.toLocaleString()}</div>
                    <div style={{fontSize:11, fontWeight:800, color: game==='pubg'?'#fbbf24':'#a78bfa'}}>{game==='pubg'?'PUBG UC':'DIAMONDS'} <span style={{color:'#22c55e'}}>+{p.bonus.toLocaleString()} BONUS</span></div>
                    <div style={{fontSize:10, color:'#94a3b8', marginTop:2}}>{p.price} VALUE</div>
                  </div>
                </div>

                <div style={{marginTop:8, display:'flex', gap:4}}>
                  <span style={{fontSize:8, background:'#020617', border:'1px solid #334155', padding:'3px 6px', borderRadius:5, color:'#64748b'}}>INSTANT</span>
                  <span style={{fontSize:8, background:'#020617', border:'1px solid #334155', padding:'3px 6px', borderRadius:5, color:'#64748b'}}>SAFE</span>
                </div>

                <button onClick={()=>handleBuy(i)} style={{width:'100%', marginTop:10, padding:'11px', borderRadius:11, border:'none', fontWeight:900, fontSize:13, background: game==='pubg'?'linear-gradient(90deg,#fbbf24,#f59e0b)':'linear-gradient(90deg,#ef4444,#dc2626)', color: game==='pubg'?'#000':'#fff', letterSpacing:0.5, boxShadow:'0 4px 10px rgba(0,0,0,0.4)'}}>BUY NOW • {p.uc.toLocaleString()}</button>
              </div>
            )
          })}
        </div>

        {/* REFUND POLICY + FOOTER - TERI DEMAND */}
        <div style={{marginTop:28, background:'#0e1525', border:'1px solid #1e293b', borderRadius:14, padding:16}}>
          <div style={{fontWeight:900, fontSize:13, color:'#fbbf24'}}>📜 REFUND POLICY - DEAL STORE</div>
          <div style={{fontSize:11, color:'#94a3b8', marginTop:8, lineHeight:1.6}}>
            ✅ 100% Delivery Guarantee - 5 to 30 Min me UC/Diamonds add honge<br/>
            ✅ Wrong UID pe no refund - UID check karke dalo<br/>
            ✅ Payment ke baad screenshot bhejo WhatsApp pe<br/>
            ✅ 24/7 Support - {s.wapp} | {s.tele}
          </div>
        </div>

        <div style={{marginTop:18, background:'linear-gradient(90deg,#052e16,#14532d)', border:'1px solid #22c55e', borderRadius:14, padding:16, textAlign:'center'}}>
          <div style={{fontWeight:900, fontSize:15, color:'#22c55e', letterSpacing:1}}>Developer by BIN RAO</div>
          <div style={{fontSize:12, color:'#fff', marginTop:4, fontWeight:600}}>{s.footer}</div>
          <div style={{fontSize:11, color:'#86efac', marginTop:6}}>{s.wapp} | {s.tele} | Official DEAL STORE Since 2020</div>
          <div style={{fontSize:10, color:'#64748b', marginTop:8}}>© 2026 DEAL STORE - All Rights Reserved - PUBG UC & FREE FIRE DIAMONDS OFFICIAL</div>
        </div>
      </div>

      {/* PAYMENT */}
      {showPay && sel!==null && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.9)', zIndex:50, display:'flex', alignItems:'center', justifyContent:'center', padding:15}}>
          <div style={{background:'#0e1525', border:'2px solid #fbbf24', borderRadius:18, width:'100%', maxWidth:430, padding:18}}>
            <div style={{display:'flex', justifyContent:'space-between'}}><h3 style={{margin:0, fontSize:15}}>PAYMENT - {packs[sel].uc.toLocaleString()} {game==='ff'?'💎':'🪙'}</h3><button onClick={()=>setShowPay(false)} style={{background:'#ef4444', color:'#fff', border:'none', padding:'6px 12px', borderRadius:8}}>X</button></div>
            <div style={{marginTop:10, background:'#020617', padding:10, borderRadius:10, fontSize:12}}>UID: <b>{uid}</b> | Player: <b style={{color:'#22c55e'}}>{game==='pubg'?s.pubgName:s.ffName}</b> | BONUS +{packs[sel].bonus.toLocaleString()}</div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginTop:12}}>
              <div style={{background:'#1e293b', padding:10, borderRadius:10, border:'1px solid #334155'}}><div style={{fontSize:10}}>VISA</div><b>.... {s.visa}</b><div style={{fontSize:9, marginTop:3}}>{s.pubgName}</div></div>
              <div style={{background:'#1e293b', padding:10, borderRadius:10, border:'1px solid #334155'}}><div style={{fontSize:10}}>MASTERCARD</div><b>.... {s.master}</b></div>
              <div style={{background:'#1e293b', padding:10, borderRadius:10, border:'1px solid #334155'}}><div style={{fontSize:10}}>AMEX</div><b>.... {s.amex}</b></div>
              <div style={{background:'linear-gradient(135deg,#422006,#1e293b)', padding:10, borderRadius:10, border:'1px solid #fbbf24'}}><div style={{fontSize:10, color:'#fbbf24'}}>VIP</div><b>.... {s.vip}</b></div>
            </div>
            <button onClick={()=>{alert('ORDER PLACED! '+packs[sel!].uc.toLocaleString()+' will be added to UID '+uid); setShowPay(false)}} style={{width:'100%', marginTop:15, padding:13, background:'linear-gradient(90deg,#22c55e,#16a34a)', color:'#000', border:'none', borderRadius:11, fontWeight:900}}>CONFIRM - {packs[sel].uc.toLocaleString()}</button>
          </div>
        </div>
      )}

      {/* SETTING PRO */}
      {showSet && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.95)', zIndex:60, overflow:'auto', padding:15}}>
          <div style={{background:'#0e1525', border:'1px solid #1e293b', borderRadius:16, maxWidth:600, margin:'10px auto', padding:18}}>
            <div style={{display:'flex', justifyContent:'space-between', borderBottom:'1px solid #1e293b', paddingBottom:10}}><h3 style={{margin:0}}>⚙ DEAL STORE Settings</h3><button onClick={()=>setShowSet(false)} style={{background:'#ef4444', color:'#fff', border:'none', padding:'8px 14px', borderRadius:8}}>X Close</button></div>
            <div style={{background:'#111827', border:'1px solid #1e293b', borderRadius:10, padding:12, marginTop:15}}><div style={{fontSize:12, fontWeight:800, color:'#22c55e'}}>👤 PLAYER NAMES</div><label style={labelS}>PUBG Fake Name</label><input value={s.pubgName} onChange={e=>setS({...s, pubgName:e.target.value})} style={inputS} /><label style={labelS}>FF Fake Name</label><input value={s.ffName} onChange={e=>setS({...s, ffName:e.target.value})} style={inputS} /></div>
            <div style={{background:'#111827', border:'1px solid #1e293b', borderRadius:10, padding:12, marginTop:12}}><div style={{fontSize:12, fontWeight:800, color:'#22c55e'}}>🆔 UID BUTTONS</div><label style={labelS}>UID 1</label><input value={s.uid1} onChange={e=>setS({...s, uid1:e.target.value})} style={inputS} /><label style={labelS}>UID 2</label><input value={s.uid2} onChange={e=>setS({...s, uid2:e.target.value})} style={inputS} /><label style={labelS}>UID 3</label><input value={s.uid3} onChange={e=>setS({...s, uid3:e.target.value})} style={inputS} /></div>
            <div style={{background:'#111827', border:'1px solid #1e293b', borderRadius:10, padding:12, marginTop:12}}><div style={{fontSize:12, fontWeight:800, color:'#22c55e'}}>🏷️ BANNER TITLES</div><label style={labelS}>PUBG Banner</label><input value={s.pubgBanner} onChange={e=>setS({...s, pubgBanner:e.target.value})} style={inputS} /><label style={labelS}>FF Banner</label><input value={s.ffBanner} onChange={e=>setS({...s, ffBanner:e.target.value})} style={inputS} /></div>
            <div style={{background:'#111827', border:'1px solid #1e293b', borderRadius:10, padding:12, marginTop:12}}><div style={{fontSize:12, fontWeight:800, color:'#22c55e'}}>💳 CARDS</div><label style={labelS}>VISA</label><input value={s.visa} onChange={e=>setS({...s, visa:e.target.value})} style={inputS} /><label style={labelS}>Master</label><input value={s.master} onChange={e=>setS({...s, master:e.target.value})} style={inputS} /><label style={labelS}>Amex</label><input value={s.amex} onChange={e=>setS({...s, amex:e.target.value})} style={inputS} /><label style={labelS}>VIP</label><input value={s.vip} onChange={e=>setS({...s, vip:e.target.value})} style={inputS} /></div>
            <div style={{background:'#111827', border:'1px solid #1e293b', borderRadius:10, padding:12, marginTop:12}}><div style={{fontSize:12, fontWeight:800, color:'#22c55e'}}>📞 CONTACT</div><label style={labelS}>WhatsApp</label><input value={s.wapp} onChange={e=>setS({...s, wapp:e.target.value})} style={inputS} /><label style={labelS}>Telegram</label><input value={s.tele} onChange={e=>setS({...s, tele:e.target.value})} style={inputS} /><label style={labelS}>Footer</label><input value={s.footer} onChange={e=>setS({...s, footer:e.target.value})} style={inputS} /></div>
            <button onClick={()=>setShowSet(false)} style={{width:'100%', marginTop:15, padding:14, background:'#22c55e', color:'#000', border:'none', borderRadius:10, fontWeight:900}}>💾 SAVE ALL</button>
          </div>
        </div>
      )}
    </div>
  )
}
