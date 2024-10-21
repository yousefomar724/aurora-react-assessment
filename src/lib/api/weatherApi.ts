import axios from "axios";
import {
  WeatherData,
  WeatherError,
  WeatherDetailsData,
} from "../../types/weather";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

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
    if (axios.isAxiosError(error) && error.response) {
      throw new Error((error.response.data as WeatherError).message);
    }
    throw new Error("An unexpected error occurred");
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
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error(
          "Invalid API key. Please check your OpenWeatherMap API key."
        );
      } else if (error.response) {
        throw new Error(
          (error.response.data as WeatherError).message ||
            "An error occurred while fetching weather data."
        );
      }
    }
    throw new Error(
      "An unexpected error occurred while fetching weather data."
    );
  }
};
