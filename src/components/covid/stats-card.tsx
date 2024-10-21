import { CovidStats } from "../../types/covid";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StatsCardProps {
  stats: CovidStats;
}

export default function StatsCard({ stats }: StatsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>COVID-19 Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <StatItem label="Cases" value={stats.cases} color="bg-blue-500" />
          <StatItem label="Deaths" value={stats.deaths} color="bg-red-500" />
          <StatItem
            label="Recovered"
            value={stats.recovered}
            color="bg-green-500"
          />
          <StatItem label="Active" value={stats.active} color="bg-yellow-500" />
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Last updated: {new Date(stats.updated).toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
}

interface StatItemProps {
  label: string;
  value: number;
  color: string;
}

const StatItem = ({ label, value, color }: StatItemProps) => {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <Badge variant="secondary" className={`text-xl font-bold ${color}`}>
        {value.toLocaleString()}
      </Badge>
    </div>
  );
};
