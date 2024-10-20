import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { WeatherData } from "../../types/weather";
import { Globe, Sunrise, Sunset } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "../ui/tooltip";

interface WeatherCardProps {
  weatherData: WeatherData;
  onDetailsClick: () => void;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  weatherData,
  onDetailsClick,
}) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const toggleTemperature = () => setIsCelsius(!isCelsius);

  const formatTemperature = (temp: number) => {
    return isCelsius
      ? `${temp.toFixed(1)}°C`
      : `${((temp * 9) / 5 + 32).toFixed(1)}°F`;
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getCountryName = (countryCode: string) => {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(countryCode);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xl">{weatherData.name}</span>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    {weatherData.sys.country}
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  {getCountryName(weatherData.sys.country)}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={toggleTemperature}>
                  {isCelsius ? "°C" : "°F"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isCelsius ? "Switch to Fahrenheit" : "Switch to Celsius"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="text-4xl font-bold">
            {formatTemperature(weatherData.main.temp)}
          </div>
          <div className="flex flex-col items-center">
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
              className="w-16 h-16"
            />
            <span className="text-sm font-medium capitalize">
              {weatherData.weather[0].main}
            </span>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex flex-col gap-2 mb-4">
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
            <p>Feels Like: {formatTemperature(weatherData.main.feels_like)}</p>
          </div>
          <div className="flex justify-between items-center">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex items-center gap-1">
                    <Sunrise className="w-4 h-4" />{" "}
                    {formatTime(weatherData.sys.sunrise)}
                  </span>
                </TooltipTrigger>
                <TooltipContent>Sunrise time</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex items-center gap-1">
                    <Sunset className="w-4 h-4" />{" "}
                    {formatTime(weatherData.sys.sunset)}
                  </span>
                </TooltipTrigger>
                <TooltipContent>Sunset time</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <Button className="w-full mt-4" onClick={onDetailsClick}>
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};
