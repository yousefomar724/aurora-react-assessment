import { useState } from "react";
import { WeatherCard } from "../components/weather/weather-card";
import { WeatherSearch } from "../components/weather/weather-search";
import { useWeather } from "../hooks/useWeather";
import Loader from "@/components/shared/loader";
import Error from "@/components/shared/error";
import { useNavigate } from "react-router-dom";

export default function Weather() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const { data: weatherData, isLoading, error } = useWeather(selectedCity);
  const navigate = useNavigate();

  const handleSearch = (city: string) => {
    setSelectedCity(city);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Weather Dashboard</h1>
      <WeatherSearch onSearch={handleSearch} />
      {isLoading && <Loader />}
      {error && <Error message={error.message} />}
      {weatherData && (
        <div className="mt-4">
          <WeatherCard
            weatherData={weatherData}
            onDetailsClick={() => navigate(`/weather/${selectedCity}`)}
          />
        </div>
      )}
    </div>
  );
}
