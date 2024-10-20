import axios from "axios";
import { CryptoData, SupportedCurrency } from "../../types/crypto";

const BASE_URL = "https://api.coingecko.com/api/v3";

interface CoinGeckoResponse {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

export const getCryptoData = async (
  currency: SupportedCurrency
): Promise<CryptoData[]> => {
  try {
    const response = await axios.get<CoinGeckoResponse[]>(
      `${BASE_URL}/coins/markets`,
      {
        params: {
          vs_currency: currency.toLowerCase(),
          order: "market_cap_desc",
          per_page: 100,
          page: 1,
          sparkline: false,
        },
      }
    );

    // Map CoinGecko response to match expected CryptoData structure
    return response.data.map((coin) => ({
      id: parseInt(coin.id, 10),
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      quote: {
        [currency]: {
          price: coin.current_price,
          percent_change_24h: coin.price_change_percentage_24h,
          market_cap: coin.market_cap,
        },
      },
    }));
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    throw error;
  }
};
