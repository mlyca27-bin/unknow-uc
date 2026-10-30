export type PaymentResultType = 'success' | 'failed' | 'pending';

export interface CardConfig {
  enabled: boolean;
  last4: string;
  name: string;
  type: 'visa' | 'master' | 'amex' | 'golden';
  color: string;
}

export interface AppSettings {
  username: string;
  paymentResult: PaymentResultType;
  cvcEnabled: boolean;
  countdownSeconds: number;
  cards: {
    visa: CardConfig;
    master: CardConfig;
    amex: CardConfig;
    golden: CardConfig;
  };
  soundEnabled: boolean;
  currency: string;
  customTimeDate?: string;
}

export interface UCPackage {
  id: string;
  title: string;
  baseUC: number;
  bonusUC: number;
  totalUC: number;
  priceAED: number;
  badge: string;
  badgeType?: 'percentage' | 'bonus' | 'best' | 'new' | 'standard';
  highlightBorder?: boolean;
  popular?: boolean;
  description?: string;
  category: 'custom' | 'standard' | 'pass';
}

export interface PlayerProfile {
  uid: string;
  username: string;
  level: number;
  rank: string;
  server: string;
  avatarUrl: string;
  verified: boolean;
}

export interface OrderRecord {
  id: string;
  timestamp: string;
  uid: string;
  username: string;
  packTitle: string;
  totalUC: number;
  price: number;
  currency: string;
  cardName: string;
  cardLast4: string;
  status: PaymentResultType;
  txHash: string;
}
