import React, { useState, useCallback } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface WeatherSearchProps {
  onSearch: (city: string, isNewSearch: boolean) => void;
  recentSearches: string[];
  onDelete: (city: string) => void;
}

export const WeatherSearch: React.FC<WeatherSearchProps> = ({
  onSearch,
  recentSearches,
  onDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = useCallback(() => {
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim(), true);
      setSearchTerm("");
    }
  }, [searchTerm, onSearch]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Enter city name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Search for a city"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      {recentSearches.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold mb-2">Recent Searches:</h3>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((city, index) => (
              <div
                key={index}
                className="flex items-center bg-secondary rounded-md"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSearch(city, false)}
                  className="px-2 py-1"
                >
                  {city}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(city)}
                  className="px-1 py-1 text-destructive hover:text-destructive"
                  aria-label={`Remove ${city} from recent searches`}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
