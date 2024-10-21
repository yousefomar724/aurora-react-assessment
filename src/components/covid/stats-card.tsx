import { CovidStats, CountryCovidStats } from "../../types/covid";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { motion } from "framer-motion";
import { useMediaQuery } from "../../hooks/useMediaQuery";

interface StatsCardProps {
  stats: CovidStats | CountryCovidStats;
  isCountry?: boolean;
}

const chartConfig = {
  cases: {
    label: "Cases",
    color: "hsl(var(--chart-1))",
  },
  deaths: {
    label: "Deaths",
    color: "hsl(var(--chart-2))",
  },
  recovered: {
    label: "Recovered",
    color: "hsl(var(--chart-3))",
  },
  active: {
    label: "Active",
    color: "hsl(var(--chart-4))",
  },
};

export default function StatsCard({
  stats,
  isCountry = false,
}: StatsCardProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const chartData = [
    { name: "Cases", value: stats.cases },
    { name: "Deaths", value: stats.deaths },
    { name: "Recovered", value: stats.recovered },
    { name: "Active", value: stats.active },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-6xl mx-auto hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-2xl font-bold">
            <span>COVID-19 Statistics</span>
            {isCountry && "countryInfo" in stats && (
              <div className="flex items-center space-x-2">
                <img
                  src={stats.countryInfo.flag}
                  alt={`${stats.country} flag`}
                  className="w-8 h-6 object-cover rounded"
                />
                <span className="text-xl">{stats.country}</span>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="h-[300px] w-full mb-6"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} hide={isMobile} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                {Object.keys(chartConfig).map((key) => (
                  <Bar
                    key={key}
                    dataKey="value"
                    fill={`var(--color-${key})`}
                    name={chartConfig[key as keyof typeof chartConfig].label}
                    radius={[4, 4, 0, 0]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, staggerChildren: 0.1 }}
          >
            {Object.entries(stats).map(
              ([key, value]) =>
                key !== "updated" &&
                key !== "country" &&
                key !== "countryInfo" && (
                  <StatItem
                    key={key}
                    label={key}
                    value={value}
                    color={`var(--color-${key})`}
                  />
                )
            )}
          </motion.div>
          <p className="text-sm text-muted-foreground mt-6 text-center">
            Last updated: {new Date(stats.updated).toLocaleString()}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface StatItemProps {
  label: string;
  value: number;
  color: string;
}

const StatItem = ({ label, value, color }: StatItemProps) => {
  return (
    <motion.div
      className="bg-card rounded-lg p-4 shadow-sm border border-border hover:shadow-md transition-all duration-300 ease-in-out"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <p className="text-xs md:text-sm truncate font-medium text-muted-foreground capitalize mb-1">
        {label}
      </p>
      <motion.p
        className="text-lg md:text-2xl font-bold"
        style={{ color }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {value.toLocaleString()}
      </motion.p>
    </motion.div>
  );
};
