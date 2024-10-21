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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const handleCountrySelect = (country: string) => () => onSelect(country);

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search countries..."
        value={search}
        onChange={handleSearchChange}
        className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
      />
      {isLoading && <Loader title="Loading countries..." />}
      {error && (
        <Error
          title="Error loading countries"
          message={(error as Error).message}
        />
      )}
      <ul className="mt-2 max-h-60 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded">
        {filteredCountries?.map((country) => (
          <li
            key={country.country}
            onClick={handleCountrySelect(country.country)}
            className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-900 dark:text-gray-100"
            tabIndex={0}
            role="button"
            aria-label={`Select ${country.country}`}
            onKeyDown={(e) =>
              e.key === "Enter" && handleCountrySelect(country.country)()
            }
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
