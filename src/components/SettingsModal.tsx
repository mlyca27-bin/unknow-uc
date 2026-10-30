import React, { useState } from 'react';
import { X, CheckCircle2, RotateCcw, CreditCard, Shield, Sliders, User, Clock } from 'lucide-react';
import { AppSettings, PaymentResultType } from '../types/store';
import { DEFAULT_SETTINGS } from '../data/catalog';
import { sound } from '../utils/audio';
import { formatCurrentTimeDate } from '../utils/datetime';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onSaveSettings: (newSettings: AppSettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
}) => {
  const [localSettings, setLocalSettings] = useState<AppSettings>(settings);
  const [savedNotice, setSavedNotice] = useState(false);

  // Sync state if reopened
  React.useEffect(() => {
    setLocalSettings(settings);
    setSavedNotice(false);
  }, [isOpen, settings]);

  if (!isOpen) return null;

  const handleSave = () => {
    sound.playClick();
    onSaveSettings(localSettings);
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 600);
  };

  const handleReset = () => {
    sound.playClick();
    setLocalSettings(DEFAULT_SETTINGS);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#101c44] border-2 border-[#ffcc00] rounded-2xl shadow-[0_0_35px_rgba(255,204,0,0.3)] overflow-hidden my-6">
        {/* Header */}
        <div className="bg-[#0b1435] border-b border-[#2a3d7a] px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#ffcc00]" />
            <h2 className="text-xl font-extrabold uppercase tracking-wider text-[#ffcc00]">
              ⚙️ SETTINGS & CONTROL PANEL
            </h2>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#1a2d6a] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-5 max-h-[80vh] overflow-y-auto text-slate-200 text-sm">
          {savedNotice && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-500 text-emerald-300 rounded-xl flex items-center gap-2 font-bold animate-pulse">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>✅ Settings Save Ho Gai! Changes applied instantly.</span>
            </div>
          )}

          {/* Section 1: Username Set */}
          <div className="bg-[#09112e] p-4 rounded-xl border border-[#273a77]">
            <label className="text-amber-300 font-extrabold text-sm flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-amber-400" />
              <span>1️⃣ 👤 Username Set Karo:</span>
            </label>
            <input
              type="text"
              id="setUsername"
              value={localSettings.username}
              onChange={(e) => setLocalSettings({ ...localSettings, username: e.target.value })}
              placeholder="Ex: MY SHOP NAME / BINRAO GAMING"
              className="w-full bg-[#030717] border border-[#2a3d7a] rounded-lg px-3.5 py-2.5 text-white font-bold placeholder-slate-500 focus:outline-none focus:border-[#ffcc00] focus:ring-1 focus:ring-[#ffcc00] transition-colors"
            />
            <p className="text-xs text-slate-400 mt-1.5">
              Live preview aur order receipts mein yehi shop/player name show hoga.
            </p>
          </div>

          {/* Section 2: Payment Result Select */}
          <div className="bg-[#09112e] p-4 rounded-xl border border-[#273a77]">
            <label className="text-amber-300 font-extrabold text-sm flex items-center gap-2 mb-2">
              <CreditCard className="w-4 h-4 text-amber-400" />
              <span>2️⃣ 💳 Payment Result Select Karo:</span>
            </label>
            <select
              id="setPaymentResult"
              value={localSettings.paymentResult}
              onChange={(e) =>
                setLocalSettings({ ...localSettings, paymentResult: e.target.value as PaymentResultType })
              }
              className="w-full bg-[#030717] border border-[#2a3d7a] rounded-lg px-3.5 py-2.5 text-white font-bold focus:outline-none focus:border-[#ffcc00] focus:ring-1 focus:ring-[#ffcc00] transition-colors cursor-pointer"
            >
              <option value="success" className="bg-[#09112e] text-emerald-400">
                ✅ SUCCESS - Payment Successful (UC sent to mailbox)
              </option>
              <option value="failed" className="bg-[#09112e] text-red-400">
                ❌ FAILED - Payment Failed (Transaction declined)
              </option>
              <option value="pending" className="bg-[#09112e] text-amber-400">
                ⏳ PENDING - Payment Pending (Waiting for confirmation)
              </option>
            </select>
            <p className="text-xs text-slate-400 mt-1.5">
              Select what result the checkout simulation popup should produce.
            </p>

            {/* SETTING ME YE ADD KARO - Quick Status & Update Time Block */}
            <div
              style={{
                marginTop: '10px',
                background: '#101c44',
                padding: '10px',
                borderRadius: '10px',
                border: '1px solid #2a3d7a',
              }}
              className="flex items-center justify-between gap-2"
            >
              <select
                id="statusSelect"
                value={localSettings.paymentResult === 'success' ? 'success' : 'failed'}
                onChange={(e) => {
                  sound.playClick();
                  const val = e.target.value as PaymentResultType;
                  setLocalSettings({
                    ...localSettings,
                    paymentResult: val,
                    customTimeDate: formatCurrentTimeDate(),
                  });
                }}
                style={{
                  width: '48%',
                  padding: '8px',
                  borderRadius: '6px',
                  background: '#000',
                  color: '#fff',
                  border: '1px solid #333',
                  fontWeight: 700,
                  fontSize: '13px',
                }}
              >
                <option value="failed">FAILED</option>
                <option value="success">SUCCESS</option>
              </select>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setLocalSettings({
                    ...localSettings,
                    customTimeDate: formatCurrentTimeDate(),
                  });
                }}
                style={{
                  width: '48%',
                  padding: '8px',
                  borderRadius: '6px',
                  background: '#ffcc00',
                  color: '#000',
                  border: 'none',
                  fontWeight: 800,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
                className="hover:bg-amber-400 active:scale-95 transition-all"
              >
                Update Time
              </button>
            </div>
            {localSettings.customTimeDate && (
              <div className="text-[11px] text-[#ffcc00] font-mono text-right mt-1">
                Timestamp: <b>{localSettings.customTimeDate}</b>
              </div>
            )}
          </div>

          {/* Section 3: Payment Methods ON/OFF & Last 4 Digits */}
          <div className="bg-[#09112e] p-4 rounded-xl border border-[#273a77] space-y-3">
            <div className="flex items-center justify-between border-b border-[#1f2f63] pb-2">
              <label className="text-amber-300 font-extrabold text-sm flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-amber-400" />
                <span>3️⃣ 💳 Payment Methods ON/OFF & Card Last 4 Digits:</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Visa Card */}
              <div className="p-3 bg-[#0e173b] rounded-lg border border-[#223366] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-400 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                    Visa
                  </span>
                  <select
                    value={localSettings.cards.visa.enabled ? 'on' : 'off'}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        cards: {
                          ...localSettings.cards,
                          visa: { ...localSettings.cards.visa, enabled: e.target.value === 'on' },
                        },
                      })
                    }
                    className="bg-[#030717] border border-[#2a3d7a] text-xs font-bold text-white rounded px-2 py-1"
                  >
                    <option value="on">Visa ON</option>
                    <option value="off">Visa OFF</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Visa last 4 digits:</label>
                  <input
                    type="text"
                    maxLength={4}
                    value={localSettings.cards.visa.last4}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        cards: {
                          ...localSettings.cards,
                          visa: { ...localSettings.cards.visa, last4: e.target.value.replace(/\D/g, '') },
                        },
                      })
                    }
                    placeholder="2343"
                    className="w-full bg-[#030717] border border-[#2a3d7a] rounded px-2.5 py-1 text-xs text-white font-mono"
                  />
                </div>
              </div>

              {/* Master Card */}
              <div className="p-3 bg-[#0e173b] rounded-lg border border-[#223366] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-orange-400 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                    MasterCard
                  </span>
                  <select
                    value={localSettings.cards.master.enabled ? 'on' : 'off'}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        cards: {
                          ...localSettings.cards,
                          master: { ...localSettings.cards.master, enabled: e.target.value === 'on' },
                        },
                      })
                    }
                    className="bg-[#030717] border border-[#2a3d7a] text-xs font-bold text-white rounded px-2 py-1"
                  >
                    <option value="on">Master ON</option>
                    <option value="off">Master OFF</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Master last 4 digits:</label>
                  <input
                    type="text"
                    maxLength={4}
                    value={localSettings.cards.master.last4}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        cards: {
                          ...localSettings.cards,
                          master: { ...localSettings.cards.master, last4: e.target.value.replace(/\D/g, '') },
                        },
                      })
                    }
                    placeholder="9921"
                    className="w-full bg-[#030717] border border-[#2a3d7a] rounded px-2.5 py-1 text-xs text-white font-mono"
                  />
                </div>
              </div>

              {/* Amex Card */}
              <div className="p-3 bg-[#0e173b] rounded-lg border border-[#223366] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
                    Amex (American Express)
                  </span>
                  <select
                    value={localSettings.cards.amex.enabled ? 'on' : 'off'}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        cards: {
                          ...localSettings.cards,
                          amex: { ...localSettings.cards.amex, enabled: e.target.value === 'on' },
                        },
                      })
                    }
                    className="bg-[#030717] border border-[#2a3d7a] text-xs font-bold text-white rounded px-2 py-1"
                  >
                    <option value="on">Amex ON</option>
                    <option value="off">Amex OFF</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Amex last 4 digits:</label>
                  <input
                    type="text"
                    maxLength={4}
                    value={localSettings.cards.amex.last4}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        cards: {
                          ...localSettings.cards,
                          amex: { ...localSettings.cards.amex, last4: e.target.value.replace(/\D/g, '') },
                        },
                      })
                    }
                    placeholder="6512"
                    className="w-full bg-[#030717] border border-[#2a3d7a] rounded px-2.5 py-1 text-xs text-white font-mono"
                  />
                </div>
              </div>

              {/* Golden VIP Card */}
              <div className="p-3 bg-[#17150a] rounded-lg border border-amber-600/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#ffcc00]"></span>
                    Golden VIP Card
                  </span>
                  <select
                    value={localSettings.cards.golden.enabled ? 'on' : 'off'}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        cards: {
                          ...localSettings.cards,
                          golden: { ...localSettings.cards.golden, enabled: e.target.value === 'on' },
                        },
                      })
                    }
                    className="bg-[#030717] border border-amber-600/50 text-xs font-bold text-amber-300 rounded px-2 py-1"
                  >
                    <option value="on">Golden ON</option>
                    <option value="off">Golden OFF</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-amber-200/80 block mb-1">Golden last 4 digits:</label>
                  <input
                    type="text"
                    maxLength={4}
                    value={localSettings.cards.golden.last4}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        cards: {
                          ...localSettings.cards,
                          golden: { ...localSettings.cards.golden, last4: e.target.value.replace(/\D/g, '') },
                        },
                      })
                    }
                    placeholder="1234"
                    className="w-full bg-[#030717] border border-amber-600/50 rounded px-2.5 py-1 text-xs text-amber-300 font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 4 & 5: Security CVC & Timer Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* CVC Toggle */}
            <div className="bg-[#09112e] p-4 rounded-xl border border-[#273a77]">
              <label className="text-amber-300 font-extrabold text-sm flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-amber-400" />
                <span>4️⃣ 🔒 CVC Verification:</span>
              </label>
              <select
                value={localSettings.cvcEnabled ? 'on' : 'off'}
                onChange={(e) => setLocalSettings({ ...localSettings, cvcEnabled: e.target.value === 'on' })}
                className="w-full bg-[#030717] border border-[#2a3d7a] rounded-lg px-3 py-2 text-white font-bold"
              >
                <option value="on">CVC Prompt ON (Requires 3 digits)</option>
                <option value="off">CVC Prompt OFF (Direct Checkout)</option>
              </select>
            </div>

            {/* Countdown seconds */}
            <div className="bg-[#09112e] p-4 rounded-xl border border-[#273a77]">
              <label className="text-amber-300 font-extrabold text-sm flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>5️⃣ ⏱️ Loading Timer:</span>
              </label>
              <select
                value={localSettings.countdownSeconds}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, countdownSeconds: Number(e.target.value) })
                }
                className="w-full bg-[#030717] border border-[#2a3d7a] rounded-lg px-3 py-2 text-white font-bold"
              >
                <option value={3}>3 Seconds (Fast)</option>
                <option value={6}>6 Seconds (Realistic)</option>
                <option value={10}>10 Seconds (Standard)</option>
                <option value={15}>15 Seconds (Original Demo)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-[#0b1435] border-t border-[#2a3d7a] px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#142352] text-slate-300 hover:text-white hover:bg-[#1a2d6a] border border-[#263a75] font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg bg-[#152042] text-slate-300 hover:bg-[#1e2e5c] font-bold text-xs cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg bg-gradient-to-r from-amber-400 to-[#ffcc00] text-slate-950 hover:from-amber-300 hover:to-amber-400 font-extrabold text-sm shadow-[0_0_15px_rgba(255,204,0,0.4)] transition-all cursor-pointer"
            >
              ✅ SAVE SETTINGS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
