import { CryptoData, SupportedCurrency } from "../../types/crypto";

interface CryptoCardProps {
  crypto: CryptoData;
  currency: SupportedCurrency;
}

export default function CryptoCard({ crypto, currency }: CryptoCardProps) {
  const { price, percent_change_24h } = crypto.quote[currency];

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 transition-colors duration-200">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {crypto.name}
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {crypto.symbol}
        </span>
      </div>
      <p className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
        {price.toLocaleString("en-US", { style: "currency", currency })}
      </p>
      <p
        className={`text-sm ${
          percent_change_24h >= 0
            ? "text-green-600 dark:text-green-400"
            : "text-red-600 dark:text-red-400"
        }`}
      >
        {percent_change_24h >= 0 ? "▲" : "▼"}{" "}
        {Math.abs(percent_change_24h).toFixed(2)}%
      </p>
    </div>
  );
}
