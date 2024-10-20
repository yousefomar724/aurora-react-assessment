import { useQuery } from "@tanstack/react-query";
import { getWeather } from "../lib/api/weatherApi";

export const useWeather = (city: string | null) => {
  return useQuery({
    queryKey: ["weather", city],
    queryFn: () => getWeather(city as string),
    enabled: !!city,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
  });
};
