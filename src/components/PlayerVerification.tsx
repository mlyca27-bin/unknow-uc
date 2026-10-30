import React, { useState } from 'react';
import { Gamepad2, CheckCircle, HelpCircle, Sparkles, Copy, Check, Clock, RefreshCw } from 'lucide-react';
import { PaymentResultType } from '../types/store';
import { sound } from '../utils/audio';
import { DestinationStatusBox } from './DestinationStatusBox';

interface PlayerVerificationProps {
  uid: string;
  onUidChange: (val: string) => void;
  savedUsername: string;
  paymentResult: PaymentResultType;
  onSelectPreset: (uid: string) => void;
  region?: string;
  onSelectRegion?: (region: string) => void;
  timeDate: string;
  onUpdateTime?: () => void;
}

export const PlayerVerification: React.FC<PlayerVerificationProps> = ({
  uid,
  onUidChange,
  savedUsername,
  paymentResult,
  onSelectPreset,
  region = 'Global / Asia',
  onSelectRegion,
  timeDate,
  onUpdateTime,
}) => {
  const [showGuide, setShowGuide] = useState(false);
  const [copied, setCopied] = useState(false);

  const presets = [
    { label: '5123456783 (BINRAO 876)', uid: '5123456783' },
    { label: '5123456789', uid: '5123456789' },
    { label: '5829104821', uid: '5829104821' },
    { label: '5991827364', uid: '5991827364' },
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    sound.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  const currentUsername = savedUsername || 'BINRAO 876';

  return (
    <div className="bg-[#101c44] border border-[#2a3d7a] rounded-2xl p-4 sm:p-5 shadow-xl shadow-black/40">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <label
          htmlFor="pubgUid"
          className="text-white font-extrabold text-sm sm:text-base flex items-center gap-2"
        >
          <Gamepad2 className="w-5 h-5 text-[#ffcc00]" />
          <span>🎮 UID / Number Enter Karo:</span>
        </label>
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setShowGuide(!showGuide);
          }}
          className="text-xs text-amber-300 hover:text-amber-200 flex items-center gap-1 font-semibold cursor-pointer underline underline-offset-4 decoration-amber-500/50"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Where to find UID?</span>
        </button>
      </div>

      {/* Input row */}
      <div className="relative">
        <input
          type="number"
          id="pubgUid"
          value={uid}
          onChange={(e) => onUidChange(e.target.value)}
          placeholder="5123456783"
          className="w-full bg-[#000000] border-2 border-[#2a3d7a] focus:border-[#ffcc00] focus:ring-2 focus:ring-[#ffcc00]/30 rounded-xl px-4 py-3.5 text-white font-mono font-bold text-lg sm:text-xl tracking-wider placeholder-slate-600 focus:outline-none transition-all"
        />
        {uid.length >= 8 && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-1 rounded-full border border-emerald-500/40 font-bold">
            <CheckCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">VERIFIED</span>
          </div>
        )}
      </div>

      {/* Quick Test Preset Buttons */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5 sm:gap-2">
        <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1 mr-1">
          <Sparkles className="w-3 h-3 text-amber-400" />
          Quick Test:
        </span>
        {presets.map((p) => (
          <button
            key={p.uid}
            type="button"
            onClick={() => {
              sound.playClick();
              onSelectPreset(p.uid);
            }}
            className={`text-xs px-2.5 py-1 rounded-lg border font-mono transition-all cursor-pointer ${
              uid === p.uid
                ? 'bg-amber-500 text-slate-950 font-black border-amber-300 shadow-[0_0_8px_rgba(255,204,0,0.5)]'
                : 'bg-[#08102a] text-slate-300 border-[#223366] hover:border-amber-400 hover:text-white'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* UID VERIFY BOX - WITHOUT LEVEL & RANK - FINAL (Matches User's Exact Specification) */}
      {uid.trim() !== '' && (
        <div
          className="verify-box bg-[#000000] border border-dashed border-[#ffcc00] rounded-xl p-3.5 sm:p-4 mt-3.5 font-sans transition-all animate-fadeIn"
          style={{
            background: '#000000',
            border: '1px dashed #ffcc00',
            borderRadius: '12px',
            padding: '14px',
            fontFamily: 'sans-serif',
            marginTop: '12px',
          }}
        >
          {/* Header with Account Verified & Region */}
          <div className="flex justify-between items-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="flex items-center gap-1.5 text-[#00ff88] font-extrabold text-[13px]" style={{ color: '#00ff88', fontWeight: 800, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>✅</span>
              <span>Account Verified</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <span
                className="bg-[#1a2d6a] text-[#aab4d0] text-[11px] font-semibold px-2 py-1 rounded-md"
                style={{ background: '#1a2d6a', color: '#aab4d0', fontSize: '11px', padding: '4px 8px', borderRadius: '6px' }}
              >
                {region}
              </span>
              {onSelectRegion && (
                <select
                  value={region}
                  onChange={(e) => onSelectRegion(e.target.value)}
                  className="bg-[#0e1c44] text-[#aab4d0] text-[10px] border border-[#273a78] rounded px-1.5 py-0.5 cursor-pointer focus:outline-none"
                  title="Change Server Region"
                >
                  <option value="Global / Asia">Global / Asia</option>
                  <option value="Middle East">Middle East</option>
                  <option value="Europe">Europe</option>
                  <option value="North America">North America</option>
                </select>
              )}
            </div>
          </div>

          {/* Divider Line */}
          <div className="border-t border-[#222222] my-2.5" style={{ borderTop: '1px solid #222', margin: '10px 0' }} />

          {/* UID */}
          <div className="text-[#8e9ac0] text-[12px] flex items-center justify-between" style={{ color: '#8e9ac0', fontSize: '12px' }}>
            <div>
              UID: <b id="showUid" className="text-white font-mono font-bold" style={{ color: '#fff' }}>{uid}</b>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(uid)}
              title="Copy UID"
              className="p-1 text-slate-500 hover:text-amber-400 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#00ff88]" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Username */}
          <div className="text-[#8e9ac0] text-[12px] mt-1" style={{ color: '#8e9ac0', fontSize: '12px', marginTop: '4px' }}>
            Username: <b id="showUser" className="text-[#ffcc00] font-bold" style={{ color: '#ffcc00' }}>{currentUsername}</b>
          </div>

          {/* Payment Mode Badge (No Level or Rank) */}
          <div className="text-[#8e9ac0] text-[12px] mt-1.5 flex items-center gap-2" style={{ color: '#8e9ac0', fontSize: '12px', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Payment Mode:</span>
            {paymentResult === 'failed' && (
              <span
                className="fail-badge"
                style={{
                  background: '#4a0a1a',
                  color: '#ff3333',
                  border: '1px solid #ff3333',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 700,
                }}
              >
                ❌ FAILED
              </span>
            )}
            {paymentResult === 'success' && (
              <span
                style={{
                  background: '#07331e',
                  color: '#00ff88',
                  border: '1px solid #00ff88',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 700,
                }}
              >
                ✅ SUCCESS
              </span>
            )}
            {paymentResult === 'pending' && (
              <span
                style={{
                  background: '#3d2b00',
                  color: '#ffcc00',
                  border: '1px solid #ffcc00',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 700,
                }}
              >
                ⏳ PENDING
              </span>
            )}
          </div>
        </div>
      )}

      {/* DESTINATION UID + SUCCESS/FAILED + TIME DATE BOX (Matches User's Exact Specification) */}
      {uid.trim() !== '' && (
        <div className="animate-fadeIn">
          <DestinationStatusBox
            uid={uid}
            shopName={currentUsername}
            status={paymentResult}
            timeDate={timeDate}
          />
          {onUpdateTime && (
            <div className="flex justify-end mt-1">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onUpdateTime();
                }}
                className="text-[11px] text-amber-300 hover:text-amber-200 flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#101c44] border border-[#273a77] hover:border-amber-400 font-bold transition-all cursor-pointer"
              >
                <RefreshCw className="w-3 h-3 text-amber-400" />
                <span>Update Time</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Guide Accordion */}
      {showGuide && (
        <div className="mt-3 bg-[#0a1438] border border-[#273d7e] rounded-xl p-3.5 text-xs text-slate-300 space-y-2">
          <p className="font-bold text-amber-300 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            PUBG Character ID (UID) Kaise Dhundein:
          </p>
          <ol className="list-decimal list-inside space-y-1 text-slate-300 text-xs">
            <li>Apne mobile par <b>PUBG Mobile</b> open karein.</li>
            <li>Main lobby screen par top-left corner mein apni <b>Profile Picture / Avatar</b> par tap karein.</li>
            <li>Profile page par <b>Character ID</b> (9 se 11 digits ka number) show hoga.</li>
            <li>ID ke sath bane <b>Copy icon</b> par tap karke yahan paste karein.</li>
          </ol>
        </div>
      )}
    </div>
  );
};
