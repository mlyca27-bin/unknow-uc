import React, { useState, useEffect } from "react";
import { X, CheckCircle2, Clock, ShieldCheck, CreditCard, Trash2 } from "lucide-react";
import { AppSettings, OrderRecord, UCPackage } from "../types";
import { formatPrice } from "../utils/currency";
import { sound } from "../utils/audio";

const ALL_UC_PACKS: UCPackage[] = [
  { id: "pack_24000", label: "24000 UC", price: 300, bonus: "3000 UC Bonus", uc: 24000 } as any,
  { id: "pack_32000", label: "32000 UC", price: 400, bonus: "5000 UC Bonus", uc: 32000 } as any,
  { id: "pack_40000", label: "40000 UC", price: 500, bonus: "7000 UC Bonus", uc: 40000 } as any,
  { id: "pack_50000", label: "50000 UC", price: 620, bonus: "10000 UC Bonus", uc: 50000 } as any,
  { id: "pack_60000", label: "60000 UC", price: 740, bonus: "15000 UC Bonus", uc: 60000 } as any,
  { id: "pack_70000", label: "70000 UC", price: 860, bonus: "20000 UC Bonus", uc: 70000 } as any,
];
const getFilteredPacks = () => { return ALL_UC_PACKS.filter((p: any) => (p.uc || parseInt(p.label)) >= 24000); };
interface CheckoutModalProps { isOpen: boolean; onClose: () => void; selectedPack: UCPackage | null; uid: string; savedUsername: string; settings: AppSettings; currency: string; onOrderCompleted: (order: OrderRecord) => void; }
const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, selectedPack, uid, savedUsername, settings, currency, onOrderCompleted }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [holderName, setHolderName] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [uidHistory, setUidHistory] = useState<string[]>(() => { try { const s = localStorage.getItem("unknow_uid_history"); return s ? JSON.parse(s) : ["5123456783"]; } catch { return ["5123456783"]; } });
  useEffect(() => { if (isOpen) { const upd = () => setCurrentTime(new Date().toLocaleString()); upd(); const id = setInterval(upd, 1000); return () => clearInterval(id); } }, [isOpen]);
  useEffect(() => { localStorage.setItem("unknow_uid_history", JSON.stringify(uidHistory)); }, [uidHistory]);
  const handleClearHistory = () => { setUidHistory([]); localStorage.removeItem("unknow_uid_history"); };
  const handleExpiry = (v: string) => { let c = v.replace(/\D/g, "").substring(0,4); if (c.length>=3) c=c.substring(0,2)+"/"+c.substring(2); setExpiry(c); };
  if (!isOpen) return null;
  const handlePayNow = () => { setLoading(true); try{sound.playClick();}catch{} setTimeout(()=>{ const now=new Date(); const ts=now.toLocaleString(); const order:any={ id:Date.now().toString(), uid:uid||"5123456783", pack:selectedPack||getFilteredPacks()[0], username:savedUsername||"BINRAO 876", status:"SUCCESS", paymentMode:"PAID", time:now.toISOString(), displayTime:ts, localTime:ts, price:selectedPack?.price||300, card:`Visa **** ${cardNumber.slice(-4)||"2343"}` }; if(uid&&!uidHistory.includes(uid)) setUidHistory(p=>[uid,...p].slice(0,5)); onOrderCompleted(order); setLoading(false); },800); };
  const visiblePacks = getFilteredPacks();
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-[440px] bg-[#0a1433] border border-yellow-500/20 rounded-[20px] overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center p-4 border-b border-white/10 bg-[#101c3a]">
          <div className="flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-b from-yellow-300 to-yellow-600 rounded-full flex items-center justify-center text-[10px] font-bold text-black">UC</div><h2 className="text-white font-bold text-sm">CHECKOUT</h2></div>
          <button onClick={onClose}><X size={20} color="white" /></button>
        </div>
        <div className="p-5 space-y-4 max-h-[85vh] overflow-y-auto">
          <div className="bg-[#101c3a] border border-dashed border-yellow-500/20 rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center"><label className="text-[13px] text-white font-semibold">UID / Player ID:</label><span className="text-[10px] text-white/30 flex items-center gap-1"><Clock size={10} />{currentTime}</span></div>
            <div className="relative"><div className="w-full bg-black/50 text-white p-3 rounded-lg border border-white/10 text-sm font-mono">{uid||"5123456783"}</div><span className="absolute right-3 top-3 text-green-400"><CheckCircle2 size={18} /></span></div>
            {uidHistory.length>0 && (<div className="space-y-2"><div className="flex justify-between items-center"><span className="text-[11px] text-white/40">Quick use history:</span><button onClick={handleClearHistory} className="flex items-center gap-1 text-[11px] bg-red-500/20 text-red-300 px-2 py-1 rounded-md"><Trash2 size={10} /> Clear</button></div><div className="flex gap-2 flex-wrap">{uidHistory.map((id)=>(<span key={id} className="text-[11px] bg-white/10 text-white/70 px-3 py-1 rounded-full">{id}</span>))}</div></div>)}
            <div className="flex items-center gap-2 text-green-400 bg-green-500/10 border border-green-500/20 p-2.5 rounded-lg text-xs"><ShieldCheck size={16} /><span>Account Verified - {savedUsername||"BINRAO 876"}</span></div>
          </div>
          <div className="space-y-3"><h3 className="text-white font-bold text-sm">BONUS PACKS (24K-70K):</h3><div className="grid grid-cols-2 gap-2">{visiblePacks.map((pack:any)=>(<div key={pack.id} className="bg-gradient-to-b from-[#1a2a5a] to-[#101c3a] border border-white/10 rounded-xl p-3"><div className="text-white font-bold text-sm">{pack.label}</div><div className="text-yellow-400 text-[11px] mt-1">{pack.bonus}</div><div className="text-white/50 text-[10px] mt-1">{formatPrice(pack.price, currency)}</div></div>))}</div></div>
          <div className="space-y-3"><h3 className="text-white font-bold text-sm flex items-center gap-2"><CreditCard size={14} className="text-yellow-400" /> SELECT PAYMENT CARD:</h3><div className="space-y-3 bg-[#101c3a] p-4 rounded-xl border border-white/5"><input value={holderName} onChange={(e)=>setHolderName(e.target.value)} placeholder="Card Holder Name" className="w-full bg-black/50 text-white p-3 rounded-lg border border-white/10 outline-none text-sm" /><input value={cardNumber} onChange={(e)=>setCardNumber(e.target.value.replace(/\D/g,"").substring(0,16))} placeholder="Card Number" className="w-full bg-black/50 text-white p-3 rounded-lg border border-white/10 outline-none text-sm font-mono" /><div className="flex gap-3"><input value={expiry} onChange={(e)=>handleExpiry(e.target.value)} placeholder="MM/YY" className="flex-1 bg-black/50 text-white p-3 rounded-lg border border-white/10 outline-none text-sm" /><input value={cvc} onChange={(e)=>setCvc(e.target.value.replace(/\D/g,"").substring(0,4))} placeholder="CVC" className="flex-1 bg-black/50 text-white p-3 rounded-lg border border-white/10 outline-none text-sm" /></div></div></div>
          <div className="bg-black/40 border border-white/10 rounded-xl p-3 flex justify-between items-center text-[11px]"><span className="text-white/40 flex items-center gap-1"><Clock size={12} /> Current Time:</span><span className="text-white/60 font-mono">{currentTime}</span></div>
          <button onClick={handlePayNow} disabled={loading} className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-3.5 rounded-xl text-sm">{loading?"Processing...":`PAY NOW - ${selectedPack?formatPrice(selectedPack.price, currency):formatPrice(300, currency)}`}</button>
        </div>
      </div>
    </div>
  );
};
export { CheckoutModal };
export default CheckoutModal;
