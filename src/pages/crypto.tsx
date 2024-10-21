import { useState } from "react";
import { useCrypto } from "../hooks/useCrypto";
import CryptoCard from "../components/crypto/crypto-card";
import CryptoConverter from "../components/crypto/crypto-converter";
import { SupportedCurrency } from "../types/crypto";
import Loader from "@/components/shared/loader";
import Error from "@/components/shared/error";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";

export default function Crypto() {
  const [currency, setCurrency] = useState<SupportedCurrency>("USD");
  const { data, isLoading, error } = useCrypto(currency);

  if (isLoading) return <Loader title="Loading crypto data..." />;
  if (error)
    return <Error title="Error loading crypto data" message={error.message} />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cryptocurrency Dashboard</h1>
      <div className="mb-4">
        <Select
          value={currency}
          onValueChange={(value) => setCurrency(value as SupportedCurrency)}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Select a currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">USD</SelectItem>
            <SelectItem value="EUR">EUR</SelectItem>
            <SelectItem value="SAR">SAR</SelectItem>
          </SelectContent>
        </Select>
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
