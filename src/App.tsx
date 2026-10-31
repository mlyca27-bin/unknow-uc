import { useState } from 'react'

export default function App() {
  const [game, setGame] = useState('pubg')
  const [sel, setSel] = useState<number | null>(0)
  const [uid, setUid] = useState('3144989462')
  const [showSet, setShowSet] = useState(false)
  const [showPay, setShowPay] = useState(false)
  const [showTxn, setShowTxn] = useState(false)
  const [payMethod, setPayMethod] = useState('vip')
  const [cvc, setCvc] = useState('')

  // 22 FIELDS - PURI SETTING
  const [s, setS] = useState({
    pubgName: 'BINRAO 876', ffName: 'BINRAO FF',
    uid1: '5991827364', uid2: '5829104821', uid3: '5123456789',
    pubgBanner: 'DEAL STORE - OFFICIAL PUBG UC STORE',
    ffBanner: 'DEAL STORE - OFFICIAL FREE FIRE DIAMONDS STORE',
    visa: '4242', master: '8888', amex: '1001', vip: '1234',
    wapp: '+9715537374', tele: '@BINRAO876',
    txnType: 'failed', txnFailReason: 'Transaction declined by the small pack issuer or ID. Reason: Your level is too low please buy another big pack. Please check pack big or retry.',
    txnSuccessTitle: 'PAYMENT SUCCESS!', txnSuccessMsg: 'Your UC will be delivered in 5-30 Minutes',
    txnPendingMsg: 'Payment is being verified, please wait...',
    minPack: '3', maxPack: '15', vipFee: '0% FEE', normalFee: '3% FEE',
    refundPolicy: 'Refund Policy: Wrong UID = No Refund - UID sahi daalo!',
    lowLevelMsg: 'Transaction declined by the small pack issuer or ID.',
  })

  const packs = [8100, 16200, 25000, 50000, 75000, 100000, 125000, 150000, 175000, 200000]
  const getPrice = (uc:number) => Math.round(uc * 0.0406)
  const selectedPack = sel !== null ? packs[sel] : packs[0]
  const selectedPrice = getPrice(selectedPack)

  return (
    <div style={{background:'#05070d', color:'#fff', minHeight:'100vh', fontFamily:'system-ui', paddingBottom:130}}>
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
          <div style={{fontSize:11, marginTop:4}}>⚡ 5-30 Min • ✅ Safe • {s.minPack} se {s.maxPack} tak packs</div>
        </div>

        <div style={{background:'#0e1525', border:'1px solid #1e293b', borderRadius:14, padding:14, marginTop:14}}>
          <input value={uid} onChange={e=>setUid(e.target.value)} placeholder="Enter UID" style={{width:'100%', padding:13, borderRadius:10, background:'#020617', color:'#fff', border:'1px solid #334155'}} />
          <div style={{display:'flex', gap:8, marginTop:10, flexWrap:'wrap'}}>{[s.uid1,s.uid2,s.uid3].map(v=><button key={v} onClick={()=>setUid(v)} style={{padding:'6px 12px', borderRadius:20, background:'#1e293b', border:'1px solid #334155', color:'#94a3b8', fontSize:11}}>{v}</button>)}</div>
          {uid.length>7 && <div style={{marginTop:10, background:'#052e16', border:'1px solid #22c55e', padding:'8px 12px', borderRadius:8, fontSize:13}}>✅ Verified: {game==='pubg'?s.pubgName:s.ffName}</div>}
        </div>

        <div style={{background:'#000', padding:12, borderRadius:12, marginTop:14, border:'1px solid #1e293b'}}>
          <div style={{fontWeight:900, fontSize:14, marginBottom:12}}>🪙 PUBG UC PACKS - {packs.length} PACKS</div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
            {packs.map((amount,i)=>{
              const selected = sel===i
              return (
                <div key={i} onClick={()=>setSel(i)} style={{background:'#000', border: selected?'2px solid #22c55e':'2px solid #7f1d1d', borderRadius:10, padding:8, textAlign:'center'}}>
                  <div style={{height:65, background:'#111', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:26}}>🪙</div>
                  <div style={{fontWeight:900, fontSize:14, marginTop:6}}>{amount.toLocaleString()} UC</div>
                  <div style={{fontSize:10, color:'#94a3b8'}}>{getPrice(amount)} AED</div>
                  <button onClick={(e)=>{e.stopPropagation(); setSel(i); setShowPay(true)}} style={{width:'100%', marginTop:8, background: selected?'#22c55e':'#fbbf24', color:'#000', border:'none', padding:'8px', borderRadius:6, fontWeight:800, fontSize:11}}>Buy Now</button>
                </div>
              )
            })}
          </div>
        </div>

        <div style={{marginTop:20, background:'#0e1525', border:'1px solid #1e293b', borderRadius:14, padding:16, textAlign:'center'}}>
          <div style={{fontWeight:900, color:'#22c55e'}}>Developer by BIN RAO</div>
          <div style={{fontSize:11, color:'#fbbf24', marginTop:8, fontWeight:700}}>{s.refundPolicy}</div>
        </div>
      </div>

      {showPay && (
        <div style={{position:'fixed', inset:0, background:'#020617', zIndex:50, overflow:'auto'}}>
          <div style={{maxWidth:480, margin:'0 auto', padding:14}}>
            <button onClick={()=>setShowPay(false)} style={{background:'#1e293b', color:'#fff', border:'1px solid #334155', padding:'8px 14px', borderRadius:8, marginBottom:14}}>← Back</button>
            <div style={{background:'#0a1040', border:'1px solid #fbbf24', borderRadius:14, padding:14, display:'flex', justifyContent:'space-between'}}>
              <div><div style={{fontSize:10, color:'#fbbf24', fontWeight:700}}>SELECTED PACKAGE</div><div style={{fontSize:16, fontWeight:900}}>{selectedPack} UC</div><div style={{fontSize:11, color:'#94a3b8'}}>Total UC: <span style={{color:'#22c55e'}}>{selectedPack.toLocaleString()}</span></div></div>
              <div style={{textAlign:'right'}}><div style={{fontSize:11, color:'#94a3b8'}}>Total Price</div><div style={{fontSize:20, fontWeight:900, color:'#fbbf24'}}>{selectedPrice} AED</div></div>
            </div>
            <div style={{marginTop:14}}>
              <div style={{fontSize:11, fontWeight:800, color:'#fbbf24', marginBottom:8}}>SELECT PAYMENT CARD: (VIP = Golden, Normal = Dark)</div>
              {[
                {id:'visa', name:'Visa Platinum', num:s.visa, fee:s.normalFee},
                {id:'master', name:'Mastercard World', num:s.master, fee:s.normalFee},
                {id:'amex', name:'American Express', num:s.amex, fee:s.normalFee},
                {id:'vip', name:'Golden VIP Card', num:s.vip, fee:s.vipFee, badge:'VIP 0% FEE'},
              ].map(card=>(
                <div key={card.id} onClick={()=>setPayMethod(card.id)} style={{background: payMethod===card.id?'#1e293b':'#0a1040', border: payMethod===card.id?'2px solid #fbbf24':'1px solid #1e3a8a', borderRadius:12, padding:12, marginBottom:8, display:'flex', justifyContent:'space-between', cursor:'pointer'}}>
                  <div style={{display:'flex', gap:10, alignItems:'center'}}>
                    <div style={{background: card.id==='vip'?'#fbbf24':'#334155', color: card.id==='vip'?'#000':'#fff', fontSize:9, fontWeight:900, padding:'4px 6px', borderRadius:4}}>{card.id.toUpperCase()}</div>
                    <div><div style={{fontSize:13, fontWeight:700}}>{card.name} {card.badge && <span style={{background:'#fbbf24', color:'#000', fontSize:8, padding:'2px 5px', borderRadius:4, marginLeft:6}}>{card.badge}</span>}</div><div style={{fontSize:11, color:'#64748b'}}>•••• {card.num} • {card.fee}</div></div>
                  </div>
                  <div style={{width:18, height:18, borderRadius:50, border:'2px solid #334155', background: payMethod===card.id?'#fbbf24':'transparent'}}></div>
                </div>
              ))}
            </div>
            <div style={{marginTop:12, background:'#020617', border:'1px dashed #fbbf24', borderRadius:12, padding:12}}>
              <div style={{fontSize:12, fontWeight:700}}>🔒 Enter CVC</div>
              <input value={cvc} onChange={e=>setCvc(e.target.value)} maxLength={4} placeholder="CVC 3-4 digits" style={{width:'100%', padding:12, borderRadius:10, background:'#0e1525', border:'1px solid #334155', color:'#fff', textAlign:'center', marginTop:8}} />
              <button onClick={()=>{ if(cvc.length>=3){ setShowPay(false); setShowTxn(true);} else alert('CVC daalo')}} style={{width:'100%', marginTop:10, padding:12, background:'#fbbf24', color:'#000', border:'none', borderRadius:10, fontWeight:900}}>PAY {selectedPrice} AED →</button>
            </div>
          </div>
        </div>
      )}

      {showTxn && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.92)', zIndex:80, display:'flex', alignItems:'center', justifyContent:'center', padding:12}}>
          <div style={{
            background: payMethod==='vip' ? 'linear-gradient(135deg, #0f0f0f, #1a1505)' : '#0a1040',
            border: payMethod==='vip' ? '1.5px solid #fbbf24' : '1.5px solid #334155',
            borderRadius:18, width:'100%', maxWidth:380, overflow:'hidden',
            boxShadow: payMethod==='vip' ? '0 0 25px rgba(251,191,36,0.25)' : 'none',
          }}>
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
                  <div style={{width:64, height:64, borderRadius:50, background: payMethod==='vip' ? 'radial-gradient(circle, #2a1505, #000)' : '#2a0a0a', border: payMethod==='vip' ? '2px solid #fbbf24' : '2px solid #ef4444', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto', boxShadow: payMethod==='vip' ? '0 0 15px rgba(251,191,36,0.3)' : 'none'}}>
                    <span style={{fontSize:28, color: payMethod==='vip' ? '#fbbf24' : '#ef4444'}}>✕</span>
                  </div>
                  <div style={{fontWeight:900, fontSize:18, marginTop:12, color: payMethod==='vip' ? '#fbbf24' : '#ff6b6b'}}>PAYMENT FAILED!</div>
                  <div style={{fontSize:11, color: payMethod==='vip' ? '#c9b86a' : '#94a3b8', marginTop:6}}>{s.lowLevelMsg}</div>
                </>
              ) : (
                <>
                  <div style={{width:64, height:64, borderRadius:50, background: payMethod==='vip' ? 'radial-gradient(circle, #1f1a05, #000)' : '#052e16', border: payMethod==='vip' ? '2px solid #fbbf24' : '2px solid #22c55e', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto', boxShadow: payMethod==='vip' ? '0 0 15px rgba(251,191,36,0.3)' : 'none'}}>
                    <span style={{fontSize:28, color: payMethod==='vip' ? '#fbbf24' : '#22c55e'}}>✓</span>
                  </div>
                  <div style={{fontWeight:900, fontSize:18, marginTop:12, color: payMethod==='vip' ? '#fbbf24' : '#22c55e'}}>{s.txnSuccessTitle}</div>
                  <div style={{fontSize:11, color: payMethod==='vip' ? '#c9b86a' : '#94a3b8', marginTop:6}}>{s.txnSuccessMsg}</div>
                </>
              )}
              <div style={{marginTop:14, background: payMethod==='vip' ? 'rgba(0,0,0,0.6)' : '#020617', borderRadius:10, padding:12, textAlign:'left', fontSize:11, border: payMethod==='vip' ? '1px solid rgba(251,191,36,0.2)' : '1px solid #1e293b'}}>
                <div style={{display:'flex', justifyContent:'space-between', padding:'4px 0'}}><span style={{color:'#64748b'}}>Pack:</span><b style={{color: payMethod==='vip' ? '#ffd700' : '#fff'}}>{selectedPack} UC</b></div>
                <div style={{display:'flex', justifyContent:'space-between', padding:'4px 0'}}><span style={{color:'#64748b'}}>UID:</span><b>{uid}</b></div>
                <div style={{display:'flex', justifyContent:'space-between', padding:'4px 0'}}><span style={{color:'#64748b'}}>Username:</span><b style={{color: payMethod==='vip' ? '#ffd700' : '#fbbf24'}}>{game==='pubg'?s.pubgName:s.ffName}</b></div>
                <div style={{display:'flex', justifyContent:'space-between', padding:'4px 0'}}><span style={{color:'#64748b'}}>Card:</span><span>{payMethod.toUpperCase()} •• {payMethod==='vip'?s.vip:payMethod==='visa'?s.visa:s.master} {payMethod==='vip'?'★':''}</span></div>
                <div style={{display:'flex', justifyContent:'space-between', padding:'4px 0'}}><span style={{color:'#64748b'}}>Time:</span><span>{new Date().toLocaleDateString()}, {new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span></div>
                {s.txnType==='failed' && <div style={{marginTop:8, background: payMethod==='vip'?'rgba(251,191,36,0.1)':'rgba(239,68,68,0.1)', border: payMethod==='vip'?'1px solid rgba(251,191,36,0.3)':'1px solid #ef4444', padding:8, borderRadius:6, color: payMethod==='vip'?'#ffd700':'#fca5a5', fontSize:10}}>Reason: {s.txnFailReason}</div>}
              </div>
              <div style={{display:'flex', gap:10, marginTop:16}}>
                <button onClick={()=>setShowTxn(false)} style={{flex:1, padding:12, borderRadius:10, background:'#1e293b', color:'#fff', border:'1px solid #334155', fontWeight:700}}>Cancel</button>
                <button onClick={()=>setShowTxn(false)} style={{flex:1, padding:12, borderRadius:10, background: payMethod==='vip' ? 'linear-gradient(90deg, #fbbf24, #ffd700)' : '#22c55e', color: payMethod==='vip' ? '#000' : '#fff', border:'none', fontWeight:800, boxShadow: payMethod==='vip' ? '0 0 12px rgba(251,191,36,0.4)' : 'none'}}>{s.txnType==='failed'?'RETRY':'DONE'}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSet && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.97)', zIndex:60, overflow:'auto', padding:12}}>
          <div style={{background:'#0e1525', border:'1px solid #1e293b', borderRadius:16, maxWidth:600, margin:'10px auto', padding:14, paddingBottom:40}}>
            <div style={{display:'flex', justifyContent:'space-between'}}><h3 style={{margin:0}}>⚙ Setting - 22 Fields</h3><button onClick={()=>setShowSet(false)} style={{background:'#ef4444', color:'#fff', border:'none', padding:'8px 14px', borderRadius:8}}>X</button></div>
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
                <button onClick={()=>setS({...s, txnType:'success'})} style={{flex:1, padding:8, borderRadius:8, background: s.txnType==='success'?'#22c55e':'#1e293b', color:'#fff', border:'1px solid #334155', fontSize:11}}>14. Success</button>
                <button onClick={()=>setS({...s, txnType:'failed'})} style={{flex:1, padding:8, borderRadius:8, background: s.txnType==='failed'?'#ef4444':'#1e293b', color:'#fff', border:'1px solid #334155', fontSize:11}}>15. Failed</button>
                <button onClick={()=>setS({...s, txnType:'pending'})} style={{flex:1, padding:8, borderRadius:8, background: s.txnType==='pending'?'#f59e0b':'#1e293b', color:'#fff', border:'1px solid #334155', fontSize:11}}>Pending</button>
              </div>
              <textarea value={s.txnFailReason} onChange={e=>setS({...s, txnFailReason:e.target.value})} placeholder="15. Failed Reason" rows={2} style={{width:'100%', padding:9, borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155', fontSize:11}} />
              <input value={s.txnSuccessTitle} onChange={e=>setS({...s, txnSuccessTitle:e.target.value})} placeholder="16. Success Title" style={{width:'100%', padding:9, borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155'}} />
              <input value={s.txnSuccessMsg} onChange={e=>setS({...s, txnSuccessMsg:e.target.value})} placeholder="17. Success Msg" style={{width:'100%', padding:9, borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155'}} />
              <input value={s.txnPendingMsg} onChange={e=>setS({...s, txnPendingMsg:e.target.value})} placeholder="18. Pending Msg" style={{width:'100%', padding:9, borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155'}} />
              <div style={{fontSize:11, fontWeight:900, color:'#22c55e', marginTop:8}}>19-22: ROOF + VIP/NORMAL + REFUND</div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:6}}>
                <input value={s.minPack} onChange={e=>setS({...s, minPack:e.target.value})} placeholder="19. Min 3" style={{width:'100%', padding:9, borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155'}} />
                <input value={s.maxPack} onChange={e=>setS({...s, maxPack:e.target.value})} placeholder="20. Max 15" style={{width:'100%', padding:9, borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155'}} />
                <input value={s.vipFee} onChange={e=>setS({...s, vipFee:e.target.value})} placeholder="21. VIP Fee" style={{width:'100%', padding:9, borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155'}} />
                <input value={s.normalFee} onChange={e=>setS({...s, normalFee:e.target.value})} placeholder="22. Normal Fee" style={{width:'100%', padding:9, borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155'}} />
              </div>
              <textarea value={s.refundPolicy} onChange={e=>setS({...s, refundPolicy:e.target.value})} placeholder="Refund Policy" rows={2} style={{width:'100%', padding:9, borderRadius:8, background:'#020617', color:'#fff', border:'1px solid #334155', fontSize:11}} />
            </div>
            <button onClick={()=>setShowSet(false)} style={{width:'100%', marginTop:15, padding:14, background:'#22c55e', color:'#000', border:'none', borderRadius:10, fontWeight:900}}>SAVE ALL 22 FIELDS</button>
          </div>
        </div>
      )}
    </div>
  )
}
