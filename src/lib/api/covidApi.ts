import axios from "axios";
import {
  CovidStats,
  CountryCovidStats,
  HistoricalData,
} from "../../types/covid";

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

export const getHistoricalGlobalData = async (
  days = 30
): Promise<HistoricalData> => {
  const response = await axios.get<HistoricalData>(
    `${BASE_URL}/historical/all?lastdays=${days}`
  );
  return response.data;
};

export const getHistoricalCountryData = async (
  country: string,
  days = 30
): Promise<HistoricalData> => {
  const response = await axios.get<{ timeline: HistoricalData }>(
    `${BASE_URL}/historical/${country}?lastdays=${days}`
  );
  return response.data.timeline;
};
