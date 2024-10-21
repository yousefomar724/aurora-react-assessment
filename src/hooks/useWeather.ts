import { useQuery } from "@tanstack/react-query";
import { fetchWeatherDetails, getWeather } from "../lib/api/weatherApi";

export const useWeather = (city: string | null) => {
  return useQuery({
    queryKey: ["weather", city],
    queryFn: () => getWeather(city as string),
    enabled: !!city,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: false,
    throwOnError: (error) => {
      console.error("Error fetching weather data:", error);
      return true;
    },
  });
};

export const useWeatherDetails = (
  city: string | null,
  lat: number,
  lon: number
) => {
  return useQuery({
    queryKey: ["weatherDetails", city, lat, lon],
    queryFn: () => fetchWeatherDetails(city as string, lat, lon),
    enabled: !!city && !!lat && !!lon,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: false,
    throwOnError: (error) => {
      console.error("Error fetching weather details:", error);
      return true;
    },
  });
};
