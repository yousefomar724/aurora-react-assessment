import axios from "axios";
import { CovidStats, CountryCovidStats } from "../../types/covid";

const BASE_URL = "https://disease.sh/v3/covid-19";

export const getGlobalCovidData = async (): Promise<CovidStats> => {
  const response = await axios.get<CovidStats>(`${BASE_URL}/all`);
  return response.data;
};

export const getCountryCovidData = async (
  country: string
): Promise<CountryCovidStats> => {
  const response = await axios.get<CountryCovidStats>(
    `${BASE_URL}/countries/${country}`
  );
  return response.data;
};
