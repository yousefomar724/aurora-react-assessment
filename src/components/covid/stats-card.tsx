import { CovidStats } from "../../types/covid";

interface StatsCardProps {
  stats: CovidStats;
}

export default function StatsCard({ stats }: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-2 dark:text-white">
        COVID-19 Statistics
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <StatItem
          label="Cases"
          value={stats.cases}
          color="text-blue-600 dark:text-blue-400"
        />
        <StatItem
          label="Deaths"
          value={stats.deaths}
          color="text-red-600 dark:text-red-400"
        />
        <StatItem
          label="Recovered"
          value={stats.recovered}
          color="text-green-600 dark:text-green-400"
        />
        <StatItem
          label="Active"
          value={stats.active}
          color="text-yellow-600 dark:text-yellow-400"
        />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
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

const StatItem = ({ label, value, color }: StatItemProps) => {
  return (
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-300">{label}</p>
      <p className={`text-xl font-bold ${color}`}>{value.toLocaleString()}</p>
    </div>
  );
};
