import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../shared/loader";
import Error from "../shared/error";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { CountryCovidStats } from "@/types/covid";

interface CountrySelectProps {
  onSelect: (country: string) => void;
}

export default function CountrySelect({ onSelect }: CountrySelectProps) {
  const [search, setSearch] = useState("");

  const {
    data: countries,
    isLoading,
    error,
  } = useQuery<CountryCovidStats[]>({
    queryKey: ["countries"],
    queryFn: async () => {
      const response = await axios.get(
        "https://disease.sh/v3/covid-19/countries"
      );
      return response.data;
    },
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });

  const filteredCountries = countries?.filter((country) =>
    country.country.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const handleCountrySelect = (country: string) => () => onSelect(country);

  return (
    <div className="mb-4">
      <Input
        type="text"
        placeholder="Search countries..."
        value={search}
        onChange={handleSearchChange}
      />
      {isLoading && <Loader title="Loading countries..." />}
      {error && (
        <Error
          title="Error loading countries"
          message={(error as Error).message}
        />
      )}
      <ScrollArea className="h-[200px] mt-2 rounded-md border">
        {filteredCountries?.map((country) => (
          <Button
            key={country.country}
            variant="ghost"
            className="w-full justify-start"
            onClick={handleCountrySelect(country.country)}
          >
            <img
              src={country.countryInfo.flag}
              alt={`${country.country} flag`}
              className="w-6 h-4 mr-2"
            />
            {country.country}
          </Button>
        ))}
      </ScrollArea>
    </div>
  );
}
