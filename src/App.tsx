import { useState, useEffect } from 'react'

function App() {
  const [game, setGame] = useState<'pubg'|'ff'>('pubg')
  const [sel, setSel] = useState(-1)
  const [uid, setUid] = useState('')
  const [verified, setVerified] = useState(false)
  const [showSet, setShowSet] = useState(false)
  const packsVals = [25000,50000,75000,100000,125000,150000,175000,200000]
  
  const [cfg, setCfg] = useState(()=>{
    const saved = localStorage.getItem('dealstore_v10')
    return saved ? JSON.parse(saved) : {
      pubgName:'BINRAO 876', ffName:'BINRAO FF',
      uid1:'5991827364', uid2:'5829104821', uid3:'5123456789',
      pubgBanner:'🔥 DEAL STORE - PUBG UC OFFICIAL - 25K TO 200K',
      ffBanner:'💎 DEAL STORE - FREE FIRE OFFICIAL - 25K TO 200K',
      pubgD:2, pubgH:12, pubgM:30, pubgS:0,
      ffD:3, ffH:5, ffM:45, ffS:0,
      visa:'4242', master:'8888', amex:'1001', vip:'9999',
      cvcOn:'on', cvc:'123', exp:'12/28', holder:'BIN RAO',
      wapp:'+92 300 1234567', tele:'@BINRAO876',
      refund:'DEAL STORE - No refund after delivery. Fail hua to 24h me refund.',
      privacy:'DEAL STORE - Only UID collect karte hain.',
      terms:'DEAL STORE - Sahi UID do. Galat UID ki zimmedari nahi. 5-30 min delivery.',
      footerContact:'WhatsApp: +92 300 1234567 | Telegram: @BINRAO876 | DEAL STORE'
    }
  })

  const [timeLeft, setTimeLeft] = useState({d:0,h:0,m:0,s:0})

  useEffect(()=>{
    const id=setInterval(()=>{
      const now=Date.now()
      const target=new Date()
      const addD = game==='pubg'?cfg.pubgD:cfg.ffD
      const addH = game==='pubg'?cfg.pubgH:cfg.ffH
      const addM = game==='pubg'?cfg.pubgM:cfg.ffM
      const addS = game==='pubg'?cfg.pubgS:cfg.ffS
      target.setDate(target.getDate()+parseInt(addD))
      target.setHours(target.getHours()+parseInt(addH))
      target.setMinutes(target.getMinutes()+parseInt(addM))
      target.setSeconds(target.getSeconds()+parseInt(addS))
      const diff=Math.max(0,target.getTime()-now)
      setTimeLeft({d:Math.floor(diff/86400000),h:Math.floor(diff%86400000/3600000),m:Math.floor(diff%3600000/60000),s:Math.floor(diff%60000/1000)})
    },1000)
    return()=>clearInterval(id)
  },[game,cfg])

  const saveAll=()=>{
    localStorage.setItem('dealstore_v10', JSON.stringify(cfg))
    setShowSet(false)
    alert('✅ DEAL STORE Settings Saved!')
  }

  return (
    <div style={{background:'#0a0e13',color:'#fff',minHeight:'100vh',fontFamily:'Segoe UI'}}>
      <div style={{display:'flex',justifyContent:'space-between',padding:'12px 15px',background:'#111822',borderBottom:'2px solid #1e2d40',position:'sticky',top:0,zIndex:100}}>
        <div style={{display:'flex',gap:8}}>
          <button onClick={()=>{setGame('pubg');setSel(-1)}} style={{padding:'8px 18px',borderRadius:20,border:'1.5px solid #2a3a50',background:game==='pubg'?'#0f8a3a':'#1a2535',color:game==='pubg'?'#fff':'#8aa0c0',fontWeight:700}}>PUBG UC</button>
          <button onClick={()=>{setGame('ff');setSel(-1)}} style={{padding:'8px 18px',borderRadius:20,border:'1.5px solid #2a3a50',background:game==='ff'?'#0f8a3a':'#1a2535',color:game==='ff'?'#fff':'#8aa0c0',fontWeight:700}}>FREE FIRE</button>
        </div>
        <button onClick={()=>setShowSet(true)} style={{padding:'8px 18px',borderRadius:20,border:'1.5px solid #ffb700',background:'#1a2535',color:'#ffb700',fontWeight:700}}>⚙ Setting</button>
      </div>

      <div style={{maxWidth:1300,margin:'0 auto',padding:15}}>
        <div style={{background:'linear-gradient(135deg,#151e2c,#1e2d40)',border:'1.5px solid #2a3a50',borderRadius:14,padding:15,marginBottom:15}}>
          <input value={uid} onChange={e=>{setUid(e.target.value); setVerified(e.target.value.length>=8)}} placeholder="Enter UID (5 se start)" style={{width:'100%',padding:'12px 14px',borderRadius:10,border:'1.5px solid #2a3a50',background:'#0d131c',color:'#fff'}}/>
          <div style={{display:'flex',gap:7,marginTop:10}}>{[cfg.uid1,cfg.uid2,cfg.uid3].map(u=><div key={u} onClick={()=>{setUid(u);setVerified(true)}} style={{padding:'6px 12px',background:'#1e2d40',border:'1px solid #2a3a50',borderRadius:20,fontSize:12,cursor:'pointer'}}>{u}</div>)}</div>
          {verified && <div style={{marginTop:10,padding:10,background:'#0f2a18',border:'1px solid #1fbf5a',borderRadius:10,color:'#1fbf5a',fontWeight:700}}>✓ Verified: {game==='pubg'?cfg.pubgName:cfg.ffName}</div>}
        </div>

        <div style={{borderRadius:16,padding:'18px 20px',marginBottom:18,background:game==='ff'?'linear-gradient(135deg,#1a1a2d,#2a0f4a)':'linear-gradient(135deg,#1a2d1a,#0f4a2a)',border:game==='ff'?'1.5px solid #7b5cff':'1.5px solid #1fbf5a'}}>
          <h2>{game==='pubg'?cfg.pubgBanner:cfg.ffBanner}</h2>
          <p style={{fontSize:12,opacity:.8}}>DEAL STORE - Premium Instant Delivery - 8 Packs</p>
          <div style={{display:'flex',gap:8,marginTop:10}}>
            <div style={{background:'rgba(0,0,0,.4)',borderRadius:8,padding:'6px 10px',minWidth:55,textAlign:'center'}}><b style={{fontSize:18}}>{timeLeft.d}</b><div style={{fontSize:10}}>Days</div></div>
            <div style={{background:'rgba(0,0,0,.4)',borderRadius:8,padding:'6px 10px',minWidth:55,textAlign:'center'}}><b style={{fontSize:18}}>{timeLeft.h}</b><div style={{fontSize:10}}>Hours</div></div>
            <div style={{background:'rgba(0,0,0,.4)',borderRadius:8,padding:'6px 10px',minWidth:55,textAlign:'center'}}><b style={{fontSize:18}}>{timeLeft.m}</b><div style={{fontSize:10}}>Mins</div></div>
            <div style={{background:'rgba(0,0,0,.4)',borderRadius:8,padding:'6px 10px',minWidth:55,textAlign:'center'}}><b style={{fontSize:18}}>{timeLeft.s}</b><div style={{fontSize:10}}>Secs</div></div>
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}} className="packs">
          {packsVals.map((v,i)=>{
            const isBest=i>=6, isHot=i>=4&&i<6
            return (
              <div key={i} onClick={()=>setSel(i)} style={{background:'linear-gradient(180deg,#1a2535,#121a26)',border:sel===i?'1.5px solid #1fbf5a':'1.5px solid #2a3a50',borderRadius:14,padding:12,textAlign:'center',cursor:'pointer',position:'relative',boxShadow:sel===i?'0 0 18px rgba(31,191,90,.5)':''}}>
                {isBest && <div style={{position:'absolute',top:6,right:6,fontSize:9,padding:'3px 6px',borderRadius:10,background:'#ffb700',color:'#000',fontWeight:800}}>BEST</div>}
                {isHot && <div style={{position:'absolute',top:6,right:6,fontSize:9,padding:'3px 6px',borderRadius:10,background:'#ff1a2e',color:'#fff',fontWeight:800}}>HOT</div>}
                <div style={{height:85,display:'flex',alignItems:'center',justifyContent:'center',fontSize:42}}>{game==='ff'?(i<2?'💎': '📦'):(i<2?'🪙':'📦')}</div>
                {i>=2 && <div style={{fontSize:10,marginBottom:4,background:'#000',border:'1px solid #444',display:'inline-block',padding:'2px 6px',borderRadius:4}}>{game==='ff'?'FREE FIRE':'PUBG'}</div>}
                <div style={{fontWeight:900,fontSize:16}}>{v.toLocaleString()} {game==='ff'?'Diamonds':'UC'}</div>
                <button style={{width:'100%',padding:8,borderRadius:20,border:'none',fontWeight:800,marginTop:8,background:game==='ff'?'#ff1a2e':'linear-gradient(#ffb700,#ff8a00)',color:game==='ff'?'#fff':'#000'}}>Buy Now</button>
              </div>
            )
          })}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginTop:20}}>
          <div style={{background:'#1e2d40',border:'1.5px solid #2a3a50',borderRadius:12,padding:12}}><b style={{fontSize:11}}>VISA .... {cfg.visa}</b><p>{cfg.holder}</p></div>
          <div style={{background:'#1e2d40',border:'1.5px solid #2a3a50',borderRadius:12,padding:12}}><b style={{fontSize:11}}>MC .... {cfg.master}</b><p>{cfg.holder}</p></div>
          <div style={{background:'#1e2d40',border:'1.5px solid #2a3a50',borderRadius:12,padding:12}}><b style={{fontSize:11}}>AMEX .... {cfg.amex}</b><p>{cfg.holder}</p></div>
          <div style={{background:'#1e2d40',border:'1.5px solid #ffb700',borderRadius:12,padding:12}}><b style={{fontSize:11}}>VIP .... {cfg.vip}</b><p>PREMIUM</p></div>
        </div>

        <div style={{marginTop:30,background:'#0a0e13',borderTop:'2px solid #1e2d40',padding:'18px 15px',textAlign:'center'}}>
          <div style={{color:'#1fbf5a',fontWeight:800,fontSize:13,marginBottom:6}}>Developer by BIN RAO</div>
          <div style={{color:'#8aa0c0',fontSize:12}}>© 2026 DEAL STORE • PUBG & FREE FIRE Official</div>
          <div style={{color:'#ffb700',fontSize:12,marginTop:6}}>{cfg.footerContact}</div>
        </div>
      </div>

      {showSet && (
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,.85)',zIndex:200,overflowY:'auto',padding:15}}>
          <div style={{background:'#121a26',border:'1.5px solid #2a3a50',borderRadius:16,maxWidth:600,margin:'20
