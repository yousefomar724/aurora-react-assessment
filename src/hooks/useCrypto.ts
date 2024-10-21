import { useQuery } from "@tanstack/react-query";
import { getCryptoData } from "../lib/api/cryptoApi";
import { CryptoData, SupportedCurrency } from "../types/crypto";

export const useCrypto = (currency: SupportedCurrency) => {
  return useQuery<CryptoData[], Error>({
    queryKey: ["crypto", currency],
    queryFn: () => getCryptoData(currency),
    staleTime: 30 * 1000, // 30 seconds
    retry: false,
  });
};
