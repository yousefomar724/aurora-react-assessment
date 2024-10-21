import { CryptoData, SupportedCurrency } from "../../types/crypto";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CryptoCardProps {
  crypto: CryptoData;
  currency: SupportedCurrency;
}

export default function CryptoCard({ crypto, currency }: CryptoCardProps) {
  const { price, percent_change_24h } = crypto.quote[currency];

  return (
    <Card className="transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {crypto.name}
          <span className="text-sm text-muted-foreground">{crypto.symbol}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold mb-2">
          {price.toLocaleString("en-US", { style: "currency", currency })}
        </p>
        <Badge variant={percent_change_24h >= 0 ? "default" : "secondary"}>
          {percent_change_24h >= 0 ? "▲" : "▼"}{" "}
          {Math.abs(percent_change_24h).toFixed(2)}%
        </Badge>
      </CardContent>
    </Card>
  );
}
