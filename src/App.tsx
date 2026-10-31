import { useState, useEffect } from 'react';

const PACKS = [
  { id: 1, title: '24000 UC', uc: 24000, price: 980, bonus: 8000, best: false },
  { id: 2, title: '30000 UC', uc: 30000, price: 1220, bonus: 10000, best: false },
  { id: 3, title: '40500 UC', uc: 40500, price: 1649, bonus: 15000, best: true },
  { id: 4, title: '50000 UC', uc: 50000, price: 2030, bonus: 18000, best: false },
  { id: 5, title: '60000 UC', uc: 60000, price: 2440, bonus: 22000, best: false },
  { id: 6, title: '70000 UC', uc: 70000, price: 2849, bonus: 30000, best: true },
];

export default function App() {
  return (
    <div style={{background:'#050b1e', color:'white', minHeight:'100vh', padding:'20px', fontFamily:'sans-serif'}}>
      <h1 style={{fontSize:'24px', fontWeight:'900'}}>🎮 UNKNOWN UC STORE</h1>
      <p>12K to 70K UC Packs - NEW</p>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginTop:'20px'}}>
        <div style={{background:'#0a122e', border:'1px solid #1b2b5d', padding:'15px', borderRadius:'10px'}}>
          <div style={{fontWeight:'bold'}}>12000 UC</div>
          <div style={{color:'#fbbf24'}}>15000 UC Total</div>
          <div>AED 490</div>
        </div>
        <div style={{background:'#0a122e', border:'1px solid #1b2b5d', padding:'15px', borderRadius:'10px'}}>
          <div style={{fontWeight:'bold'}}>24000 UC</div>
          <div style={{color:'#fbbf24'}}>32000 UC Total</div>
          <div>AED 980</div>
        </div>
        <div style={{background:'#0a122e', border:'1px solid #fbbf24', padding:'15px', borderRadius:'10px'}}>
          <div style={{fontWeight:'bold'}}>40500 UC (BEST)</div>
          <div style={{color:'#fbbf24'}}>55500 UC Total</div>
          <div>AED 1649</div>
        </div>
        <div style={{background:'#0a122e', border:'1px solid #1b2b5d', padding:'15px', borderRadius:'10px'}}>
          <div style={{fontWeight:'bold'}}>70000 UC</div>
          <div style={{color:'#fbbf24'}}>100000 UC Total</div>
          <div>AED 2849</div>
        </div>
      </div>
      <p style={{marginTop:'20px', fontSize:'12px', color:'#888'}}>© UNKNOWN UC</p>
    </div>
  )
}
