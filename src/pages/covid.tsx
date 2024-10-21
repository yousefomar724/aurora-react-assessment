import { useState } from "react";
import { useGlobalCovid, useCountryCovid } from "../hooks/useCovid";
import StatsCard from "../components/covid/stats-card";
import CountrySelect from "../components/covid/country-select";
import Loader from "@/components/shared/loader";
import Error from "@/components/shared/error";

export default function CovidPage() {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const {
    data: globalData,
    isLoading: globalLoading,
    error: globalError,
  } = useGlobalCovid();
  const {
    data: countryData,
    isLoading: countryLoading,
    error: countryError,
  } = useCountryCovid(selectedCountry);

  if (globalLoading) return <Loader title="Loading global data..." />;
  if (globalError)
    return (
      <Error title="Error loading global data" message={globalError.message} />
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">COVID-19 Dashboard</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Global Statistics</h2>
        {globalData && <StatsCard stats={globalData} />}
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Country Statistics</h2>
        <CountrySelect onSelect={setSelectedCountry} />
        {selectedCountry && (
          <>
            {countryLoading && <Loader title="Loading country data..." />}
            {countryError && (
              <Error
                title="Error loading country data"
                message={countryError.message}
              />
            )}
            {countryData && <StatsCard stats={countryData} />}
          </>
        )}
      </div>
    </div>
  );
}
