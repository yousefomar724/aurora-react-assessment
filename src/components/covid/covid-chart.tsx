import React from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ChartData } from "@/types/covid";

interface CovidChartProps {
  data: ChartData[];
}

const CovidChart: React.FC<CovidChartProps> = ({ data }) => {
  const config = {
    cases: {
      label: "Cases",
      color: "#3b82f6",
    },
    deaths: {
      label: "Deaths",
      color: "#ef4444",
    },
    recovered: {
      label: "Recovered",
      color: "#22c55e",
    },
  };

  return (
    <ChartContainer className="h-[400px]" config={config}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="date"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value.toLocaleString()}`}
          />
          <ChartTooltip
            content={({ active, payload }) => (
              <ChartTooltipContent
                active={active}
                payload={payload}
                formatter={(value: any) =>
                  typeof value === "number"
                    ? value.toLocaleString()
                    : String(value)
                }
              />
            )}
          />
          <Line
            type="monotone"
            dataKey="cases"
            stroke={config.cases.color}
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="deaths"
            stroke={config.deaths.color}
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="recovered"
            stroke={config.recovered.color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default CovidChart;
