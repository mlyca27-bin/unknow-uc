import { useState } from 'react'

export default function App() {
  const [game, setGame] = useState('pubg')
  const [sel, setSel] = useState(-1)
  const [uid, setUid] = useState('')
  const [showSet, setShowSet] = useState(false)

  const [s, setS] = useState({
    pubgName: 'BINRAO 876',
    ffName: 'BINRAO FF',
    uid1: '5991827364',
    uid2: '5829104821',
    uid3: '5123456789',
    pubgBanner: 'DEAL STORE - PUBG UC OFFICIAL - 25K TO 200K',
    ffBanner: 'DEAL STORE - FREE FIRE OFFICIAL - 25K TO 200K',
    pubgD: '2', pubgH: '12', pubgM: '30', pubgS: '0',
    ffD: '3', ffH: '5', ffM: '45', ffS: '0',
    visa: '4242', master: '8888', amex: '1001', vip: '9999',
    wapp: '+92 300 1234567', tele: '@BINRAO876',
    footer: 'WhatsApp: +92 300 1234567 | Telegram: @BINRAO876 | DEAL STORE'
  })

  const packs = [25000,50000,75000,100000,125000,150000,175000,200000]

  return (
    <div style={{background:'#0a0e13', color:'#fff', minHeight:'100vh', padding:15}}>
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <div>
          <button onClick={()=>setGame('pubg')} style={{padding:8, marginRight:8, background: game==='pubg'?'green':'#222', color:'#fff'}}>PUBG UC</button>
          <button onClick={()=>setGame('ff')} style={{padding:8, background: game==='ff'?'green':'#222', color:'#fff'}}>FREE FIRE</button>
        </div>
        <button onClick={()=>setShowSet(true)} style={{padding:8, border:'1px solid gold', background:'#222', color:'gold'}}>⚙ Setting (22)</button>
      </div>

      <h2 style={{marginTop:15}}>{game==='pubg'? s.pubgBanner : s.ffBanner}</h2>

      <input value={uid} onChange={e=>setUid(e.target.value)} placeholder="Enter UID - 5 se start" style={{width:'100%', padding:10, marginTop:10, background:'#111', color:'#fff', border:'1px solid #333'}} />
      <div style={{display:'flex', gap:6, marginTop:8}}>
        <span onClick={()=>setUid(s.uid1)} style={{padding:'6px 10px', background:'#1e2d40', borderRadius:20, fontSize:12}}>{s.uid1}</span>
        <span onClick={()=>setUid(s.uid2)} style={{padding:'6px 10px', background:'#1e2d40', borderRadius:20, fontSize:12}}>{s.uid2}</span>
        <span onClick={()=>setUid(s.uid3)} style={{padding:'6px 10px', background:'#1e2d40', borderRadius:20, fontSize:12}}>{s.uid3}</span>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginTop:15}}>
        {packs.map((v,i)=>(
          <div key={i} onClick={()=>setSel(i)} style={{background:'#1a2535', border: sel===i?'2px solid lime':'1px solid #333', borderRadius:12, padding:10, textAlign:'center'}}>
            <div style={{fontSize:30}}>{game==='ff'?'💎':'🪙'}</div>
            <div style={{fontWeight:'bold'}}>{v.toLocaleString()} {game==='ff'?'Diamonds':'UC'}</div>
            <button style={{width:'100%', marginTop:6, padding:6, background: game==='ff'?'red':'orange', border:'none', borderRadius:10}}>Buy Now</button>
          </div>
        ))}
      </div>

      <div style={{marginTop:20, display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
        <div style={{background:'#1e2d40', padding:8, borderRadius:8}}>VISA .... {s.visa}</div>
        <div style={{background:'#1e2d40', padding:8, borderRadius:8}}>MC .... {s.master}</div>
        <div style={{background:'#1e2d40', padding:8, borderRadius:8}}>AMEX .... {s.amex}</div>
        <div style={{background:'#1e2d40', border:'1px solid gold', padding:8, borderRadius:8}}>VIP .... {s.vip}</div>
      </div>

      <div style={{marginTop:25, textAlign:'center', borderTop:'1px solid #222', paddingTop:12}}>
        <div style={{color:'lime', fontWeight:'bold'}}>Developer by BIN RAO</div>
        <div style={{fontSize:11, marginTop:4}}>{s.footer}</div>
      </div>

      {showSet && (
        <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.9)', padding:15, overflow:'auto', zIndex:99}}>
          <div style={{background:'#121a26', padding:15, borderRadius:12, maxWidth:550, margin:'auto'}}>
            <button onClick={()=>setShowSet(false)} style={{float:'right', background:'red', color:'#fff', border:'none', padding:'5px 10px'}}>X Close</button>
            <h3>DEAL STORE - 22 Settings</h3>

            <input value={s.pubgName} onChange={e=>setS({...s, pubgName: e.target.value})} placeholder="1. PUBG Name" style={{width:'100%', padding:8, marginTop:8}} />
            <input value={s.ffName} onChange={e=>setS({...s, ffName: e.target.value})} placeholder="2. FF Name" style={{width:'100%', padding:8, marginTop:8}} />
            <input value={s.uid1} onChange={e=>setS({...s, uid1: e.target.value})} placeholder="3. UID1" style={{width:'100%', padding:8, marginTop:8}} />
            <input value={s.uid2} onChange={e=>setS({...s, uid2: e.target.value})} placeholder="4. UID2" style={{width:'100%', padding:8, marginTop:8}} />
            <input value={s.uid3} onChange={e=>setS({...s, uid3: e.target.value})} placeholder="5. UID3" style={{width:'100%', padding:8, marginTop:8}} />
            <input value={s.pubgBanner} onChange={e=>setS({...s, pubgBanner: e.target.value})} placeholder="6. PUBG Banner" style={{width:'100%', padding:8, marginTop:8}} />
            <input value={s.ffBanner} onChange={e=>setS({...s, ffBanner: e.target.value})} placeholder="7. FF Banner" style={{width:'100%', padding:8, marginTop:8}} />

            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:8}}>
              <input value={s.pubgD} onChange={e=>setS({...s, pubgD: e.target.value})} placeholder="8. PUBG D" style={{padding:8}} />
              <input value={s.pubgH} onChange={e=>setS({...s, pubgH: e.target.value})} placeholder="9. PUBG H" style={{padding:8}} />
              <input value={s.pubgM} onChange={e=>setS({...s, pubgM: e.target.value})} placeholder="10. PUBG M" style={{padding:8}} />
              <input value={s.pubgS} onChange={e=>setS({...s, pubgS: e.target.value})} placeholder="11. PUBG S" style={{padding:8}} />
              <input value={s.ffD} onChange={e=>setS({...s, ffD: e.target.value})} placeholder="12. FF D" style={{padding:8}} />
              <input value={s.ffH} onChange={e=>setS({...s, ffH: e.target.value})} placeholder="13. FF H" style={{padding:8}} />
              <input value={s.ffM} onChange={e=>setS({...s, ffM: e.target.value})} placeholder="14. FF M" style={{padding:8}} />
              <input value={s.ffS} onChange={e=>setS({...s, ffS: e.target.value})} placeholder="15. FF S" style={{padding:8}} />
            </div>

            <input value={s.visa} onChange={e=>setS({...s, visa: e.target.value})} placeholder="16. Visa" style={{width:'100%', padding:8, marginTop:8}} />
            <input value={s.master} onChange={e=>setS({...s, master: e.target.value})} placeholder="17. Master" style={{width:'100%', padding:8, marginTop:8}} />
            <input value={s.amex} onChange={e=>setS({...s, amex: e.target.value})} placeholder="18. Amex" style={{width:'100%', padding:8, marginTop:8}} />
            <input value={s.vip} onChange={e=>setS({...s, vip: e.target.value})} placeholder="19. VIP" style={{width:'100%', padding:8, marginTop:8}} />
            <input value={s.wapp} onChange={e=>setS({...s, wapp: e.target.value})} placeholder="20. WhatsApp" style={{width:'100%', padding:8, marginTop:8}} />
            <input value={s.tele} onChange={e=>setS({...s, tele: e.target.value})} placeholder="21. Telegram" style={{width:'100%', padding:8, marginTop:8}} />
            <input value={s.footer} onChange={e=>setS({...s, footer: e.target.value})} placeholder="22. Footer Contact" style={{width:'100%', padding:8, marginTop:8}} />

            <button onClick={()=>setShowSet(false)} style={{width:'100%', padding:10, background:'lime', border:'none', fontWeight:'bold', marginTop:12}}>SAVE - 22 Settings</button>
          </div>
        </div>
      )}
    </div>
  )
}
