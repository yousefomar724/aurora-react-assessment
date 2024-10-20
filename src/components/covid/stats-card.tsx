import { CovidStats } from "../../types/covid";

interface StatsCardProps {
  stats: CovidStats;
}

export default function StatsCard({ stats }: StatsCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-2">COVID-19 Statistics</h3>
      <div className="grid grid-cols-2 gap-4">
        <StatItem label="Cases" value={stats.cases} color="text-blue-600" />
        <StatItem label="Deaths" value={stats.deaths} color="text-red-600" />
        <StatItem
          label="Recovered"
          value={stats.recovered}
          color="text-green-600"
        />
        <StatItem label="Active" value={stats.active} color="text-yellow-600" />
      </div>
      <p className="text-sm text-gray-500 mt-2">
        Last updated: {new Date(stats.updated).toLocaleString()}
      </p>
    </div>
  );
}

interface StatItemProps {
  label: string;
  value: number;
  color: string;
}

function StatItem({ label, value, color }: StatItemProps) {
  return (
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className={`text-xl font-bold ${color}`}>{value.toLocaleString()}</p>
    </div>
  );
}
