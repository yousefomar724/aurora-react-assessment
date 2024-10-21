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

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAmount(e.target.value);
  const handleFromCryptoChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setFromCrypto(e.target.value);
  const handleToCryptoChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setToCrypto(e.target.value);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Crypto Converter
      </h3>
      <div className="flex flex-col space-y-4">
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter amount"
          className="p-2 border rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400"
          aria-label="Enter amount to convert"
        />
        <select
          value={fromCrypto}
          onChange={handleFromCryptoChange}
          className="p-2 border rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400"
          aria-label="Select cryptocurrency to convert from"
        >
          {cryptoList.map((crypto) => (
            <option key={crypto.id} value={crypto.symbol}>
              {crypto.name}
            </option>
          ))}
        </select>
        <select
          value={toCrypto}
          onChange={handleToCryptoChange}
          className="p-2 border rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400"
          aria-label="Select cryptocurrency to convert to"
        >
          {cryptoList.map((crypto) => (
            <option key={crypto.id} value={crypto.symbol}>
              {crypto.name}
            </option>
          ))}
        </select>
        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {convertedAmount} {toCrypto}
        </p>
      </div>
    </div>
  );
}
