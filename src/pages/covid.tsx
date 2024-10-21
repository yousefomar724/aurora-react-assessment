import { useState, useMemo } from "react";
import {
  useGlobalCovid,
  useCountryCovid,
  useHistoricalGlobalCovid,
} from "../hooks/useCovid";
import StatsCard from "../components/covid/stats-card";
import CountrySelect from "../components/covid/country-select";
import Loader from "@/components/shared/loader";
import Error from "@/components/shared/error";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useMediaQuery } from "../hooks/useMediaQuery";

export default function CovidPage() {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const {
    data: globalData,
    isLoading: globalLoading,
    error: globalError,
  } = useGlobalCovid();
  const {
    data: countryData,
    isLoading: countryLoading,
    error: countryError,
  } = useCountryCovid(selectedCountry);
  const {
    data: historicalData,
    isLoading: historicalLoading,
    error: historicalError,
  } = useHistoricalGlobalCovid(365 * 4); // Get last 4 years of data

  const pieChartData = useMemo(() => {
    if (!globalData) return [];
    return [
      { name: "Active", value: globalData.active },
      { name: "Recovered", value: globalData.recovered },
      { name: "Deaths", value: globalData.deaths },
    ];
  }, [globalData]);

  const lineChartData = useMemo(() => {
    if (!historicalData) return [];
    return Object.entries(historicalData.cases).map(([date, cases]) => ({
      date: new Date(date).toLocaleDateString(),
      cases,
      deaths: historicalData.deaths[date],
      recovered: historicalData.recovered[date],
    }));
  }, [historicalData]);

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
  };

  const isMobile = useMediaQuery("(max-width: 640px)");

  if (globalLoading || historicalLoading)
    return <Loader title="Loading COVID-19 data..." />;
  if (globalError || historicalError)
    return (
      <Error
        title="Error loading COVID-19 data"
        message={(globalError || historicalError)?.message as string}
      />
    );

  return (
    <div className="container max-w-6xl mx-auto p-4 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Global Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Global COVID-19 Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={`var(--color-${entry.name.toLowerCase()})`}
                      />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Historical Data */}
        <Card>
          <CardHeader>
            <CardTitle>Historical COVID-19 Data (Last 4 Years)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 5)}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) =>
                      `${(value / 1000000).toFixed(1)}M`
                    }
                    hide={isMobile}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line
                    type="monotone"
                    dataKey="cases"
                    stroke="var(--color-cases)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="deaths"
                    stroke="var(--color-deaths)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="recovered"
                    stroke="var(--color-recovered)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Global Statistics */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Global Statistics</h2>
        {globalData && <StatsCard stats={globalData} />}
      </div>

      {/* Country Statistics */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Country Statistics</h2>
        <CountrySelect onSelect={setSelectedCountry} />
        {selectedCountry && (
          <>
            {countryLoading && <Loader title="Loading country data..." />}
            {countryError && (
              <Error
                title="Error loading country data"
                message={countryError.message}
              />
            )}
            {countryData && <StatsCard stats={countryData} isCountry={true} />}
          </>
        )}
      </div>
    </div>
  );
}
