import { useState } from "react";
import { useCrypto } from "../hooks/useCrypto";
import CryptoCard from "../components/crypto/crypto-card";
import CryptoConverter from "../components/crypto/crypto-converter";
import { SupportedCurrency } from "../types/crypto";
import Loader from "@/components/shared/loader";
import Error from "@/components/shared/error";

export default function CryptoPage() {
  const [currency, setCurrency] = useState<SupportedCurrency>("USD");
  const { data, isLoading, error } = useCrypto(currency);

  if (isLoading) return <Loader title="Loading crypto data..." />;
  if (error)
    return <Error title="Error loading crypto data" message={error.message} />;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cryptocurrency Dashboard</h1>
      <div className="mb-4">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value as SupportedCurrency)}
          className="p-2 border rounded"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.slice(0, 10).map((crypto) => (
          <CryptoCard key={crypto.id} crypto={crypto} currency={currency} />
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Crypto Converter</h2>
        <CryptoConverter
          cryptoList={data?.slice(0, 10) || []}
          currency={currency}
        />
      </div>
    </div>
  );
}
