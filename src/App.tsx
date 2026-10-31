import { useState } from 'react'

export default function App() {
  const [game, setGame] = useState('pubg')
  const [sel, setSel] = useState<number | null>(0)
  const [uid, setUid] = useState('3144989462')
  const [showSet, setShowSet] = useState(false)
  const [showPay, setShowPay] = useState(false)
  const [showTxn, setShowTxn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [payMethod, setPayMethod] = useState('vip')
  const [cvc, setCvc] = useState('')
  const [policyTab, setPolicyTab] = useState<string | null>(null)

  const [s, setS] = useState({
    pubgName: 'BINRAO 876', ffName: 'BINRAO FF',
    uid1: '5991827364', uid2: '5829104821', uid3: '5123456789',
    pubgBanner: 'DEAL STORE - OFFICIAL PUBG UC STORE',
    ffBanner: 'DEAL STORE - OFFICIAL FREE FIRE DIAMONDS STORE',
    visa: '4242', master: '8888', amex: '1001', vip: '1234',
    wapp: '+9715537374', tele: '@BINRAO876',
    txnType: 'failed', 
    txnFailReason: 'Transaction declined by the small pack issuer or ID. Reason: Your level is too low please buy another big pack.',
    txnSuccessTitle: 'PAYMENT SUCCESS!', 
    txnSuccessMsg: 'Your order will be delivered in 5-30 Minutes',
    txnPendingMsg: 'Payment is being verified...',
    minPack: '25000', maxPack: '200000', vipFee: '0% FEE', normalFee: '3% FEE',
    refundPolicy: 'Wrong UID = No Refund - UID sahi daalo!',
    lowLevelMsg: 'Transaction declined by the small pack issuer or ID.',
    loadingTime: '3000',
  })

  const packs = [25000, 50000, 75000, 100000, 125000, 150000, 175000, 200000]
  const getPrice = (uc:number) => Math.round(uc * 0.0406)
  const selectedPack = sel !== null ? packs[sel] : packs[0]
  const selectedPrice = getPrice(selectedPack)

  const payNow = () => {
    if(cvc.length < 3){ alert('CVC daalo 3-4 digit'); return; }
    setShowPay(false)
    setLoading(true)
    setTimeout(()=>{ setLoading(false); setShowTxn(true); }, parseInt(s.loadingTime) || 3000)
  }

  const policies = {
    about: { t: 'About Us', d: 'DEAL STORE - Trusted store. 8 Packs 25K to 200K for PUBG UC and Free Fire Diamonds. Instant delivery 5-30 min. 10k+ customers.' },
    privacy: { t: 'Privacy Policy', d: 'We never share your UID. No password needed. Safe & secure. UID only for delivery. Encrypted.' },
    terms: { t: 'Terms', d: '1. Check UID 2. Wrong UID = No Refund 3. 8 Packs 25K-200K 4. Delivery 5-30 min 5. Agree to terms by ordering.' },
    refund: { t: 'Refund Policy', d: s.refundPolicy + ' If not delivered in 1 hour contact WhatsApp with screenshot.' },
    contact: { t: 'Contact', d: `WhatsApp: ${s.wapp} | Telegram: ${s.tele} | 24/7 Support - Fast Response` },
    delivery: { t: 'Delivery Policy', d: '5-30 Minutes instant delivery to your UID. Direct in-game mail. No login needed. 8 Packs available.' },
  }

  return (
    <div style={{background:'#05070d', color:'#fff', minHeight:'100vh', fontFamily:'system-ui'}}>
      <div style={{display:'flex', justifyContent:'space-between', padding:12, background:'#0e1525', borderBottom:'1px solid #1e293b', position:'sticky', top:0, zIndex:10}}>
        <div style={{display:'flex', gap:8}}>
          <button onClick={()=>{setGame('pubg'); setSel(0)}} style={{padding:'9px 16px', borderRadius:10, fontWeight:900, border:'1px solid #334155', background: game==='pubg'?'#fbbf24':'#1e293b', color: game==='pubg'?'#000':'#fff'}}>PUBG UC</button>
          <button onClick={()=>{setGame('ff'); setSel(0)}} style={{padding:'9px 16px', borderRadius:10, fontWeight:900, border:'1px solid #334155', background: game==='ff'?'#ef4444':'#1e293b', color:'#fff'}}>FREE FIRE</button>
        </div>
        <button onClick={()=>setShowSet(true)} style={{padding:'9px 14px', borderRadius:10, border:'1px solid #fbbf24', background:'#1e293b', color:'#fbbf24', fontWeight:800}}>⚙ Setting (22)</button>
      </div>

      <div style={{maxWidth:1100, margin:'0 auto', padding:14}}>
        <div style={{background: game==='pubg'?'linear-gradient(135deg,#1a1a00,#b45309,#fbbf24)':'linear-gradient(135deg,#1a0033,#7c3aed,#ef4444)', borderRadius:16, padding:16, border:'1px solid #fbbf24'}}>
          <div style={{fontWeight:900, fontSize:14}}>{game==='pubg'?s.pubgBanner:s.ffBanner}</div>
          <div style={{fontSize:11, marginTop:4}}>⚡ 8 PACKS 25K-200K • 5-30 Min • ✅ Safe • {s.minPack} to {s.maxPack}</div>
        </div>

        <div style={{background:'#0e1525', border:'1px solid #1e293b', borderRadius:14, padding:14, marginTop:14}}>
          <input value={uid} onChange={e=>setUid(e.target.value)} placeholder="Enter UID" style={{width:'100%', padding:13, borderRadius:10, background:'#020617', color:'#fff', border:'1px solid #334155'}} />
          <div style={{display:'flex', gap:8, marginTop:10}}>{[s.uid1,s.uid2,s.uid3].map(v=><button key={v} onClick={()=>setUid(v)} style={{padding:'6px 12px', borderRadius:20, background:'#1e293b', border:'1px solid #334155', color:'#94a3b8', fontSize:11}}>{v}</button>)}</div>
          {uid.length>7 && <div style={{marginTop:10, background:'#052e16', border:'1px solid #22c55e', padding:'8px 12px', borderRadius:8, fontSize:13}}>✅ Verified: {game==='pubg'?s.pubgName:s.ffName} | UID: {uid}</div>}
        </div>

        <div style={{background:'#000', padding:12, borderRadius:12, marginTop:14, border:'1px solid #1e293b'}}>
          <div style={{fontWeight:900, fontSize:14, marginBottom:12}}>🪙 {game==='pubg'?'PUBG UC':'FREE FIRE DIAMONDS'} - 8 PACKS (25K TO 200K)</div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
            {packs.map((amount,i)=>(
              <div key={i} onClick={()=>setSel(i)} style={{background:'#000', border: sel===i?'2px solid #22c55e':'2px solid #7f1d1d', borderRadius:10, padding:8, textAlign:'center'}}>
                <div style={{height:65, background:'#111', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:26}}>{game==='pubg'?'🪙':'💎'}</div>
                <div style={{fontWeight:900, fontSize:15, marginTop:6}}>{amount.toLocaleString()} {game==='pubg'?'UC':'DIAM'}</div>
                <div style={{fontSize:10, color:'#94a3b8'}}>{getPrice(amount)} AED</div>
                <button onClick={(e)=>{e.stopPropagation(); setSel(i); setShowPay(true)}} style={{width:'100%', marginTop:8, background: sel===i?'#22c55e':'#fbbf24', color:'#000', border:'none', padding:'8px', borderRadius:6, fontWeight:800, fontSize:11}}>Buy Now</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer style={{marginTop:30, background:'#080d18', borderTop:'2px solid #fbbf24', padding:'20px 14px'}}>
        <div style={{maxWidth:1100, margin:'0 auto'}}>
          <h3 style={{textAlign:'center', color:'#fbbf24', fontSize:16}}>DEAL STORE - 8 PACKS 25K-200K</h3>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:12}}>
            {Object.entries(policies).map(([k,v])=>(
              <button key={k} onClick={()=>setPolicyTab(policyTab===k?null:k)} style={{padding:10, background: policyTab===k?'#fbbf24':'#0e1525', color: policyTab===k?'#000':'#cbd5e1', border:'1px solid #334155', borderRadius:8, fontSize:11, fontWeight:700}}>{v.t}</button>
            ))}
          </div>
          {policyTab && <div style={{marginTop:12, background:'#0e1525', border:'1px solid #fbbf24', borderRadius:10, padding:12}}><div style={{fontWeight:900, color:'#fbbf24'}}>{policies[policyTab as keyof typeof policies].t}</div><div style={{fontSize:12, color:'#cbd5e1', marginTop:6, lineHeight:1.6}}>{policies[policyTab as keyof typeof policies].d}</div><button onClick={()=>setPolicyTab(null)} style={{marginTop:8, padding:'6px 12px', background:'#334155', color:'#fff', border:'none', borderRadius:6, fontSize:11}}>Close</button></div>}
          <div style={{textAlign:'center', marginTop:18, borderTop:'1px solid #1e293b', paddingTop:12}}>
            <div style={{fontSize:11, color:'#fbbf24'}}>WhatsApp: {s.wapp} | Telegram: {s.tele} | BIN RAO ❤️</div>
            <div style={{fontSize:10, color:'#64748b', marginTop:6}}>© 2026 DEAL STORE | Test Simulation - Educational</div>
          </div>
        </div>
      </footer>

      {/* PROFESSIONAL PAYMENT - KAALA KHALI KHATAM */}
      {showPay && (
        <div style={{position:'fixed', inset:0, background:'#020617', zIndex:50, overflow:'auto'}}>
          <div style={{maxWidth:480, margin:'0 auto', padding:14, minHeight:'100vh', display:'flex', flexDirection:'column'}}>
            <button onClick={()=>setShowPay(false)} style={{background:'#1e293b', color:'#fff', border:'1px solid #334155', padding:'8px 14px', borderRadius:8, alignSelf:'flex-start'}}>← Back</button>
            <div style={{marginTop:14, background:'#0e1525', border:'1px solid #1e293b', borderRadius:10, padding:'10px 14px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div style={{display:'flex', gap:8, alignItems:'center', fontSize:12, fontWeight:700}}><span style={{background:'#22c55e', width:20, height:20, borderRadius:50, display:'flex', alignItems:'center', justifyContent:'center'}}>🔒</span> Secure Payment</div>
              <div style={{fontSize:10, color:'#94a3b8'}}>SSL • 256-bit Encrypted</div>
            </div>
            <div style={{background:'linear-gradient(135deg,#0a1040,#0e1525)', border:'1.5px solid #fbbf24', borderRadius:14, padding:14, display:'flex', justifyContent:'space-between', marginTop:12}}>
              <div><div style={{fontSize:10, color:'#fbbf24', fontWeight:900}}>8 PACKS SELECTED</div><div style={{fontSize:18, fontWeight:900, marginTop:4}}>{selectedPack.toLocaleString()} {game==='pubg'?'UC':'DIAM'}</div><div style={{fontSize:11, color:'#94a3b8', marginTop:4}}>UID: {uid}</div><div style={{fontSize:11, color:'#fbbf24', fontWeight:700}}>{game==='pubg'?s.pubgName:s.ffName} ✅</div></div>
              <div style={{textAlign:'right'}}><div style={{fontSize:10, color:'#94a3b8'}}>Total</div><div style={{fontSize:22, fontWeight:900, color:'#fbbf24'}}>{selectedPrice} AED</div><div style={{fontSize:10, color:'#22c55e'}}>{selectedPack} {game==='pubg'?'UC':'DIAM'}</div></div>
            </div>
            <div style={{marginTop:14}}>
              <div style={{fontSize:11, fontWeight:900, color:'#cbd5e1', marginBottom:8}}>CHOOSE PAYMENT METHOD</div>
              {[
                {id:'visa', name:'Visa', num:s.visa},
                {id:'master', name:'Mastercard', num:s.master},
                {id:'amex', name:'Amex', num:s.amex},
                {id:'vip', name:'Golden VIP Card', num:s.vip, badge:'0% FEE'},
              ].map(card=>(
                <div key={card.id} onClick={()=>setPayMethod(card.id)} style={{background: payMethod===card.id?'#1a2340':'#0a1040', border: payMethod===card.id?'2px solid #fbbf24':'1px solid #1e293b', borderRadius:12, padding:12, marginBottom:8, display:'flex', justifyContent:'space-between', alignItems:'center', cursor:'pointer'}}>
                  <div style={{display:'flex', gap:10, alignItems:'center'}}>
                    <div style={{background: card.id==='vip'?'#fbbf24':'#1e293b', color: card.id==='vip'?'#000':'#fff', fontSize:9, fontWeight:900, padding:'6px 8px', borderRadius:6, minWidth:50, textAlign:'center'}}>{card.id.toUpperCase()}</div>
                    <div><div style={{fontSize:13, fontWeight:800, display:'flex', gap:6, alignItems:'center'}}>{card.name} {card.badge && <span style={{background:'#22c55e', color:'#fff', fontSize:8, padding:'2px 6px', borderRadius:20}}>{card.badge}</span>}</div><div style={{fontSize:11, color:'#64748b', marginTop:2}}>•••• {card.num} • {card.id==='vip'?s.vipFee:s.normalFee}</div></div>
                  </div>
                  <div style={{width:20, height:20, borderRadius:50, border:'2px solid #475569', background: payMethod===card.id?'#fbbf24':'transparent', display:'flex', alignItems:'center', justifyContent:'center'}}>{payMethod===card.id && <div style={{width:8, height:8, background:'#000', borderRadius:50}}></div>}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:12, background:'#0e1525', border:'1px solid #fbbf24', borderRadius:12, padding:14}}>
              <div style={{display:'flex', justifyContent:'space-between'}}><div style={{fontSize:12, fontWeight:800}}>🔒 Card Security Code</div><div style={{fontSize:10, color:'#94a3b8'}}>CVC / CVV</div></div>
              <input value={cvc} onChange={e=>setCvc(e.target.value)} maxLength={4} placeholder="123" style={{width:'100%', padding:14, borderRadius:10, background:'#020617', border:'1px solid #334155', color:'#fff', textAlign:'center', marginTop:10, fontSize:16, letterSpacing:3, fontWeight:900}} />
              <button onClick={payNow} style={{width:'100%', marginTop:12, padding:14, background: payMethod==='vip'?'linear-gradient(90deg,#fbbf24,#ffd700)':'#fbbf24', color:'#000', border:'none', borderRadius:10, fontWeight:900, fontSize:14}}>PAY {selectedPrice} AED → SECURE</button>
              <div style={{display:'flex', justifyContent:'center', gap:12, marginTop:10, fontSize:10, color:'#475569'}}><span>🔒 SSL</span><span>•</span><span>✅ 3D Secure</span><span>•</span><span>🛡️ Protected</span></div>
            </div>
            <div style={{marginTop:16, background:'#080d18', border:'1px solid #1e293b', borderRadius:12, padding:12}}>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, textAlign:'center'}}>
                <div><div style={{fontSize:16}}>⚡</div><div style={{fontSize:9, color:'#cbd5e1', fontWeight:700, marginTop:4}}>5-30 Min</div><div style={{fontSize:8, color:'#64748b'}}>Delivery</div></div>
                <div><div style={{fontSize:16}}>🛡️</div><div style={{fontSize:9, color:'#cbd5e1', fontWeight:700, marginTop:4}}>Safe & Secure</div><div style={{fontSize:8, color:'#64748b'}}>100% Safe</div></div>
                <div><div style={{fontSize:16}}>💬</div><div style={{fontSize:9, color:'#cbd5e1', fontWeight:700, marginTop:4}}>24/7 Support</div><div style={{fontSize:8, color:'#64748b'}}>WhatsApp</div></div>
              </div>
              <div style={{marginTop:12, borderTop:'1px solid #1e293b', paddingTop:10, display:'flex', justifyContent:'space-between', fontSize:9, color:'#475569'}}><span>{s.refundPolicy}</span><span>{s.wapp}</span></div>
              <div style={{textAlign:'center', marginTop:8, fontSize:9, color:'#334155'}}>Test Simulation • No real card charged</div>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div style={{position:'fixed', inset:0, background:'#000', zIndex:80, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
          <div style={{width:70, height:70, border:'4px solid #1e293b', borderTop:'4px solid #fbbf24', borderRadius:50, animation:'spin 0.8s linear infinite'}}></div>
          <div style={{marginTop:18, fontWeight:900, fontSize:16, color:'#fbbf24'}}>Processing {selectedPack} {game==='pubg'?'UC':'DIAM'}...</div>
          <div style={{fontSize:12, color:'#94a3b8', marginTop:6}}>{game==='pubg'?s.pubgName:s.ffName} | UID: {uid}</div>
          <div style={{fontSize:11, color:'#64748b', marginTop:4}}>{payMethod.toUpperCase()} •• {payMethod==='vip'?s.vip:s.visa}</div>
          <style>{`@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}</style>
        </div>
      )}

      {showTxn && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.92)', zIndex:80, display:'flex', alignItems:'center', justifyContent:'center', padding:12}}>
          <div style={{background: payMethod==='vip' ? 'linear-gradient(135deg, #0f0f0f, #1a1505)' : '#0a1040', border: payMethod==='vip' ? '1.5px solid #fbbf24' : '1.5px solid #334155', borderRadius:18, width:'100%', maxWidth:380, overflow:'hidden', boxShadow: payMethod==='vip' ? '0 0 25px rgba(251,191,36,0.25)' : 'none'}}>
            <div style={{background: payMethod==='vip' ? 'linear-gradient(90deg, #000, #1f1a05, #000)' : '#0a0f40', padding:12, display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom: payMethod==='vip' ? '1px solid rgba(251,191,36,0.3)' : '1px solid #1e293b'}}>
              <div style={{display:'flex', gap:8, alignItems:'center', fontWeight:900, fontSize:12}}>
                <span style={{background: payMethod==='vip' ? '#fbbf24' : '#334155', color: payMethod==='vip' ? '#000' : '#fff', width:26, height:26, borderRadius:50, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10}}>UC</span>
                TRANSACTION RESULT
                {payMethod==='vip' && <span style={{marginLeft:6, fontSize:10, background:'linear-gradient(90deg, #fbbf24, #ffd700)', color:'#000', padding:'2px 6px', borderRadius:20, fontWeight:900}}>★ VIP</span>}
              </div>
              <button onClick={()=>setShowTxn(false)} style={{background:'none', border:'none', color:'#fff', fontSize:18}}>X</button>
            </div>
            <div style={{padding:20, textAlign:'center'}}>
              {s.txnType==='failed' ? (
                <>
                  <div style={{width:64, height:64, borderRadius:50, background: payMethod==='vip' ? 'radial-gradient(circle, #2a1505, #000)' : '#2a0a0a', border: payMethod==='vip' ? '2px solid #fbbf24' : '2px solid #ef4444', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto'}}><span style={{fontSize:28, color: payMethod==='vip' ? '#fbbf24' : '#ef4444'}}>✕</span></div>
                  <div style={{fontWeight:900, fontSize:18, marginTop:12, color: payMethod==='vip' ? '#fbbf24' : '#ff6b6b'}}>PAYMENT FAILED!</div>
                  <div style={{fontSize:11, color: payMethod==='vip' ? '#c9b86a' : '#94a3b8', marginTop:6}}>{s.lowLevelMsg}</div>
                </>
              ) : (
                <>
                  <div style={{width:64, height:64, borderRadius:50, background: payMethod==='vip' ? 'radial-gradient(circle, #1f1a05, #000)' : '#052e16', border: payMethod==='vip' ? '2px solid #fbbf24' : '2px solid #22c55e', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto'}}><span style={{fontSize:28, color: payMethod==='vip' ? '#fbbf24' : '#22c55e'}}>✓</span></div>
                  <div style={{fontWeight:900, fontSize:18, marginTop:12, color: payMethod==='vip' ? '#fbbf24' : '#22c55e'}}>{s.txnSuccessTitle}</div>
                  <div style={{fontSize:11, color: payMethod==='vip' ? '#c9b86a' : '#94a3b8', marginTop:6}}>{s.txnSuccessMsg}</div>
                </>
              )}
              <div style={{marginTop:14, background: payMethod==='vip' ? 'rgba(0,0,0,0.6)' : '#020617', borderRadius:10, padding:12, textAlign:'left', fontSize:11, border: payMethod==='vip' ? '1px solid rgba(251,191,36,0.2)' : '1px solid #1e293b'}}>
                <div style={{display:'flex', justifyContent:'space-between', padding:'4px 0'}}><span style={{color:'#64748b'}}>Pack:</span><b style={{color: payMethod==='vip' ? '#ffd700' : '#fff'}}>{selectedPack} {game==='pubg'?'UC':'DIAM'} - {selectedPrice} AED</b></div>
                <div style={{display:'flex', justifyContent:'space-between', padding:'4px 0'}}><span style={{color:'#64748b'}}>UID:</span><b>{uid}</b></div>
                <div style={{display:'flex', justifyContent:'space-between', padding:'4px 0'}}><span style={{color:'#64748b'}}>Username:</span><b style={{color: payMethod==='vip' ? '#ffd700' : '#fbbf24'}}>{game==='pubg'?s.pubgName:s.ffName}</b></div>
                <div style={{display:'flex', justifyContent:'space-between', padding:'4px 0'}}><span style={{color:'#64748b'}}>Card:</span><span>{payMethod.toUpperCase()} •• {payMethod==='vip'?s.vip:s.visa} {payMethod==='vip'?'★':''}</span></div>
                {s.txnType==='failed' && <div style={{marginTop:8, background: payMethod==='vip'?'rgba(251,191,36,0.1)':'rgba(239,68,68,0.1)', border: payMethod==='vip'?'1px solid rgba(251,191,36,0.3)':'1px solid #ef4444', padding:8, borderRadius:6, color: payMethod==='vip'?'#ffd700':'#fca5a5', fontSize:10}}>Reason: {s.txnFailReason}</div>}
              </div>
              <div style={{display:'flex', gap:10, marginTop:16}}>
                <button onClick={()=>setShowTxn(false)} style={{flex:1, padding:12, borderRadius:10, background:'#1e293b', color:'#fff', border:'1px solid #334155', fontWeight:700}}>Cancel</button>
                <button onClick={()=>setShowTxn(false)} style={{flex:1, padding:12, borderRadius:10, background: payMethod==='vip' ? 'linear-gradient(90deg, #fbbf24, #ffd700)' : '#22c55e', color: payMethod==='vip' ? '#000' : '#fff', border:'none', fontWeight:800}}>{s.txnType==='failed'?'RETRY':'DONE'}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSet && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.97)', zIndex:60, overflow:'auto', padding:12}}>
          <div style={{background:'#0e1525', border:'1px solid #1e293b', borderRadius:16, maxWidth:600, margin:'10px auto', padding:14, paddingBottom:40}}>
            <div style={{display:'flex', justifyContent:'space-between'}}><h3 style={{margin:0}}>⚙ Setting - 22 Fields (Full)</h3><button onClick={()=>setShowSet(false)} style={{background:'#ef4444', color:'#fff', border:'none', padding:'8px 14px', borderRadius:8}}>X</button></div>
            <div style={{marginTop:12, display:'grid', gap:10}}>
              <div style={{fontSize:11, fontWeight:900, color:'#fbbf24'}}>1-5: NAME + UIDs</div>
              <input value={s.pubgName} onChange={e=>setS({...s, pubgName:e.target.value})} placeholder="1. PUBG Name" style={{width:'100%', padding:9, borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155'}} />
              <input value={s.ffName} onChange={e=>setS({...s, ffName:e.target.value})} placeholder="2. FF Name" style={{width:'100%', padding:9, borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155'}} />
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:6}}>
                <input value={s.uid1} onChange={e=>setS({...s, uid1:e.target.value})} placeholder="3. UID1" style={{width:'100%', padding:9, borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155'}} />
                <input value={s.uid2} onChange={e=>setS({...s, uid2:e.target.value})} placeholder="4. UID2" style={{width:'100%', padding:9, borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155'}} />
                <input value={s.uid3} onChange={e=>setS({...s, uid3:e.target.value})} placeholder="5. UID3" style={{width:'100%', padding:9, borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155'}} />
              </div>
              <div style={{fontSize:11, fontWeight:900, color:'#fbbf24', marginTop:8}}>6-11: BANNER + CARDS</div>
              <input value={s.pubgBanner} onChange={e=>setS({...s, pubgBanner:e.target.value})} placeholder="6. PUBG Banner" style={{width:'100%', padding:9, borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155'}} />
              <input value={s.ffBanner} onChange={e=>setS({...s, ffBanner:e.target.value})} placeholder="7. FF Banner" style={{width:'100%', padding:9, borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155'}} />
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:6}}>
                <input value={s.visa} onChange={e=>setS({...s, visa:e.target.value})} placeholder="8. VISA" style={{width:'100%', padding:9, borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155'}} />
                <input value={s.master} onChange={e=>setS({...s, master:e.target.value})} placeholder="9. Master" style={{width:'100%', padding:9, borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155'}} />
                <input value={s.amex} onChange={e=>setS({...s, amex:e.target.value})} placeholder="10. AMEX" style={{width:'100%', padding:9, borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155'}} />
                <input value={s.vip} onChange={e=>setS({...s, vip:e.target.value})} placeholder="11. VIP" style={{width:'100%', padding:9, borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155'}} />
              </div>
              <div style={{fontSize:11, fontWeight:900, color:'#fbbf24', marginTop:8}}>12-13: CONTACT</div>
              <input value={s.wapp} onChange={e=>setS({...s, wapp:e.target.value})} placeholder="12. WhatsApp" style={{width:'100%', padding:9, borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155'}} />
              <input value={s.tele} onChange={e=>setS({...s, tele:e.target.value})} placeholder="13. Telegram" style={{width:'100%', padding:9, borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155'}} />
              <div style={{fontSize:11, fontWeight:900, color:'#ef4444', marginTop:8}}>14-18: TRANSACTION STATUS</div>
              <div style={{display:'flex', gap:6}}>
                <button onClick={()=>setS({...s, txnType:'success'})} style={{flex:1, padding:8, borderRadius:8, background: s.txnType==='success'?'#22c55e':'#1e293b', color:'#fff', border:'1px solid #334155', fontSize:11}}>Success</button>
                <button onClick={()=>setS({...s, txnType:'failed'})} style={{flex:1, padding:8, borderRadius:8, background: s.txnType==='failed'?'#ef4444':'#1e293b', color:'#fff', border:'1px solid #334155', fontSize:11}}>Failed</button>
                <button onClick={()=>setS({...s, txnType:'pending'})} style={{flex:1, padding:8, borderRadius:8, background: s.txnType==='pending'?'#f59e0b':'#1e293b', color:'#fff', border:'1px solid #334155', fontSize:11}}>Pending</button>
              </div>
              <textarea value={s.txnFailReason} onChange={e=>setS({...s, txnFailReason:e.target.value})} placeholder="Failed Reason" rows={2} style={{width:'100%', padding:9, borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155', fontSize:11}} />
              <input value={s.txnSuccessTitle} onChange={e=>setS({...s, txnSuccessTitle:e.target.value})} placeholder="Success Title" style={{width:'100%', padding:9, borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155'}} />
              <input value={s.txnSuccessMsg} onChange={e=>setS({...s, txnSuccessMsg:e.target.value})} placeholder="Success Msg" style={{width:'100%', padding:9, borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155'}} />
              <input value={s.txnPendingMsg} onChange={e=>setS({...s, txnPendingMsg:e.target.value})} placeholder="Pending Msg" style={{width:'100%', padding:9, borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155'}} />
              <div style={{fontSize:11, fontWeight:900, color:'#22c55e', marginTop:8}}>19-22: PACKS + FEES + POLICY + LOADING</div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:6}}>
                <input value={s.minPack} onChange={e=>setS({...s, minPack:e.target.value})} placeholder="19. Min" style={{width:'100%', padding:9, borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155'}} />
                <input value={s.maxPack} onChange={e=>setS({...s, maxPack:e.target.value})} placeholder="20. Max" style={{width:'100%', padding:9, borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155'}} />
                <input value={s.vipFee} onChange={e=>setS({...s, vipFee:e.target.value})} placeholder="21. VIP Fee" style={{width:'100%', padding:9, borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155'}} />
                <input value={s.normalFee} onChange={e=>setS({...s, normalFee:e.target.value})} placeholder="22. Normal Fee" style={{width:'100%', padding:9, borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155'}} />
                <input value={s.loadingTime} onChange={e=>setS({...s, loadingTime:e.target.value})} placeholder="Loading ms" style={{width:'100%', padding:9, borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155'}} />
              </div>
              <textarea value={s.refundPolicy} onChange={e=>setS({...s, refundPolicy:e.target.value})} placeholder="Refund Policy" rows={2} style={{width:'100%', padding:9, borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155', fontSize:11}} />
              <textarea value={s.lowLevelMsg} onChange={e=>setS({...s, lowLevelMsg:e.target.value})} placeholder="Low Level Msg" rows={2} style={{width:'100%', padding:9, borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155', fontSize:11}} />
            </div>
            <button onClick={()=>setShowSet(false)} style={{width:'100%', marginTop:15, padding:14, background:'#22c55e', color:'#000', border:'none', borderRadius:10, fontWeight:900}}>SAVE ALL 22 FIELDS - 8 PACKS 25K-200K</button>
          </div>
        </div>
      )}
    </div>
  )
}
