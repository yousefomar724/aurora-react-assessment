import React, { useState, useCallback } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface WeatherSearchProps {
  onSearch: (city: string) => void;
}

export const WeatherSearch: React.FC<WeatherSearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const handleSearch = useCallback(() => {
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setRecentSearches((prev) => {
        const updated = [
          searchTerm,
          ...prev.filter((s) => s !== searchTerm),
        ].slice(0, 5);
        return updated;
      });
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
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => onSearch(city)}
              >
                {city}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
