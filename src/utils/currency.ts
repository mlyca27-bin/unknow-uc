export interface CurrencyInfo {
  code: string;
  symbol: string;
  rateFromAED: number;
  name: string;
}

export const CURRENCIES: Record<string, CurrencyInfo> = {
  AED: { code: 'AED', symbol: 'AED', rateFromAED: 1.0, name: 'UAE Dirham' },
  USD: { code: 'USD', symbol: '$', rateFromAED: 0.272, name: 'US Dollar' },
  INR: { code: 'INR', symbol: '₹', rateFromAED: 23.45, name: 'Indian Rupee' },
  PKR: { code: 'PKR', symbol: 'Rs', rateFromAED: 76.5, name: 'Pakistani Rupee' },
  BDT: { code: 'BDT', symbol: '৳', rateFromAED: 33.2, name: 'Bangladeshi Taka' },
  SAR: { code: 'SAR', symbol: 'SAR', rateFromAED: 1.02, name: 'Saudi Riyal' },
  EUR: { code: 'EUR', symbol: '€', rateFromAED: 0.254, name: 'Euro' },
};

export function formatPrice(priceAED: number, currencyCode: string = 'AED'): string {
  const curr = CURRENCIES[currencyCode] || CURRENCIES.AED;
  const converted = priceAED * curr.rateFromAED;
  if (curr.code === 'AED') {
    return `${Math.round(converted)} AED`;
  }
  if (curr.code === 'USD' || curr.code === 'EUR') {
    return `${curr.symbol}${converted.toFixed(2)}`;
  }
  return `${curr.symbol} ${Math.round(converted).toLocaleString()}`;
}
