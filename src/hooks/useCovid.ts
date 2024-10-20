import { useQuery } from "@tanstack/react-query";
import { getGlobalCovidData, getCountryCovidData } from "../lib/api/covidApi";
import { CovidStats, CountryCovidStats } from "../types/covid";

export const useGlobalCovid = () => {
  return useQuery<CovidStats, Error>({
    queryKey: ["covid", "global"],
    queryFn: getGlobalCovidData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};

export const useCountryCovid = (country: string) => {
  return useQuery<CountryCovidStats, Error>({
    queryKey: ["covid", "country", country],
    queryFn: () => getCountryCovidData(country),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};
