import { useState, useEffect, useCallback } from "react";
import { WeatherCard } from "../components/weather/weather-card";
import { WeatherSearch } from "../components/weather/weather-search";
import { useWeather } from "../hooks/useWeather";
import Loader from "@/components/shared/loader";
import Error from "@/components/shared/error";
import { useNavigate } from "react-router-dom";
import { CloudSun, Search } from "lucide-react";
import { WeatherData } from "@/types/weather";
import { getWeather } from "@/lib/api/weatherApi";

const FAMOUS_CAPITALS = ["London", "Paris", "Tokyo", "New York", "Sydney"];

export default function Weather() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const { data: weatherData, isLoading, error } = useWeather(selectedCity);
  const navigate = useNavigate();
  const [famousCapitalsWeather, setFamousCapitalsWeather] = useState<
    Array<WeatherData>
  >([]);

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

  useEffect(() => {
    const fetchFamousCapitalsWeather = async () => {
      const weatherPromises = FAMOUS_CAPITALS.map((city) => getWeather(city));
      const weatherData = await Promise.all(weatherPromises);
      setFamousCapitalsWeather(weatherData.filter(Boolean));
    };

    fetchFamousCapitalsWeather();
  }, []);

  return (
    <div className="container max-w-6xl mx-auto p-4">
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
      {/* Weather data for the selected city */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
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
      </div>
      {/* If no weather data and no selected city, show the welcome message */}
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

      {/* New section for famous capital cities */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Famous Capital Cities Weather
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading && (
            <Loader title="Loading famous capital cities weather..." />
          )}
          {error && ( 
            <Error
              title="Error loading famous capital cities weather"
              message={error instanceof Error ? error.message : String(error)}
            />
          )}
          {famousCapitalsWeather.map((cityWeather, index) => (
            <WeatherCard
              key={FAMOUS_CAPITALS[index]}
              weatherData={cityWeather}
              onDetailsClick={() =>
                navigate(
                  `/weather/${FAMOUS_CAPITALS[index]}?lat=${cityWeather.coord.lat}&lon=${cityWeather.coord.lon}`
                )
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
