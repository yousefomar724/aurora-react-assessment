import { useState } from "react";
import { CryptoData, SupportedCurrency } from "../../types/crypto";

interface CryptoConverterProps {
  cryptoList: CryptoData[];
  currency: SupportedCurrency;
}

export default function CryptoConverter({
  cryptoList,
  currency,
}: CryptoConverterProps) {
  const [amount, setAmount] = useState<string>("");
  const [fromCrypto, setFromCrypto] = useState<string>(
    cryptoList[0]?.symbol || ""
  );
  const [toCrypto, setToCrypto] = useState<string>(cryptoList[1]?.symbol || "");

  const fromPrice =
    cryptoList.find((crypto) => crypto.symbol === fromCrypto)?.quote[currency]
      .price || 0;
  const toPrice =
    cryptoList.find((crypto) => crypto.symbol === toCrypto)?.quote[currency]
      .price || 0;

  const convertedAmount = amount
    ? ((parseFloat(amount) * fromPrice) / toPrice).toFixed(8)
    : "";

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Crypto Converter</h3>
      <div className="flex flex-col space-y-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="p-2 border rounded"
        />
        <select
          value={fromCrypto}
          onChange={(e) => setFromCrypto(e.target.value)}
          className="p-2 border rounded"
        >
          {cryptoList.map((crypto) => (
            <option key={crypto.id} value={crypto.symbol}>
              {crypto.name}
            </option>
          ))}
        </select>
        <select
          value={toCrypto}
          onChange={(e) => setToCrypto(e.target.value)}
          className="p-2 border rounded"
        >
          {cryptoList.map((crypto) => (
            <option key={crypto.id} value={crypto.symbol}>
              {crypto.name}
            </option>
          ))}
        </select>
        <p className="text-lg font-semibold">
          {convertedAmount} {toCrypto}
        </p>
      </div>
    </div>
  );
}
