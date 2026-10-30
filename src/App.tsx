import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PlayerVerification } from './components/PlayerVerification';
import { ProductCatalog } from './components/ProductCatalog';
import { SettingsModal } from './components/SettingsModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { Footer } from './components/Footer';
import { AppSettings, OrderRecord, PlayerProfile, UCPackage } from './types/store';
import { DEFAULT_SETTINGS, PRESET_PLAYERS, UC_PACKAGES } from './data/catalog';
import { sound } from './utils/audio';
import { formatCurrentTimeDate } from './utils/datetime';
import { AlertCircle, Zap, Shield, Sparkles } from 'lucide-react';

export default function App() {
  // Load settings from localStorage
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const stored = localStorage.getItem('pubg_uc_settings');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback
    }
    return DEFAULT_SETTINGS;
  });

  // State for UID & Region
  const [uid, setUid] = useState<string>(() => {
    return localStorage.getItem('pubg_uc_uid') || '5123456783';
  });
  const [region, setRegion] = useState<string>(() => {
    return localStorage.getItem('pubg_uc_region') || 'Global / Asia';
  });

  // Time Date (e.g. 29-10-2026 11:32 PM)
  const [timeDate, setTimeDate] = useState<string>(() => {
    return settings.customTimeDate || formatCurrentTimeDate();
  });

  // Currency
  const [currency, setCurrency] = useState<string>(() => {
    return localStorage.getItem('pubg_uc_currency') || 'AED';
  });

  // Sound enabled
  const [soundEnabled, setSoundEnabled] = useState<boolean>(settings.soundEnabled ?? true);

  // Orders list
  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const stored = localStorage.getItem('pubg_uc_orders');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback
    }
    return [
      {
        id: 'ORD-781923',
        timestamp: '10:14 AM',
        uid: '5123456789',
        username: 'BinRao_OP',
        packTitle: '40500 UC (BEST)',
        totalUC: 40500,
        price: 1649,
        currency: 'AED',
        cardName: 'Golden VIP Card',
        cardLast4: '1234',
        status: 'success',
        txHash: 'TX-PUBG-8910AB',
      },
    ];
  });

  // Modals state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [selectedPackForCheckout, setSelectedPackForCheckout] = useState<UCPackage | null>(null);
  const [uidAlert, setUidAlert] = useState<string | null>(null);

  // Sync settings changes to localStorage
  useEffect(() => {
    localStorage.setItem('pubg_uc_settings', JSON.stringify(settings));
  }, [settings]);

  // Sync orders to localStorage
  useEffect(() => {
    localStorage.setItem('pubg_uc_orders', JSON.stringify(orders));
  }, [orders]);

  // Sync currency to localStorage
  useEffect(() => {
    localStorage.setItem('pubg_uc_currency', currency);
  }, [currency]);

  // Sync UID & Region to localStorage
  useEffect(() => {
    localStorage.setItem('pubg_uc_uid', uid);
  }, [uid]);

  useEffect(() => {
    localStorage.setItem('pubg_uc_region', region);
  }, [region]);

  useEffect(() => {
    if (settings.customTimeDate) {
      setTimeDate(settings.customTimeDate);
    }
  }, [settings.customTimeDate]);

  const handleUpdateTime = () => {
    const updated = formatCurrentTimeDate();
    setTimeDate(updated);
    setSettings((prev) => ({ ...prev, customTimeDate: updated }));
  };

  const handleSaveSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    if (newSettings.customTimeDate) {
      setTimeDate(newSettings.customTimeDate);
    }
    setSoundEnabled(newSettings.soundEnabled);
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    setSettings((prev) => ({ ...prev, soundEnabled: next }));
    if (next) sound.playClick();
  };

  const handleSelectPack = (pack: UCPackage) => {
    if (!uid.trim()) {
      sound.playFailed();
      setUidAlert('⚠️ Pehle UID lagao! Please enter your Character UID first.');
      const el = document.getElementById('pubgUid');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.focus();
      }
      return;
    }
    setUidAlert(null);
    setSelectedPackForCheckout(pack);
  };

  const handleOrderCompleted = (newOrder: OrderRecord) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const handleClearHistory = () => {
    setOrders([]);
  };

  return (
    <div className="min-h-screen bg-[#050b1e] text-slate-100 flex flex-col font-sans selection:bg-[#ffcc00] selection:text-black">
      {/* Top Header */}
      <Header
        onOpenSettings={() => {
          sound.playClick();
          setIsSettingsOpen(true);
        }}
        onOpenHistory={() => {
          sound.playClick();
          setIsHistoryOpen(true);
        }}
        currency={currency}
        onChangeCurrency={(c) => {
          sound.playClick();
          setCurrency(c);
        }}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        orderCount={orders.length}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-4 py-5 space-y-5">
        {/* Urgent UID Alert Banner if triggered */}
        {uidAlert && (
          <div className="bg-red-950/80 border-2 border-red-500 text-red-200 px-4 py-3 rounded-xl flex items-center justify-between gap-3 shadow-lg shadow-red-950/50 animate-shake">
            <div className="flex items-center gap-2 font-bold text-sm">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              <span>{uidAlert}</span>
            </div>
            <button
              onClick={() => setUidAlert(null)}
              className="text-xs bg-red-800 hover:bg-red-700 text-white font-extrabold px-3 py-1 rounded-lg cursor-pointer"
            >
              OK
            </button>
          </div>
        )}

        {/* Hero Banner / Promo notice */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0c1b48] via-[#14296b] to-[#0c1b48] border border-[#233878] p-4 sm:p-6 shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1.5 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-black tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Season Special • Up To 35% Extra Bonus UC</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
                INSTANT PUBG MOBILE UC TOP-UP PORTAL
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Enter your Character UID, choose your package, and receive UC directly in your in-game mailbox in less than 60 seconds with anti-ban security.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="text-center px-4 py-2.5 rounded-xl bg-[#08102a]/80 border border-[#23356e]">
                <div className="text-xl font-black text-[#ffcc00]">100%</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Success Rate
                </div>
              </div>
              <div className="text-center px-4 py-2.5 rounded-xl bg-[#08102a]/80 border border-[#23356e]">
                <div className="text-xl font-black text-emerald-400">&lt;60s</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Dispatch Time
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 1. Character UID Input with Live Preview Box */}
        <section aria-label="Player UID Verification">
          <PlayerVerification
            uid={uid}
            onUidChange={(val) => {
              setUid(val);
              if (val.trim()) setUidAlert(null);
            }}
            savedUsername={settings.username}
            paymentResult={settings.paymentResult}
            region={region}
            onSelectRegion={setRegion}
            timeDate={timeDate}
            onUpdateTime={handleUpdateTime}
            onSelectPreset={(presetUid) => {
              setUid(presetUid);
              setUidAlert(null);
            }}
          />
        </section>

        {/* 2. Product Catalog */}
        <section aria-label="PUBG UC Packages">
          <ProductCatalog
            packages={UC_PACKAGES}
            currency={currency}
            onSelectPack={handleSelectPack}
          />
        </section>

        {/* Fast Features & Assurance Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-[#0a122e] border border-[#1b2b5d] rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center font-bold">
              ⚡
            </div>
            <div>
              <div className="font-bold text-white">Instant UID Delivery</div>
              <div className="text-slate-400 text-[11px]">No login credentials or password required</div>
            </div>
          </div>
          <div className="bg-[#0a122e] border border-[#1b2b5d] rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-400/10 text-emerald-400 flex items-center justify-center font-bold">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white">100% Anti-Ban Guarantee</div>
              <div className="text-slate-400 text-[11px]">Direct official API dispatch algorithm</div>
            </div>
          </div>
          <div className="bg-[#0a122e] border border-[#1b2b5d] rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-400/10 text-blue-400 flex items-center justify-center font-bold">
              💳
            </div>
            <div>
              <div className="font-bold text-white">Multi-Card & Golden VIP</div>
              <div className="text-slate-400 text-[11px]">Configurable simulator in top ⚙️ Setting</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer (Developer by BinRao sab se neche) */}
      <Footer />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSaveSettings={handleSaveSettings}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={selectedPackForCheckout !== null}
        onClose={() => setSelectedPackForCheckout(null)}
        selectedPack={selectedPackForCheckout}
        uid={uid}
        savedUsername={settings.username}
        settings={settings}
        currency={currency}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Order History Modal */}
      <OrderHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        orders={orders}
        onClearHistory={handleClearHistory}
      />
    </div>
  );
}
