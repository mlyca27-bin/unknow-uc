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

  // FIXED: Game Category State
  const [selectedCategory, setSelectedCategory] = useState<string>('pubg');

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
