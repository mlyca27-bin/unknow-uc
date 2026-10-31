import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PlayerVerification } from './components/PlayerVerification';
import { ProductCatalog } from './components/ProductCatalog';
import { SettingsModal } from './components/SettingsModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { Footer } from './components/Footer';
import { AppSettings, OrderRecord, UCPackage } from './types/store';
import { DEFAULT_SETTINGS, UC_PACKAGES } from './data/catalog';
import { sound } from './utils/audio';
import { formatCurrentTimeDate } from './utils/datetime';
import { AlertCircle, Shield, Sparkles } from 'lucide-react';

export default function App() {
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const s = localStorage.getItem('pubg_uc_settings');
      if (s) return JSON.parse(s);
    } catch {}
    return DEFAULT_SETTINGS;
  });
  const [uid, setUid] = useState(() => localStorage.getItem('pubg_uc_uid') || '5123456783');
  const [region, setRegion] = useState(() => localStorage.getItem('pubg_uc_region') || 'Global / Asia');
  const [timeDate, setTimeDate] = useState<string>(() => {
    try { return settings.customTimeDate || formatCurrentTimeDate(); } 
    catch { return formatCurrentTimeDate(); }
  });
  const [currency, setCurrency] = useState(() => localStorage.getItem('pubg_uc_currency') || 'AED');
  const [soundEnabled, setSoundEnabled] = useState(settings.soundEnabled ?? true);
  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const o = localStorage.getItem('pubg_uc_orders');
      if (o) return JSON.parse(o);
    } catch {}
    return [{ id: 'ORD-781923', timestamp: '10:14 AM', uid: '5123456789', username: 'BinRao_OP', packTitle: '40500 UC (BEST)', totalUC: 40500, price: 1649, currency: 'AED', cardName: 'Golden VIP Card', cardLast4: '1234', status: 'success', txHash: 'TX-PUBG-8910AB' } as any];
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [selectedPackForCheckout, setSelectedPackForCheckout] = useState<UCPackage | null>(null);
  const [uidAlert, setUidAlert] = useState<string | null>(null);

  useEffect(() => { try { localStorage.setItem('pubg_uc_settings', JSON.stringify(settings)); } catch {} }, [settings]);
  useEffect(() => { try { localStorage.setItem('pubg_uc_orders', JSON.stringify(orders)); } catch {} }, [orders]);
  useEffect(() => { localStorage.setItem('pubg_uc_currency', currency); }, [currency]);
  useEffect(() => { localStorage.setItem('pubg_uc_uid', uid); }, [uid]);
  useEffect(() => { localStorage.setItem('pubg_uc_region', region); }, [region]);

  const handleUpdateTime = () => {
    const u = formatCurrentTimeDate();
    setTimeDate(u);
    setSettings((p) => ({ ...p, customTimeDate: u } as any));
  };
  const handleSaveSettings = (ns: AppSettings) => {
    setSettings(ns);
    if ((ns as any).customTimeDate) setTimeDate((ns as any).customTimeDate);
    setSoundEnabled(ns.soundEnabled);
  };
  const handleToggleSound = () => {
    const n = !soundEnabled;
    setSoundEnabled(n);
    setSettings((p) => ({ ...p, soundEnabled: n }));
    try { if (n) sound.playClick(); } catch {}
  };
  const handleSelectPack = (pack: UCPackage) => {
    if (!uid.trim()) {
      try { sound.playFailed(); } catch {}
      setUidAlert('⚠️ Pehle UID lagao! Please enter your Character UID first.');
      return;
    }
    setUidAlert(null);
    setSelectedPackForCheckout(pack);
  };
  const handleOrderCompleted = (no: OrderRecord) => setOrders((prev) => [no, ...prev]);
  const handleClearHistory = () => setOrders([]);

  return (
    <div className="min-h-screen bg-[#050b1e] text-slate-100 flex flex-col font-sans">
      <Header onOpenSettings={() => { try{ sound.playClick(); }catch{} setIsSettingsOpen(true); }} onOpenHistory={() => { try{ sound.playClick(); }catch{} setIsHistoryOpen(true); }} currency={currency} onChangeCurrency={(c) => { try{ sound.playClick(); }catch{} setCurrency(c); }} soundEnabled={soundEnabled} onToggleSound={handleToggleSound} orderCount={orders.length} />
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 py-5 space-y-5">
        {uidAlert && <div className="bg-red-950 border-2 border-red-500 text-red-200 px-4 py-3 rounded-xl flex items-center gap-2 font-bold text-sm"><AlertCircle className="w-5 h-5" />{uidAlert}<button onClick={() => setUidAlert(null)} className="ml-auto bg-red-800 px-3 py-1 rounded-lg">OK</button></div>}
        <div className="rounded-2xl bg-gradient-to-r from-[#0c1b48] via-[#14296b] to-[#0c1b48] border border-[#233878] p-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-black uppercase"><Sparkles className="w-3.5 h-3.5" />Season Special • 3 Games</div>
          <h2 className="text-2xl font-black text-white mt-2">INSTANT TOP-UP PORTAL • PUBG UC • FREE FIRE • YALLA LUDO</h2>
        </div>
        <PlayerVerification uid={uid} onUidChange={(v) => { setUid(v); if (v.trim()) setUidAlert(null); }} savedUsername={settings.username} paymentResult={settings.paymentResult} region={region} onSelectRegion={setRegion} timeDate={timeDate} onUpdateTime={handleUpdateTime} onSelectPreset={(pUid) => { setUid(pUid); setUidAlert(null); }} />
        <ProductCatalog packages={UC_PACKAGES} currency={currency} onSelectPack={handleSelectPack} />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-[#0a122e] border border-[#1b2b5d] rounded-xl p-3 flex items-center gap-3"><div className="font-bold text-white">Instant UID Delivery</div></div>
          <div className="bg-[#0a122e] border border-[#1b2b5d] rounded-xl p-3 flex items-center gap-3"><Shield className="w-4 h-4 text-emerald-400" /><div className="font-bold text-white">100% Anti-Ban</div></div>
          <div className="bg-[#0a122e] border border-[#1b2b5d] rounded-xl p-3 flex items-center gap-3"><div className="font-bold text-white">Multi-Card & Golden VIP</div></div>
        </div>
      </main>
      <Footer />
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} settings={settings} onSaveSettings={handleSaveSettings} />
      <CheckoutModal isOpen={selectedPackForCheckout !== null} onClose={() => setSelectedPackForCheckout(null)} selectedPack={selectedPackForCheckout} uid={uid} savedUsername={settings.username} settings={settings} currency={currency} onOrderCompleted={handleOrderCompleted} />
      <OrderHistoryModal isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} orders={orders} onClearHistory={handleClearHistory} />
    </div>
  );
}
