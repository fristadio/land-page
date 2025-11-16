import { useState, useEffect, useRef } from "react";
import { Search, X, MapPin, Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface City {
  name: string;
  country: string;
  displayName: string;
}

interface CityAutocompleteProps {
  selectedCities: string[];
  onCitiesChange: (cities: string[]) => void;
  maxCities?: number;
  placeholder?: string;
  lang?: 'pt' | 'en';
}

export function CityAutocomplete({ 
  selectedCities, 
  onCitiesChange, 
  maxCities = 5,
  placeholder,
  lang = 'pt'
}: CityAutocompleteProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<NodeJS.Timeout>();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const labels = {
    pt: {
      placeholder: placeholder || "Digite o nome de uma cidade...",
      noResults: "Nenhuma cidade encontrada",
      error: "Erro ao buscar cidades. Tente novamente.",
      maxReached: `Máximo de ${maxCities} cidades atingido`,
      selected: "Cidades selecionadas:"
    },
    en: {
      placeholder: placeholder || "Type a city name...",
      noResults: "No cities found",
      error: "Error fetching cities. Try again.",
      maxReached: `Maximum of ${maxCities} cities reached`,
      selected: "Selected cities:"
    }
  };

  const t = labels[lang];

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch cities from Nominatim API
  const fetchCities = async (searchQuery: string) => {
    if (!searchQuery || searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Nominatim rate limit: 1 request/second
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
        `q=${encodeURIComponent(searchQuery)}&` +
        `format=json&` +
        `limit=10&` +
        `addressdetails=1&` +
        `featuretype=city`,
        {
          headers: {
            'User-Agent': 'Fristad/1.0 (contato@fristad.com.br)'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch cities');
      }

      const data = await response.json();
      
      // Filter and format results to show only cities/towns
      const cities: City[] = data
        .filter((item: any) => 
          item.type === 'city' || 
          item.type === 'town' || 
          item.type === 'municipality' ||
          item.class === 'place'
        )
        .map((item: any) => {
          const city = item.address?.city || 
                      item.address?.town || 
                      item.address?.municipality ||
                      item.name;
          const country = item.address?.country || '';
          
          return {
            name: city,
            country: country,
            displayName: `${city}${country ? ', ' + country : ''}`
          };
        })
        .filter((city: City, index: number, self: City[]) => 
          // Remove duplicates
          index === self.findIndex(c => c.displayName === city.displayName)
        )
        .slice(0, 8); // Limit to 8 suggestions

      setSuggestions(cities);
      setShowSuggestions(true);
    } catch (err) {
      console.error('Error fetching cities:', err);
      setError(t.error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Respect Nominatim rate limit (1 req/sec)
    debounceRef.current = setTimeout(() => {
      fetchCities(query);
    }, 1000);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  const handleSelectCity = (city: City) => {
    if (selectedCities.length >= maxCities) {
      return;
    }

    if (!selectedCities.includes(city.displayName)) {
      onCitiesChange([...selectedCities, city.displayName]);
    }

    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleRemoveCity = (cityToRemove: string) => {
    onCitiesChange(selectedCities.filter(city => city !== cityToRemove));
  };

  const canAddMore = selectedCities.length < maxCities;

  return (
    <div className="space-y-3">
      {/* Selected cities chips */}
      {selectedCities.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedCities.map((city) => (
            <div
              key={city}
              className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
            >
              <MapPin className="w-3 h-3" />
              <span>{city}</span>
              <button
                type="button"
                onClick={() => handleRemoveCity(city)}
                className="ml-1 hover:text-primary/70 transition-colors"
                aria-label={`Remove ${city}`}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Search input */}
      <div className="relative" ref={wrapperRef}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length >= 2 && setShowSuggestions(true)}
            placeholder={canAddMore ? t.placeholder : t.maxReached}
            disabled={!canAddMore}
            className="pl-10 pr-10"
          />
          {loading && (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />
          )}
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && canAddMore && (
          <div className="absolute z-50 w-full mt-1 bg-background border rounded-lg shadow-lg max-h-64 overflow-y-auto">
            {error && (
              <div className="p-3 text-sm text-destructive">{error}</div>
            )}
            
            {!error && suggestions.length === 0 && !loading && query.length >= 2 && (
              <div className="p-3 text-sm text-muted-foreground">{t.noResults}</div>
            )}
            
            {!error && suggestions.length > 0 && (
              <ul>
                {suggestions.map((city, index) => (
                  <li key={`${city.displayName}-${index}`}>
                    <button
                      type="button"
                      onClick={() => handleSelectCity(city)}
                      className="w-full text-left px-3 py-2 hover:bg-muted transition-colors flex items-center gap-2"
                      disabled={selectedCities.includes(city.displayName)}
                    >
                      <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">
                          {city.name}
                        </div>
                        {city.country && (
                          <div className="text-xs text-muted-foreground truncate">
                            {city.country}
                          </div>
                        )}
                      </div>
                      {selectedCities.includes(city.displayName) && (
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Helper text */}
      <p className="text-xs text-muted-foreground">
        {selectedCities.length}/{maxCities} {lang === 'pt' ? 'cidades selecionadas' : 'cities selected'}
      </p>
    </div>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

