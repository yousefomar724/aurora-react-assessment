import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircle,
  Droplets,
  Thermometer,
  Wind,
  Sun,
  Cloud,
  Eye,
  Compass,
  ArrowLeft,
  Moon,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useWeatherDetails } from "@/hooks/useWeather";
import { format } from "date-fns";
import { WeatherData } from "@/types/weather";
import { Button } from "@/components/ui/button";

export default function WeatherDetails() {
  const navigate = useNavigate();
  // Extract city from URL parameters
  const { city } = useParams<{ city: string }>();
  // Extract latitude and longitude from URL search params
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  // Fetch weather details using custom hook
  const { data, isLoading, error } = useWeatherDetails(
    city as string,
    parseFloat(lat as string),
    parseFloat(lon as string)
  );

  // Handler for the back button
  const handleBack = () => {
    navigate(-1);
  };

  // Show loading skeleton while data is being fetched
  if (isLoading) return <WeatherDetailsSkeleton />;
  // Show error message if there's an error
  if (error) return <WeatherDetailsError error={error} />;
  // Return null if there's no data
  if (!data) return null;

  // Extract current weather from the first item in the list
  const currentWeather = data.list[0];

  return (
    <div className="container mx-auto p-4">
      {/* Back button */}
      <Button
        onClick={handleBack}
        className="mb-4 flex items-center"
        variant="outline"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      {/* City name and country */}
      <h1 className="text-2xl mb-6">
        Weather Details for{" "}
        <span className="text-primary font-bold text-3xl">
          {data.city.name}
        </span>
        ,{" "}
        <span className="text-primary font-bold text-3xl">
          {data.city.country}
        </span>
      </h1>

      {/* Grid for current weather details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Temperature card */}
        <WeatherCard
          title="Temperature"
          value={`${currentWeather.main.temp.toFixed(1)}°C`}
          icon={<Thermometer className="h-6 w-6" />}
          description={`Feels like ${currentWeather.main.feels_like.toFixed(
            1
          )}°C`}
        />
        {/* Weather description card */}
        <WeatherCard
          title="Weather"
          value={currentWeather.weather[0].description}
          icon={
            <img
              src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`}
              alt="Weather icon"
              className="h-10 w-10"
            />
          }
        />
        {/* Humidity card */}
        <WeatherCard
          title="Humidity"
          value={`${currentWeather.main.humidity}%`}
          icon={<Droplets className="h-6 w-6" />}
        />
        {/* Wind card */}
        <WeatherCard
          title="Wind"
          value={`${currentWeather.wind.speed.toFixed(1)} m/s`}
          icon={<Wind className="h-6 w-6" />}
          description={`Direction: ${getWindDirection(
            currentWeather.wind.deg
          )}`}
        />
        {/* Visibility card */}
        <WeatherCard
          title="Visibility"
          value={`${(currentWeather.visibility / 1000).toFixed(1)} km`}
          icon={<Eye className="h-6 w-6" />}
        />
        {/* Pressure card */}
        <WeatherCard
          title="Pressure"
          value={`${currentWeather.main.pressure} hPa`}
          icon={<Compass className="h-6 w-6" />}
        />
        {/* Sunrise card */}
        <WeatherCard
          title="Sunrise"
          value={format(new Date(data.city.sunrise * 1000), "HH:mm")}
          icon={<Sun className="h-6 w-6" />}
        />
        {/* Sunset card */}
        <WeatherCard
          title="Sunset"
          value={format(new Date(data.city.sunset * 1000), "HH:mm")}
          icon={<Moon className="h-6 w-6" />}
        />
        {/* Cloudiness card */}
        <WeatherCard
          title="Cloudiness"
          value={`${currentWeather.clouds.all}%`}
          icon={<Cloud className="h-6 w-6" />}
        />
      </div>

      {/* 5-Day Forecast section */}
      <h2 className="text-2xl font-bold mt-8 mb-4">5-Day Forecast</h2>
      {/* Create a responsive grid for the 5-day forecast */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {data.list
          // Filter the forecast data to get one entry per day
          // Assuming data is provided every 3 hours, we select every 8th item (24 hours / 3 = 8)
          .filter((_, index) => index % 8 === 0)
          // Map over the filtered forecast data to create ForecastCard components
          .map((forecast, index) => (
            <ForecastCard
              // Provide a unique key for each card (React requirement)
              key={index}
              // Pass the forecast data to the ForecastCard component
              forecast={forecast}
            />
          ))}
      </div>
    </div>
  );
}

// Component for displaying individual weather details
const WeatherCard = ({
  title,
  value,
  icon,
  description,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </CardContent>
  </Card>
);

// Component for displaying forecast for a single day
const ForecastCard = ({ forecast }: { forecast: WeatherData }) => (
  <Card>
    <CardHeader className="flex flex-col items-center space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">
        {format(new Date(forecast.dt * 1000), "EEE, MMM d")}
      </CardTitle>
      <img
        src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
        alt="Weather icon"
        className="h-10 w-10"
      />
    </CardHeader>
    <CardContent className="text-center">
      <div className="text-xl font-bold">{forecast.main.temp.toFixed(1)}°C</div>
      <p className="text-xs text-muted-foreground">
        {forecast.weather[0].description}
      </p>
    </CardContent>
  </Card>
);

// Component for displaying a loading skeleton
const WeatherDetailsSkeleton = () => (
  <div className="container mx-auto p-4">
    <Skeleton className="h-10 w-64 mb-6" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-32" />
      ))}
    </div>
  </div>
);

// Component for displaying error messages
const WeatherDetailsError = ({ error }: { error: Error }) => (
  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
      Failed to fetch weather details: {error.message}
    </AlertDescription>
  </Alert>
);

// Helper function to convert wind direction in degrees to cardinal directions
const getWindDirection = (deg: number): string => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return directions[Math.round(deg / 45) % 8];
};
