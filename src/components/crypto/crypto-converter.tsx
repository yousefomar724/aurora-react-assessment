import { useState } from "react";
import { CryptoData, SupportedCurrency } from "../../types/crypto";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crypto Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fromCrypto">From</Label>
            <Select value={fromCrypto} onValueChange={setFromCrypto}>
              <SelectTrigger id="fromCrypto">
                <SelectValue placeholder="Select cryptocurrency" />
              </SelectTrigger>
              <SelectContent>
                {cryptoList.map((crypto) => (
                  <SelectItem key={crypto.id} value={crypto.symbol}>
                    {crypto.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="toCrypto">To</Label>
            <Select value={toCrypto} onValueChange={setToCrypto}>
              <SelectTrigger id="toCrypto">
                <SelectValue placeholder="Select cryptocurrency" />
              </SelectTrigger>
              <SelectContent>
                {cryptoList.map((crypto) => (
                  <SelectItem key={crypto.id} value={crypto.symbol}>
                    {crypto.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-lg font-semibold">
            {convertedAmount} {toCrypto}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
