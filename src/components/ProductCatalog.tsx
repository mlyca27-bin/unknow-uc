import React, { useState } from 'react';
import { Flame, Award, Sparkles } from 'lucide-react';
import { UCPackage } from '../types/store';
import { formatPrice } from '../utils/currency';
import { sound } from '../utils/audio';
import { UCLogo } from './UCLogo';

interface ProductCatalogProps {
  packages: UCPackage[];
  currency: string;
  onSelectPack: (pack: UCPackage) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  packages,
  currency,
  onSelectPack,
}) => {
  const [activeTab, setActiveTab] = useState<'custom' | 'all' | 'pass'>('custom');

  const filteredPacks = packages.filter((pkg) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'custom') return pkg.category === 'custom';
    if (activeTab === 'pass') return pkg.category === 'pass' || pkg.category === 'standard';
    return true;
  });

  return (
    <div
      className="uc-wrap"
      style={{
        background: '#080f2a',
        padding: '14px',
        borderRadius: '16px',
        fontFamily: 'sans-serif',
        marginTop: '10px',
        border: '1px solid #1c2c62',
      }}
    >
      {/* Catalog Header & Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 mb-3 border-b border-[#1b2a60]">
        <div className="flex items-center gap-2">
          <UCLogo size={28} />
          <div>
            <h2 className="text-white font-extrabold text-base sm:text-lg uppercase tracking-wide flex items-center gap-2">
              PUBG UC PACKS
              <span className="text-[10px] bg-[#ffcc00] text-black font-extrabold px-2 py-0.5 rounded-full">
                OFFICIAL
              </span>
            </h2>
            <p className="text-[11px] text-[#8e9ac0]">
              Select a pack to instantly top-up with bonus UC
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1.5 bg-[#04091d] p-1 rounded-xl border border-[#1e2f69] text-xs">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setActiveTab('custom');
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'custom'
                ? 'bg-[#ffcc00] text-black shadow-md font-extrabold'
                : 'text-slate-300 hover:text-white hover:bg-[#101c44]'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Bonus Deals</span>
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setActiveTab('all');
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#ffcc00] text-black shadow-md font-extrabold'
                : 'text-slate-300 hover:text-white hover:bg-[#101c44]'
            }`}
          >
            All Packs ({packages.length})
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setActiveTab('pass');
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'pass'
                ? 'bg-[#ffcc00] text-black shadow-md font-extrabold'
                : 'text-slate-300 hover:text-white hover:bg-[#101c44]'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Passes</span>
          </button>
        </div>
      </div>

      {/* uc-grid: display:grid; grid-template-columns: 1fr 1fr; gap:10px; */}
      <div className="uc-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
        {filteredPacks.map((pack) => {
          const isBest = pack.badge === 'BEST' || pack.highlightBorder;
          const isNew = pack.badge === 'NEW';

          return (
            <div
              key={pack.id}
              onClick={() => {
                sound.playClick();
                onSelectPack(pack);
              }}
              className="uc-c group cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/10"
              style={{
                background: 'linear-gradient(180deg, #1a2d6a 0%, #101a3f 100%)',
                border: isBest || isNew ? '2px solid #ffcc00' : '1px solid #263a75',
                borderRadius: '14px',
                padding: '12px 6px',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              {/* uc-badge */}
              <span
                className="uc-badge"
                style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  background: '#ffcc00',
                  color: '#000',
                  fontSize: '9px',
                  fontWeight: 800,
                  padding: '2px 6px',
                  borderRadius: '10px',
                }}
              >
                {pack.badge}
              </span>

              {/* uc-img (Round UC Coin Logo) */}
              <div
                className="uc-img transform group-hover:scale-105 transition-transform"
                style={{
                  width: '42px',
                  height: '42px',
                  margin: '0 auto',
                  borderRadius: '50%',
                  background: '#ffcc00',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                }}
              >
                <UCLogo size={40} />
              </div>

              {/* uc-base */}
              <div
                className="uc-base"
                style={{
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '14px',
                  marginTop: '6px',
                }}
              >
                {pack.baseUC > 0 && pack.bonusUC > 0 ? (
                  <>
                    <span>{pack.baseUC.toLocaleString()}</span>{' '}
                    <b style={{ color: '#ffcc00' }}>+{pack.bonusUC.toLocaleString()}</b>
                  </>
                ) : (
                  <span>{pack.title}</span>
                )}
              </div>

              {/* uc-total */}
              <div
                className="uc-total"
                style={{
                  color: '#aab4d0',
                  fontSize: '11px',
                  marginTop: '2px',
                }}
              >
                {pack.bonusUC > 0 ? `= ${pack.totalUC.toLocaleString()} UC` : pack.description || 'Instant UC'}
              </div>

              {/* uc-buy button */}
              <div
                className="uc-buy active:scale-95 transition-transform"
                style={{
                  background: isBest ? 'linear-gradient(to right, #ff8c00, #ffaa00)' : '#ff8c00',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '6px',
                  display: 'inline-block',
                  marginTop: '7px',
                  boxShadow: '0 2px 6px rgba(255,140,0,0.3)',
                }}
              >
                BUY - {formatPrice(pack.priceAED, currency)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
