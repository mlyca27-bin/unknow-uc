import React, { useState, useEffect } from 'react';
import { Diamond } from 'lucide-react';
import { UCPackage } from '../types/store';
import { formatPrice } from '../utils/currency';
import { sound } from '../utils/audio';
import { UCLogo } from './UCLogo';

interface ProductCatalogProps {
  packages: UCPackage[];
  currency: string;
  onSelectPack: (pack: UCPackage) => void;
  selectedCategory?: string;
  onCategoryChange?: (cat: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ packages, currency, onSelectPack, selectedCategory, onCategoryChange }) => {
  const [activeTab, setActiveTab] = useState<'uc' | 'freefire' | 'yalla'>('uc');

  // Sync with App.tsx if passed
  useEffect(() => {
    if (selectedCategory === 'freefire') setActiveTab('freefire');
    else if (selectedCategory === 'yalla') setActiveTab('yalla');
    else if (selectedCategory === 'pubg' || selectedCategory === 'uc') setActiveTab('uc');
  }, [selectedCategory]);

  const handleTabChange = (tab: 'uc' | 'freefire' | 'yalla') => {
    sound.playClick();
    setActiveTab(tab);
    if (onCategoryChange) {
      if (tab === 'uc') onCategoryChange('pubg');
      else onCategoryChange(tab);
    }
  };

  const filteredPacks = packages.filter((pkg: any) => {
    if (activeTab === 'uc') return pkg.game === 'uc' || pkg.game === 'pubg' || !pkg.game;
    if (activeTab === 'freefire') return pkg.game === 'freefire';
    if (activeTab === 'yalla') return pkg.game === 'yalla';
    return true;
  });

  return (
    <div style={{ background: '#080f2a', padding: '14px', borderRadius: '16px', border: '1px solid #1c2c62', marginTop: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', borderBottom: '1px solid #1b2a60', paddingBottom: '12px', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: activeTab==='freefire' ? '#ff8c00' : activeTab==='yalla' ? '#7c3aed' : '#ffcc00', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {activeTab==='uc' ? <UCLogo size={28} /> : activeTab==='freefire' ? '💎' : '🎲'}
          </div>
          <div>
            <h2 style={{ color: '#fff', fontWeight: 800, fontSize: '14px', textTransform: 'uppercase' }}>
              {activeTab==='uc' ? 'PUBG UC PACKS - FROM 24K' : activeTab==='freefire' ? 'FREE FIRE DIAMONDS' : 'YALLA LUDO DIAMONDS 25K-70K'}
            </h2>
            <p style={{ color: '#8e9ac0', fontSize: '11px' }}>{filteredPacks.length} Packs Available - Time: {new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }).replace(',', '')}</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '6px', background: '#04091d', padding: '4px', borderRadius: '12px', border: '1px solid #1e2f69' }}>
          <button onClick={() => handleTabChange('uc')} style={{ padding: '6px 12px', borderRadius: '8px', fontWeight: 700, fontSize: '12px', background: activeTab==='uc' ? '#ffcc00' : 'transparent', color: activeTab==='uc' ? '#000' : '#ccc', border: 'none', cursor: 'pointer' }}>🎮 UC (24K+)</button>
          <button onClick={() => handleTabChange('freefire')} style={{ padding: '6px 12px', borderRadius: '8px', fontWeight: 700, fontSize: '12px', background: activeTab==='freefire' ? '#ffcc00' : 'transparent', color: activeTab==='freefire' ? '#000' : '#ccc', border: 'none', cursor: 'pointer' }}>🔥 Free Fire</button>
          <button onClick={() => handleTabChange('yalla')} style={{ padding: '6px 12px', borderRadius: '8px', fontWeight: 700, fontSize: '12px', background: activeTab==='yalla' ? '#ffcc00' : 'transparent', color: activeTab==='yalla' ? '#000' : '#ccc', border: 'none', cursor: 'pointer' }}>🎲 Yalla 25K-70K</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
        {filteredPacks.map((pack: any) => (
          <div key={pack.id} onClick={() => { sound.playClick(); onSelectPack(pack); }} style={{ background: activeTab==='freefire' ? 'linear-gradient(180deg, #5a2d0a, #2a1500)' : activeTab==='yalla' ? 'linear-gradient(180deg, #3d2a6a, #1e143f)' : 'linear-gradient(180deg, #1a2d6a, #101a3f)', border: '1px solid #263a75', borderRadius: '14px', padding: '12px 6px', textAlign: 'center', cursor: 'pointer' }}>
            <div style={{ fontSize: '10px', background: '#ffcc00', color: '#000', fontWeight: 800, padding: '2px 6px', borderRadius: '10px', display: 'inline-block' }}>{pack.badge}</div>
            <div style={{ width: '42px', height: '42px', margin: '6px auto', borderRadius: '50%', background: activeTab==='freefire' ? '#ff8c00' : activeTab==='yalla' ? '#7c3aed' : '#ffcc00', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {activeTab==='uc' ? <UCLogo size={30} /> : activeTab==='freefire' ? <Diamond style={{ width: '22px', height: '22px', color: '#fff' }} /> : <span style={{ color: '#fff', fontWeight: 900 }}>♦</span>}
            </div>
            <div style={{ color: '#fff', fontWeight: 800, fontSize: '13px' }}>{pack.totalUC.toLocaleString()} {activeTab==='uc' ? 'UC' : 'Diamonds'}</div>
            <div style={{ color: '#aab4d0', fontSize: '10px', marginTop: '2px' }}>{pack.description}</div>
            <div style={{ background: '#ff8c00', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px', display: 'inline-block', marginTop: '7px' }}>BUY - {formatPrice(pack.priceAED, currency)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
