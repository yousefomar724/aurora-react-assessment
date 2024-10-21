export interface WeatherData {
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    grnd_level: number;
    sea_level: number;
    temp_kf: number;
  };
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  visibility: number;
  dt: number;
  dt_txt: string;
  coord: {
    lat: number;
    lon: number;
  };
}

export interface WeatherDetailsData {
  list: WeatherData[];
  message: number;
  cod: string;
  cnt: number;
  city: {
    coord: { lat: number; lon: number };
    country: string;
    id: number;
    name: string;
    population: number;
    sunrise: number;
    sunset: number;
    timezone: number;
  };
}

export interface WeatherError {
  message: string;
}
