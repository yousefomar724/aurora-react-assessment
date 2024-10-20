import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../shared/loader";
import Error from "../shared/error";

interface CountrySelectProps {
  onSelect: (country: string) => void;
}

interface Country {
  country: string;
  countryInfo: {
    flag: string;
  };
}

export default function CountrySelect({ onSelect }: CountrySelectProps) {
  const [search, setSearch] = useState("");

  const {
    data: countries,
    isLoading,
    error,
  } = useQuery<Country[]>({
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

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search countries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded"
      />
      {isLoading && <Loader title="Loading countries..." />}
      {error && (
        <Error title="Error loading countries" message={error.message} />
      )}
      <ul className="mt-2 max-h-60 overflow-y-auto">
        {filteredCountries?.map((country) => (
          <li
            key={country.country}
            onClick={() => onSelect(country.country)}
            className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
          >
            <img
              src={country.countryInfo.flag}
              alt={`${country.country} flag`}
              className="w-6 h-4 mr-2"
            />
            {country.country}
          </li>
        ))}
      </ul>
    </div>
  );
}
