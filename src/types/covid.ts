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
  };
}
