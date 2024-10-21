import { useState, useEffect, useCallback } from "react";
import { WeatherCard } from "../components/weather/weather-card";
import { WeatherSearch } from "../components/weather/weather-search";
import { useWeather } from "../hooks/useWeather";
import Loader from "@/components/shared/loader";
import Error from "@/components/shared/error";
import { useNavigate } from "react-router-dom";
import { CloudSun, Search } from "lucide-react";

export default function Weather() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const { data: weatherData, isLoading, error } = useWeather(selectedCity);
  const navigate = useNavigate();

  const loadRecentSearches = useCallback(() => {
    const storedSearches = localStorage.getItem("recentSearches");
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  useEffect(() => {
    loadRecentSearches();
  }, [loadRecentSearches]);

  const updateRecentSearches = useCallback((city: string) => {
    setRecentSearches((prevSearches) => {
      if (prevSearches.includes(city)) {
        return prevSearches; // Don't change order if city already exists
      }
      const updatedSearches = [city, ...prevSearches].slice(0, 5);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
      return updatedSearches;
    });
  }, []);

  const handleSearch = useCallback(
    (city: string, isNewSearch: boolean) => {
      setSelectedCity(city);
      if (isNewSearch) {
        updateRecentSearches(city);
      }
    },
    [updateRecentSearches]
  );

  const handleDelete = useCallback((cityToDelete: string) => {
    setRecentSearches((prevSearches) => {
      const updatedSearches = prevSearches.filter(
        (city) => city !== cityToDelete
      );
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
      return updatedSearches;
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Weather Dashboard</h1>
      <WeatherSearch
        onSearch={handleSearch}
        recentSearches={recentSearches}
        onDelete={handleDelete}
      />
      {isLoading && <Loader />}
      {error && (
        <Error
          message={error instanceof Error ? error.message : String(error)}
        />
      )}
      {weatherData && (
        <div className="mt-4">
          <WeatherCard
            weatherData={weatherData}
            onDetailsClick={() =>
              navigate(
                `/weather/${selectedCity}?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}`
              )
            }
          />
        </div>
      )}
      {!weatherData && !selectedCity && (
        <div className="text-center py-8">
          <CloudSun className="h-16 w-16 mx-auto text-primary mb-4" />
          <h2 className="text-2xl font-semibold mb-2">
            Welcome to Weather Search
          </h2>
          <p className="text-muted-foreground mb-4">
            Enter a city name to get started or use recent searches if you have
            searched for a city before
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Search className="h-4 w-4" />
            <span>Try searching for "London" or "New York"</span>
          </div>
        </div>
      )}
    </div>
  );
}
