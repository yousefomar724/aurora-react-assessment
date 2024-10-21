import axios from "axios";
import {
  WeatherData,
  WeatherError,
  WeatherDetailsData,
} from "../../types/weather";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const handleApiError = (error: unknown): string => {
  console.log(error);
  if (axios.isAxiosError(error) && error.response) {
    return (
      (error.response.data as WeatherError).message ||
      "An error occurred while fetching weather data"
    );
  }
  return "An unexpected error occurred";
};

export const getWeather = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get<WeatherData>(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw handleApiError(error);
  }
};

export const fetchWeatherDetails = async (
  city: string,
  lat: number,
  lon: number
): Promise<WeatherDetailsData> => {
  try {
    const response = await axios.get<WeatherDetailsData>(
      `${BASE_URL}/forecast`,
      {
        params: {
          q: city,
          lat,
          lon,
          appid: API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
