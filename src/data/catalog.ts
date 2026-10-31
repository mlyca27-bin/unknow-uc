import { AppSettings, PlayerProfile, UCPackage } from '../types/store';

// ===== FIX: YE 2 CHEEZEIN ZAROORI HAIN =====
export const DEFAULT_SETTINGS: AppSettings = {
  currency: 'AED',
  language: 'en',
  theme: 'dark',
  soundEnabled: true,
} as any;

export const PLAYER_PROFILES: PlayerProfile[] = [];
// ===========================================

export const UC_PACKAGES: UCPackage[] = [
  // PUBG UC - 24K se START (6000 wala hata diya)
  { id: 'pack-27000', title: '27000 UC', baseUC: 24000, bonusUC: 3000, totalUC: 27000, priceAED: 1099, badge: 'BEST', badgeType: 'best', popular: true, description: '24000 + 3000 Bonus UC', category: 'custom', game: 'uc' },
  { id: 'pack-50000', title: '50000 UC', baseUC: 42000, bonusUC: 8000, totalUC: 50000, priceAED: 1999, badge: '35%', badgeType: 'percentage', popular: true, description: '42000 + 8000 Bonus UC', category: 'custom', game: 'uc' },
  { id: 'pack-75000', title: '75000 UC', baseUC: 60000, bonusUC: 15000, totalUC: 75000, priceAED: 2999, badge: '40%', badgeType: 'percentage', description: '60000 + 15000 Bonus UC', category: 'custom', game: 'uc' },
  { id: 'pack-100000', title: '100000 UC', baseUC: 80000, bonusUC: 20000, totalUC: 100000, priceAED: 3999, badge: 'BEST', badgeType: 'best', description: '80000 + 20000 Bonus UC', category: 'custom', game: 'uc' },

  // FREE FIRE
  { id: 'ff-100', title: '100 Diamonds', baseUC: 100, bonusUC: 0, totalUC: 100, priceAED: 15, badge: 'Free Fire', badgeType: 'new', description: '100 Diamonds', category: 'freefire', game: 'freefire' },
  { id: 'ff-310', title: '310 Diamonds', baseUC: 310, bonusUC: 0, totalUC: 310, priceAED: 35, badge: 'HOT', badgeType: 'percentage', description: '310 Diamonds', category: 'freefire', game: 'freefire' },
  { id: 'ff-520', title: '520 Diamonds', baseUC: 520, bonusUC: 0, totalUC: 520, priceAED: 55, badge: '10%', badgeType: 'percentage', description: '520 Diamonds', category: 'freefire', game: 'freefire' },
  { id: 'ff-1060', title: '1060 Diamonds', baseUC: 1060, bonusUC: 0, totalUC: 1060, priceAED: 105, badge: 'BEST', badgeType: 'best', description: '1060 Diamonds', category: 'freefire', game: 'freefire' },
  { id: 'ff-2180', title: '2180 Diamonds', baseUC: 2180, bonusUC: 0, totalUC: 2180, priceAED: 210, badge: '20%', badgeType: 'percentage', description: '2180 Diamonds', category: 'freefire', game: 'freefire' },
  { id: 'ff-5600', title: '5600 Diamonds', baseUC: 5600, bonusUC: 0, totalUC: 5600, priceAED: 520, badge: 'BEST', badgeType: 'best', description: '5600 Diamonds', category: 'freefire', game: 'freefire' },

    // YALLA LUDO - GOLD PACKS (Photo 1)
  { id: 'yalla-gold-10m', title: 'Gold 9,973,990', baseUC: 9973990, bonusUC: 0, priceAED: 203.91, image: '💰', originalPrice: 245.54 },
  { id: 'yalla-gold-25m', title: 'Gold 25,236,460', baseUC: 25236460, bonusUC: 0, priceAED: 407.84, image: '💰', originalPrice: 491.09 },
  { id: 'yalla-gold-76m', title: 'Gold 76,000,860', baseUC: 76000860, bonusUC: 0, priceAED: 1223.55, image: '👑', originalPrice: 1473.26 },
  { id: 'yalla-gold-126m', title: 'Gold 126,910,990', baseUC: 126910990, bonusUC: 0, priceAED: 2039.27, image: '👑', originalPrice: 2455.44 },

  // YALLA LUDO - DIAMONDS PACKS (Photo 2)
  { id: 'yalla-dia-5k', title: 'Diamonds 5,150', baseUC: 5150, bonusUC: 0, priceAED: 40.77, image: '💎', originalPrice: 49.10 },
  { id: 'yalla-dia-13k', title: 'Diamonds 13,580', baseUC: 13580, bonusUC: 0, priceAED: 101.97, image: '💎', originalPrice: 122.80 },
  { id: 'yalla-dia-27k', title: 'Diamonds 27,640', baseUC: 27640, bonusUC: 0, priceAED: 203.91, image: '💎', originalPrice: 245.54 },
  { id: 'yalla-dia-55k', title: 'Diamonds 55,800', baseUC: 55800, bonusUC: 0, priceAED: 407.84, image: '💎', originalPrice: 491.09 },
  { id: 'yalla-dia-168k', title: 'Diamonds 168,860', baseUC: 168860, bonusUC: 0, priceAED: 1223.55, image: '💎', originalPrice: 1473.26 },
  { id: 'yalla-dia-283k', title: 'Diamonds 283,460', baseUC: 283460, bonusUC: 0, priceAED: 2039.27, image: '💎', originalPrice: 2455.44 },
] as unknown as UCPackage[];

export const ALL_GAME_PACKAGES = UC_PACKAGES;
export const CATALOG = UC_PACKAGES;
