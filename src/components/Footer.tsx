import React from 'react';
import { ShieldCheck, Zap, Lock, Headphones, RefreshCw } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 bg-[#04091c] border-t border-[#182759] text-slate-400 text-xs">
      {/* Trust Badges */}
      <div className="max-w-5xl mx-auto px-4 py-8 border-b border-[#121f47]">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 rounded-xl bg-[#08102a] border border-[#1b2b5f] flex flex-col items-center">
            <Zap className="w-5 h-5 text-amber-400 mb-1.5" />
            <span className="font-bold text-white text-xs">Instant UC Dispatch</span>
            <span className="text-[11px] text-slate-400">Direct to in-game mail</span>
          </div>
          <div className="p-3 rounded-xl bg-[#08102a] border border-[#1b2b5f] flex flex-col items-center">
            <ShieldCheck className="w-5 h-5 text-emerald-400 mb-1.5" />
            <span className="font-bold text-white text-xs">100% Anti-Ban Safe</span>
            <span className="text-[11px] text-slate-400">Official API Protocol</span>
          </div>
          <div className="p-3 rounded-xl bg-[#08102a] border border-[#1b2b5f] flex flex-col items-center">
            <Lock className="w-5 h-5 text-cyan-400 mb-1.5" />
            <span className="font-bold text-white text-xs">256-Bit SSL Secured</span>
            <span className="text-[11px] text-slate-400">Card & Crypto Protected</span>
          </div>
          <div className="p-3 rounded-xl bg-[#08102a] border border-[#1b2b5f] flex flex-col items-center">
            <Headphones className="w-5 h-5 text-orange-400 mb-1.5" />
            <span className="font-bold text-white text-xs">24/7 Fast Support</span>
            <span className="text-[11px] text-slate-400">Dedicated assistance</span>
          </div>
        </div>
      </div>

      {/* Developer by BinRao Section (sab se neche - exactly as requested) */}
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col items-center justify-center text-center space-y-3">
        {/* Prominent Developer Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-orange-500/10 border-2 border-[#ffcc00] shadow-[0_0_20px_rgba(255,204,0,0.3)]">
          <Zap className="w-4 h-4 text-[#ffcc00] fill-current" />
          <span className="text-white font-extrabold text-sm tracking-widest uppercase">
            Developed by <span className="text-[#ffcc00] drop-shadow-[0_0_8px_#ffcc00]">BinRao</span>
          </span>
          <span className="text-[10px] bg-[#ffcc00] text-black font-black px-1.5 py-0.5 rounded uppercase">
            Official
          </span>
        </div>

        <p className="text-slate-400 max-w-lg text-[11px] leading-relaxed">
          PUBG Mobile is a registered trademark of Krafton Inc. and Level Infinite. This platform operates as an authorized UID verification top-up simulation portal.
        </p>

        <div className="text-[11px] text-slate-500 flex flex-wrap items-center justify-center gap-3 font-semibold">
          <span>© 2026 UC Store by BinRao</span>
          <span>•</span>
          <span>All Rights Reserved</span>
          <span>•</span>
          <span className="text-amber-400">Version 2.4.0 Live</span>
        </div>
      </div>
    </footer>
  );
};
