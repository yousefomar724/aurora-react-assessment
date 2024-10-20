export interface CryptoData {
  id: number;
  name: string;
  symbol: string;
  quote: {
    [currency: string]: {
      price: number;
      percent_change_24h: number;
      market_cap: number;
    };
  };
}

export type SupportedCurrency = "USD" | "EUR" | "GBP";
