import { useState, useEffect } from 'react';

const PUBG_PACKS = [
  { amount: '8100', label: 'UC', total: '8,100 UC', price: 329, bonus: '35%' },
  { amount: '12000', label: 'UC', total: '15,000 UC', price: 490, bonus: '35%' },
  { amount: '40500', label: 'UC', total: '55,500 UC', price: 1649, bonus: '40%' },
  { amount: '70000', label: 'UC', total: '100,000 UC', price: 2849, bonus: '50%' },
];

const FF_PACKS = [
  { amount: '25000', label: 'Diamonds', total: '25,000 + 2,500 Bonus', price: 299, bonus: '10%' },
  { amount: '50000', label: 'Diamonds', total: '50,000 + 7,500 Bonus', price: 549, bonus: '15%' },
  { amount: '100000', label: 'Diamonds', total: '100,000 + 20,000 Bonus', price: 999, bonus: '20%', best: true },
  { amount: '200000', label: 'Diamonds', total: '200,000 + 50,000 Bonus', price: 1899, bonus: '25%', best: true },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'pubg' | 'freefire'>('pubg');
  const [uid, setUid] = useState('5991827364');
  const [ffUid, setFfUid] = useState('3144989462');
  const [fakeUsername, setFakeUsername] = useState('BINRAO 876');
  const [ffName, setFfName] = useState('لوفر جانان');
  const [sel, setSel] = useState<any>(null);
  const [payCard, setPayCard] = useState('visa');
  const [cvc, setCvc] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [processing, setProcessing] = useState(false);
  
  // SETTING STATES
  const [payStatus, setPayStatus] = useState<'failed' | 'success' | 'pending'>('failed');
  const [cvcEnabled, setCvcEnabled] = useState(true);
  const [loadTime, setLoadTime] = useState(1.5);

  useEffect(() => {
    const savedName = localStorage.getItem('fake_username');
    const savedFF = localStorage.getItem('fake_ff_name');
    const savedStatus = localStorage.getItem('pay_status');
    const savedCvc = localStorage.getItem('cvc_enabled');
    const savedLoad = localStorage.getItem('load_time');
    if (savedName) setFakeUsername(savedName);
    if (savedFF) setFfName(savedFF);
    if (savedStatus) setPayStatus(savedStatus as any);
    if (savedCvc) setCvcEnabled(savedCvc === 'true');
    if (savedLoad) setLoadTime(parseFloat(savedLoad));
    try { setOrders(JSON.parse(localStorage.getItem('orders') || '[]')); } catch {}
  }, []);

  const saveSettings = () => {
    localStorage.setItem('fake_username', fakeUsername);
    localStorage.setItem('fake_ff_name', ffName);
    localStorage.setItem('pay_status', payStatus);
    localStorage.setItem('cvc_enabled', String(cvcEnabled));
    localStorage.setItem('load_time', String(loadTime));
  };

  const saveOrders = (o: any[]) => { setOrders(o); localStorage.setItem('orders', JSON.stringify(o)); };

  const getCardName = () => {
    if (payCard === 'visa') return 'Visa Platinum (•••• 2343)';
    if (payCard === 'master') return 'Mastercard World (•••• 9921)';
    if (payCard === 'amex') return 'American Express (•••• 6512)';
    return 'Golden VIP Card (•••• 1234)';
  };

  const handlePay = () => {
    if (cvcEnabled && cvc.length < 3) { alert('CVC dalo!'); return; }
    setProcessing(true);
    setTimeout(() => {
      const newOrder = { 
        id: Date.now(), 
        pack: `${sel.amount} ${sel.label}`, 
        uid: activeTab === 'pubg' ? uid : ffUid, 
        name: activeTab === 'pubg' ? fakeUsername : ffName,
        price: sel.price, 
        method: getCardName(), 
        status: payStatus,
        cardType: payCard,
        time: new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      };
      saveOrders([newOrder, ...orders]);
      setProcessing(false);
      setShowResult(true);
    }, loadTime * 1000);
  };

  const isGolden = payCard === 'vip';

  return (
    <div style={{ background: activeTab === 'pubg' ? '#080e2a' : '#1a0505', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* TOP BAR - PUBG | FREE FIRE | SETTING */}
      <div style={{ background: activeTab === 'pubg' ? '#0a1433' : '#2a0a0a', borderBottom: '1px solid #333', padding: '8px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={()=>setActiveTab('pubg')} style={{ background: activeTab==='pubg' ? '#fbbf24' : '#13204a', color: activeTab==='pubg' ? 'black' : 'white', border: '1px solid #fbbf24', borderRadius: '8px', padding: '7px 14px', fontWeight: 900, fontSize: '12px' }}>PUBG</button>
          <button onClick={()=>setActiveTab('freefire')} style={{ background: activeTab==='freefire' ? '#ef4444' : '#3a1515', color: 'white', border: activeTab==='freefire'?'1px solid #ef4444':'1px solid #555', borderRadius: '8px', padding: '7px 14px', fontWeight: 900, fontSize: '12px' }}>FREE FIRE</button>
        </div>
        <button onClick={()=>{ saveSettings(); setShowAdmin(!showAdmin); }} style={{ background: '#13204a', border: '1px solid #fbbf24', borderRadius: '8px', padding: '7px 12px', color: '#fbbf24', fontWeight: 700, fontSize: '12px' }}>⚙️ Setting</button>
      </div>

      {!showAdmin ? (
        <>
          {activeTab === 'pubg' ? (
            <>
              <div style={{ margin: '12px', background: 'linear-gradient(135deg,#12214d,#0a1433)', border: '1px solid #1e3a7a', borderRadius: '16px', padding: '16px', textAlign: 'center' }}>
                <div style={{ color: '#fbbf24', fontSize: '11px', fontWeight: 900 }}>✨ SEASON SPECIAL • UP TO 35% EXTRA BONUS UC</div>
                <h1 style={{ fontWeight: 900, fontSize: '18px', marginTop: '8px' }}>INSTANT PUBG MOBILE UC TOP-UP PORTAL</h1>
                <p style={{ fontSize: '11px', color: '#aaa', marginTop: '6px' }}>Enter UID, choose package, receive UC in less than 60 seconds.</p>
              </div>

              <div style={{ margin: '12px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700 }}>🎮 UID / Number Enter Karo:</div>
                <div style={{ background: '#000', border: '1px solid #333', borderRadius: '12px', padding: '14px', marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <input value={uid} onChange={e=>setUid(e.target.value)} placeholder="Enter UID" style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '18px', fontWeight: 900, outline: 'none', width: '70%' }} />
                  <div style={{ width: '28px', height: '28px', background: uid.length>=8?'#0a4a2a':'#333', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: uid.length>=8?'#34d399':'#666' }}>✓</div>
                </div>
                <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                  {['5123456789','5829104821','5991827364'].map(t=>(
                    <button key={t} onClick={()=>setUid(t)} style={{ background: t===uid?'#fbbf24':'#1a1a1a', color: t===uid?'black':'white', border: '1px solid #333', borderRadius: '6px', padding: '6px 10px', fontSize: '11px', fontWeight: 700 }}>{t}</button>
                  ))}
                </div>

                {uid.length >= 8 && (
                  <div style={{ background: '#0f1e42', border: '1px dashed #fbbf24', borderRadius: '12px', padding: '12px', marginTop: '12px' }}>
                    <div style={{ color: '#34d399', fontWeight: 900, fontSize: '12px' }}>✓ Account Verified</div>
                    <div style={{ marginTop: '8px', fontSize: '12px', display: 'grid', gap: '6px' }}>
                      <div>UID: <b>{uid}</b></div>
                      <div>Username: <b style={{ color: '#fbbf24' }}>{fakeUsername}</b></div>
                    </div>
                  </div>
                )}

                <h3 style={{ fontWeight: 900, fontSize: '13px', marginTop: '16px' }}>SELECT PACKAGE:</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
                  {PUBG_PACKS.map((p:any,i)=>(
                    <div key={i} onClick={()=>setSel({...p, game:'PUBG'})} style={{ background: sel?.amount===p.amount?'#1a2a5a':'#0f1e42', border: sel?.amount===p.amount?'2px solid #fbbf24':'1px solid #1e3a7a', borderRadius: '12px', padding: '12px', textAlign: 'center', cursor: 'pointer' }}>
                      <div style={{ fontSize: '24px' }}>💰</div>
                      <div style={{ fontWeight: 900 }}>{p.amount} UC</div>
                      <div style={{ fontSize: '11px', color: '#fbbf24' }}>{p.price} AED</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* FREE FIRE DESIGN */}
              <div style={{ margin: '12px', background: 'linear-gradient(135deg,#3a1515,#1a0505)', border: '1px solid #ef4444', borderRadius: '16px', padding: '16px', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '10px' }}>
                  {['Days','Hours','Min','Sec'].map((l,i)=>(
                    <div key={i} style={{ background: '#000', border: '1px solid #ef4444', borderRadius: '8px', padding: '8px 10px', minWidth: '50px' }}>
                      <div style={{ fontWeight: 900, fontSize: '18px', color: '#ef4444' }}>00</div>
                      <div style={{ fontSize: '10px', color: '#aaa' }}>{l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: '#ef4444', color: 'white', borderRadius: '8px', padding: '8px', fontWeight: 900, fontSize: '12px' }}>🔥 RECENTLY SOLD: 25,000 DIAMONDS - JUST NOW!</div>
                <h1 style={{ fontWeight: 900, fontSize: '18px', marginTop: '12px' }}>FREE FIRE DIAMOND TOP-UP</h1>
              </div>

              <div style={{ margin: '12px' }}>
                <div style={{ background: '#000', border: '1px solid #ef4444', borderRadius: '12px', padding: '14px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#ef4444' }}>🔍 SEARCH PLAYER:</div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                    <input value={ffUid} onChange={e=>setFfUid(e.target.value)} placeholder="Enter Player ID" style={{ flex: 1, background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', padding: '10px', color: 'white', outline: 'none' }} />
                    <button style={{ background: '#ef4444', border: 'none', borderRadius: '8px', padding: '10px 14px', fontWeight: 900, color: 'white' }}>Search</button>
                  </div>
                </div>

                {ffUid.length >= 8 && (
                  <div style={{ background: '#1a0a0a', border: '1px dashed #ef4444', borderRadius: '12px', padding: '12px', marginTop: '12px' }}>
                    <div style={{ color: '#34d399', fontWeight: 900, fontSize: '12px' }}>✓ Account Verified</div>
                    <div style={{ marginTop: '8px', fontSize: '12px', display: 'grid', gap: '6px' }}>
                      <div>ID: <b>{ffUid}</b></div>
                      <div>Name: <b style={{ color: '#fbbf24' }}>{ffName}</b></div>
                    </div>
                  </div>
                )}

                <h3 style={{ fontWeight: 900, fontSize: '13px', marginTop: '16px', color: '#ef4444' }}>SELECT DIAMONDS PACK:</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
                  {FF_PACKS.map((p:any,i)=>(
                    <div key={i} onClick={()=>setSel({...p, game:'FF'})} style={{ background: sel?.amount===p.amount?'#3a1515':'#1a0a0a', border: sel?.amount===p.amount?'2px solid #ef4444':'1px solid #5a2222', borderRadius: '12px', padding: '12px', textAlign: 'center', cursor: 'pointer' }}>
                      <div style={{ fontSize: '24px' }}>💎</div>
                      <div style={{ fontWeight: 900 }}>{p.amount}</div>
                      <div style={{ fontSize: '11px', color: '#ef4444' }}>{p.price} AED</div>
                      <div style={{ fontSize: '10px', color: '#888' }}>{p.total}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        /* SETTING PANEL */
        <div style={{ padding: '14px' }}>
          <h2 style={{ fontWeight: 900, fontSize: '18px' }}>⚙️ SETTING - All Control</h2>
          
          <div style={{ background: '#0f1e42', border: '1px solid #1e3a7a', borderRadius: '12px', padding: '14px', marginTop: '14px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#fbbf24' }}>1. PUBG Fake Username (Har UID pe yahi ayega):</div>
            <input value={fakeUsername} onChange={e=>{ setFakeUsername(e.target.value); localStorage.setItem('fake_username', e.target.value); }} style={{ width: '100%', marginTop: '8px', background: '#000', border: '1px solid #fbbf24', borderRadius: '8px', padding: '12px', color: '#fbbf24', fontWeight: 900, outline: 'none' }} />
            
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#ef4444', marginTop: '14px' }}>2. FREE FIRE Fake Name:</div>
            <input value={ffName} onChange={e=>{ setFfName(e.target.value); localStorage.setItem('fake_ff_name', e.target.value); }} style={{ width: '100%', marginTop: '8px', background: '#000', border: '1px solid #ef4444', borderRadius: '8px', padding: '12px', color: '#fbbf24', fontWeight: 900, outline: 'none' }} />

            <div style={{ fontSize: '12px', fontWeight: 700, color: '#34d399', marginTop: '14px' }}>3. Payment Status Setting:</div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              {['success','pending','failed'].map(s=>(
                <button key={s} onClick={()=>{ setPayStatus(s as any); localStorage.setItem('pay_status', s); }} style={{ flex: 1, background: payStatus===s ? (s==='failed'?'#ef4444': s==='success'?'#34d399':'#fbbf24') : '#1a1a1a', color: payStatus===s?'black':'white', border: '1px solid #333', borderRadius: '8px', padding: '10px', fontWeight: 900, fontSize: '11px', textTransform: 'uppercase' }}>{s}</button>
              ))}
            </div>

            <div style={{ fontSize: '12px', fontWeight: 700, color: '#aaa', marginTop: '14px' }}>4. CVC Field On/Off:</div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px', alignItems: 'center' }}>
              <button onClick={()=>{ setCvcEnabled(!cvcEnabled); localStorage.setItem('cvc_enabled', String(!cvcEnabled)); }} style={{ background: cvcEnabled ? '#34d399' : '#333', border: 'none', borderRadius: '20px', width: '50px', height: '28px', position: 'relative' }}>
                <div style={{ width: '22px', height: '22px', background: 'white', borderRadius: '50%', position: 'absolute', top: '3px', left: cvcEnabled ? '25px' : '3px', transition: '0.2s' }}></div>
              </button>
              <span style={{ fontSize: '12px' }}>{cvcEnabled ? 'ON - CVC Dikhana hai' : 'OFF - Background me kaam karega'}</span>
            </div>

            <div style={{ fontSize: '12px', fontWeight: 700, color: '#aaa', marginTop: '14px' }}>5. Loading Time Setting:</div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              {[1.5, 2, 3].map(t=>(
                <button key={t} onClick={()=>{ setLoadTime(t); localStorage.setItem('load_time', String(t)); }} style={{ flex: 1, background: loadTime===t ? '#fbbf24' : '#1a1a1a', color: loadTime===t ? 'black' : 'white', border: '1px solid #333', borderRadius: '8px', padding: '10px', fontWeight: 900, fontSize: '12px' }}>{t} Sec</button>
              ))}
            </div>

            <button onClick={()=>setShowAdmin(false)} style={{ width: '100%', marginTop: '16px', background: '#fbbf24', color: 'black', border: 'none', borderRadius: '10px', padding: '12px', fontWeight: 900 }}>💾 SAVE & BACK</button>
          </div>

          <div style={{ marginTop: '14px', fontSize: '11px', color: '#888' }}>
            Orders: {orders.length} | Current: {payStatus.toUpperCase()} | CVC: {cvcEnabled?'ON':'OFF'} | Load: {loadTime}s
          </div>
        </div>
      )}

      {/* PAYMENT PAGE - CARDS + CVC */}
      {sel && !showResult && !showAdmin && (
        <div style={{ position: 'fixed', inset: 0, background: activeTab==='pubg' ? '#0a1433' : '#1a0505', zIndex: 50, overflowY: 'auto' }}>
          <div style={{ padding: '14px', maxWidth: '420px', margin: '0 auto' }}>
            <div style={{ background: activeTab==='pubg' ? '#12214d' : '#2a1515', border: '1px solid #333', borderRadius: '12px', padding: '14px', display: 'flex', justifyContent: 'space-between' }}>
              <div><div style={{ color: '#fbbf24', fontSize: '11px', fontWeight: 900 }}>SELECTED PACKAGE</div><div style={{ fontWeight: 900, fontSize: '20px', marginTop: '4px' }}>{sel.amount} {sel.label} <span style={{ background: '#fbbf24', color: 'black', fontSize: '11px', padding: '2px 6px', borderRadius: '4px' }}>{sel.bonus}</span></div><div style={{ fontSize: '12px', color: '#aaa' }}>Total: <span style={{ color: '#34d399' }}>{sel.total}</span></div></div>
              <div style={{ textAlign: 'right' }}><div style={{ fontSize: '11px', color: '#aaa' }}>Total Price</div><div style={{ fontWeight: 900, fontSize: '18px', color: '#fbbf24' }}>{sel.price} AED</div></div>
            </div>

            <div style={{ background: activeTab==='pubg' ? '#0f1e42' : '#1a0a0a', border: '1px dashed #2a4a8a', borderRadius: '12px', padding: '12px', marginTop: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}><span style={{ color: '#888' }}>UID:</span><span style={{ fontWeight: 900 }}>{activeTab==='pubg'?uid:ffUid}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginTop: '6px' }}><span style={{ color: '#888' }}>Username:</span><span style={{ fontWeight: 900, color: '#fbbf24' }}>{activeTab==='pubg'?fakeUsername:ffName}</span></div>
              <div style={{ background: '#0a2a2a', borderRadius: '8px', padding: '8px 10px', display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '12px' }}><span style={{ color: '#34d399' }}>🛡️ Account Verified</span><span style={{ color: '#888' }}>{new Date().toLocaleDateString('en-GB')} {new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</span></div>
            </div>

            <div style={{ marginTop: '16px' }}><div style={{ color: '#fbbf24', fontWeight: 900, fontSize: '13px' }}>SELECT PAYMENT CARD:</div>
              <div style={{ marginTop: '10px', display: 'grid', gap: '10px' }}>
                {[
                  { id: 'visa', name: 'Visa Platinum', num: '2343', color: '#1a3aff', label: 'VISA' },
                  { id: 'master', name: 'Mastercard World', num: '9921', color: '#c62828', label: 'MAST' },
                  { id: 'amex', name: 'American Express', num: '6512', color: '#0a4a6a', label: 'AMEX' },
                  { id: 'vip', name: 'Golden VIP Card', num: '1234', color: 'linear-gradient(135deg,#fbbf24,#b7790a)', label: 'VIP', premium: true },
                ].map(card => (
                  <div key={card.id} onClick={()=>setPayCard(card.id)} style={{ background: card.premium ? 'linear-gradient(135deg,#2a2010,#1a1505)' : '#13204a', border: payCard===card.id ? (card.premium ? '2px solid #fbbf24' : '2px solid #fbbf24') : '1px solid #1e3a7a', borderRadius: '12px', padding: card.premium ? '14px' : '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: card.premium && payCard===card.id ? '0 0 20px rgba(251,191,36,0.5)' : 'none', transform: card.premium && payCard===card.id ? 'scale(1.02)' : 'scale(1)', transition: '0.2s' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <div style={{ background: card.premium ? 'linear-gradient(135deg,#fbbf24,#b7790a)' : card.color, padding: card.premium ? '8px 12px' : '6px 8px', borderRadius: '6px', fontSize: card.premium?'13px':'11px', fontWeight: 900, color: card.premium?'black':'white', boxShadow: card.premium?'0 0 10px #fbbf24':'' }}>{card.premium ? '👑 '+card.label : card.label}</div>
                      <div><div style={{ fontWeight: 700, fontSize: card.premium?'14px':'13px', color: card.premium?'#fbbf24':'white' }}>{card.name} {card.premium ? '✨ PREMIUM' : ''}</div><div style={{ fontSize: '11px', color: '#aaa' }}>•••• •••• •••• {card.num}</div></div>
                    </div>
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid #555', background: payCard===card.id ? (card.premium ? '#fbbf24' : '#fbbf24') : 'transparent' }}></div>
                  </div>
                ))}
              </div>
            </div>

            {cvcEnabled && (
              <div style={{ background: '#0f1e42', border: '1px dashed #fbbf24', borderRadius: '12px', padding: '14px', marginTop: '14px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700 }}>🔒 Enter Card Security Code (CVC / CVV):</div>
                <input value={cvc} onChange={e=>setCvc(e.target.value)} placeholder="CVC" maxLength={4} style={{ width: '100%', marginTop: '10px', background: '#0a1433', border: '1px solid #2a4a8a', borderRadius: '10px', padding: '12px', color: 'white', textAlign: 'center', fontSize: '16px', letterSpacing: '3px', outline: 'none' }} />
              </div>
            )}

            <button onClick={handlePay} disabled={processing} style={{ width: '100%', marginTop: '14px', background: processing ? '#333' : isGolden ? 'linear-gradient(135deg,#fbbf24,#b7790a)' : '#fbbf24', color: processing ? '#888' : 'black', border: 'none', borderRadius: '12px', padding: '16px', fontWeight: 900, fontSize: '14px', boxShadow: isGolden ? '0 0 20px rgba(251,191,36,0.4)' : 'none' }}>
              {processing ? `⏳ Processing ${loadTime}s...` : `🛡️ PAY WITH ${payCard.toUpperCase()} - ${sel.price} AED`}
            </button>
            <button onClick={()=>setSel(null)} style={{ width: '100%', marginTop: '10px', background: 'transparent', border: '1px solid #333', borderRadius: '10px', padding: '10px', color: '#888' }}>← Back</button>
          </div>
        </div>
      )}

      {/* TRANSACTION RESULT - GOLDEN SHADE IF VIP */}
      {showResult && sel && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: 60 }}>
          <div style={{ background: isGolden ? '#1a1505' : '#0a1433', border: isGolden ? '2px solid #fbbf24' : payStatus==='failed' ? '2px solid #ef4444' : payStatus==='success' ? '2px solid #34d399' : '2px solid #fbbf24', borderRadius: '16px', width: '100%', maxWidth: '360px', overflow: 'hidden', boxShadow: isGolden ? '0 0 30px rgba(251,191,36,0.3)' : '' }}>
            <div style={{ background: isGolden ? 'linear-gradient(135deg,#2a2010,#1a1505)' : '#12214d', padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div style={{ background: isGolden ? 'linear-gradient(135deg,#fbbf24,#b7790a)' : 'linear-gradient(135deg,#fbbf24,#b7790a)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '11px', color: 'black' }}>UC</div>
                <span style={{ fontWeight: 900, fontSize: '13px' }}>TRANSACTION RESULT</span>
              </div>
              <button onClick={()=>{ setShowResult(false); setSel(null); setCvc(''); }} style={{ background: 'transparent', border: 'none', color: '#888', fontSize: '18px' }}>✕</button>
            </div>
            <div style={{ padding: '20px 16px', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: isGolden ? '2px solid #fbbf24' : payStatus==='failed' ? '2px solid #ef4444' : '2px solid #34d399', background: isGolden ? 'rgba(251,191,36,0.15)' : payStatus==='failed' ? 'rgba(239,68,68,0.15)' : 'rgba(52,211,153,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', border: isGolden ? '2px solid #fbbf24' : payStatus==='failed' ? '2px solid #ef4444' : '2px solid #34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isGolden ? '#fbbf24' : payStatus==='failed' ? '#ef4444' : '#34d399', fontWeight: 900 }}>{payStatus==='failed' ? '✕' : payStatus==='success' ? '✓' : '!'}</div>
              </div>
              <div style={{ fontWeight: 900, fontSize: '18px', color: isGolden ? '#fbbf24' : payStatus==='failed' ? '#ef4444' : payStatus==='success' ? '#34d399' : '#fbbf24', marginTop: '12px' }}>{payStatus==='failed' ? 'PAYMENT FAILED!' : payStatus==='success' ? 'PAYMENT SUCCESS!' : 'PAYMENT PENDING!'}</div>
              <div style={{ fontSize: '11px', color: '#aaa', marginTop: '4px' }}>{payStatus==='failed' ? 'Transaction declined by the small pack issuer or ID.' : payStatus==='success' ? 'Transaction completed successfully!' : 'Transaction is pending approval.'}</div>
              <div style={{ background: isGolden ? '#2a2010' : '#0f1e42', borderRadius: '10px', padding: '12px', marginTop: '16px', textAlign: 'left', fontSize: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}><span style={{ color: '#888' }}>Pack:</span><span style={{ fontWeight: 900 }}>{sel.amount} {sel.label}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}><span style={{ color: '#888' }}>UID:</span><span>{activeTab==='pubg'?uid:ffUid}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}><span style={{ color: '#888' }}>Username:</span><span style={{ color: '#fbbf24', fontWeight: 700 }}>{activeTab==='pubg'?fakeUsername:ffName}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}><span style={{ color: '#888' }}>Card Used:</span><span style={{ color: '#aaa' }}>{orders[0]?.method}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}><span style={{ color: '#888' }}>Time:</span><span style={{ color: '#aaa' }}>{orders[0]?.time}</span></div>
                <div style={{ padding: '8px 0', color: '#ef4444', fontSize: '11px' }}>Reason: Your level is to low please buy another big pack . Please check pack big or retry.</div>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
                <button onClick={()=>{ setShowResult(false); setSel(null); setCvc(''); }} style={{ flex: 1, background: '#13204a', border: '1px solid #1e3a7a', borderRadius: '10px', padding: '12px', color: '#aaa', fontWeight: 700 }}>Cancel</button>
                <button onClick={()=>setShowResult(false)} style={{ flex: 1, background: isGolden ? 'linear-gradient(135deg,#fbbf24,#b7790a)' : '#ef4444', border: 'none', borderRadius: '10px', padding: '12px', color: isGolden?'black':'white', fontWeight: 900 }}>{payStatus==='failed'?'RETRY':'OK'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
