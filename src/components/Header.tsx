import React, { useState } from 'react';
import { Settings as SettingsIcon, Volume2, VolumeX, History, Globe, ShieldCheck, Menu, X } from 'lucide-react';
import { CURRENCIES } from '../utils/currency';
import { UCLogo } from './UCLogo';
import { sound } from '../utils/audio';

interface HeaderProps {
  onOpenSettings: () => void;
  onOpenHistory: () => void;
  currency: string;
  onChangeCurrency: (curr: string) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  orderCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSettings,
  onOpenHistory,
  currency,
  onChangeCurrency,
  soundEnabled,
  onToggleSound,
  orderCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#070e28]/95 backdrop-blur-md border-b border-[#1c2c62] shadow-xl">
      {/* Top Live Ticker Bar */}
      <div className="bg-[#0b173e] text-xs py-1.5 px-4 text-slate-300 border-b border-[#182755] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-bold text-emerald-400 text-[11px] tracking-wide">PUBG API LIVE</span>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span className="text-slate-300 text-[11px] hidden sm:inline">Direct In-Game Mailbox Dispatch: &lt;60s</span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1 text-amber-400 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Anti-Ban Verified</span>
          </span>
          <span className="text-slate-400 hidden md:inline">256-Bit SSL Secured</span>
        </div>
      </div>

      {/* Main Bar - Matches User's UNKNOW UC / Top Up Center Layout */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Brand / Logo (Matches User's Exact Specification) */}
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <UCLogo size={38} className="border-2 border-[#ffcc00] shadow-[0_0_10px_rgba(255,204,0,0.5)]" />
          </div>
          <div>
            <div className="text-white font-extrabold text-[15px] tracking-wider leading-none">
              UNKNOW UC
            </div>
            <div className="text-[#8e9ac0] text-[10px] font-semibold tracking-wide mt-0.5">
              Top Up Center
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Currency Selector */}
          <div className="relative hidden sm:flex items-center">
            <Globe className="w-3.5 h-3.5 text-amber-400 pointer-events-none absolute left-2.5" />
            <select
              value={currency}
              onChange={(e) => {
                sound.playClick();
                onChangeCurrency(e.target.value);
              }}
              aria-label="Select Currency"
              className="bg-[#101b44] text-amber-300 text-xs font-bold border border-[#273a77] rounded-lg py-1.5 pl-7 pr-3 hover:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer appearance-none"
            >
              {Object.keys(CURRENCIES).map((c) => (
                <option key={c} value={c} className="bg-[#0b1434] text-white">
                  {c} ({CURRENCIES[c].symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
            }}
            title={soundEnabled ? 'Mute SFX' : 'Enable SFX'}
            className="hidden sm:flex p-2 rounded-lg bg-[#101b44] border border-[#273a77] text-slate-300 hover:text-amber-400 hover:border-amber-400 transition-colors cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Orders History */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenHistory();
            }}
            className="hidden sm:flex relative items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#101b44] border border-[#273a77] text-slate-200 hover:border-amber-400 hover:text-amber-300 text-xs font-bold transition-colors cursor-pointer"
          >
            <History className="w-4 h-4 text-amber-400" />
            <span>Orders</span>
            {orderCount > 0 && (
              <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-extrabold bg-amber-500 text-slate-950 rounded-full">
                {orderCount}
              </span>
            )}
          </button>

          {/* Top Setting Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenSettings();
            }}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#1a2d6a] to-[#253d8c] text-white border border-[#ffcc00] hover:border-amber-300 hover:shadow-[0_0_12px_rgba(255,204,0,0.4)] text-xs sm:text-sm font-extrabold tracking-wide transition-all cursor-pointer transform active:scale-95"
          >
            <SettingsIcon className="w-4 h-4 text-[#ffcc00] animate-[spin_8s_linear_infinite]" />
            <span>⚙️ Setting</span>
          </button>

          {/* Mobile Hamburger Button (Matches User's "☰" icon in #ffcc00) */}
          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="sm:hidden text-[#ffcc00] text-xl p-1.5 rounded-lg hover:bg-[#101b44] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0a122e] border-t border-[#1a2a5d] px-4 py-3 space-y-2.5 animate-fadeIn">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-[#162450]">
            <span className="text-slate-400 font-semibold">Currency:</span>
            <select
              value={currency}
              onChange={(e) => {
                sound.playClick();
                onChangeCurrency(e.target.value);
              }}
              className="bg-[#101b44] text-amber-300 text-xs font-bold border border-[#273a77] rounded px-2 py-1"
            >
              {Object.keys(CURRENCIES).map((c) => (
                <option key={c} value={c} className="bg-[#0b1434] text-white">
                  {c} ({CURRENCIES[c].symbol})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between text-xs pb-2 border-b border-[#162450]">
            <span className="text-slate-400 font-semibold">Sound FX:</span>
            <button
              onClick={() => {
                onToggleSound();
              }}
              className="px-2.5 py-1 rounded bg-[#101b44] text-amber-300 font-bold border border-[#273a77] flex items-center gap-1.5"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{soundEnabled ? 'ON' : 'OFF'}</span>
            </button>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(false);
              onOpenHistory();
            }}
            className="w-full py-2 px-3 rounded-lg bg-[#101b44] border border-[#273a77] text-slate-200 text-xs font-bold flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <History className="w-4 h-4 text-amber-400" />
              <span>Order History & Receipts</span>
            </span>
            {orderCount > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] bg-amber-500 text-black font-black rounded-full">
                {orderCount}
              </span>
            )}
          </button>
        </div>
      )}
    </header>
  );
};
