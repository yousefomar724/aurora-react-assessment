export interface CovidStats {
  cases: number;
  deaths: number;
  recovered: number;
  active: number;
  updated: number;
}

export interface CountryCovidStats extends CovidStats {
  country: string;
  countryInfo: {
    flag: string;
    iso2: string;
    iso3: string;
  };
}

export interface HistoricalData {
  cases: Record<string, number>;
  deaths: Record<string, number>;
  recovered: Record<string, number>;
}

export interface ChartData {
  date: string;
  cases: number;
  deaths: number;
  recovered: number;
}
