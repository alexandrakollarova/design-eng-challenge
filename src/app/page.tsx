'use client'

import { useState, useEffect, useRef } from 'react';
import Appbar from '@/design-system/components/Appbar';
import ThemeToggle from '@/design-system/components/ThemeToggle';
import { Search as SearchIcon } from 'lucide-react';
import SearchResults from '@/components/SearchResults';
import { SearchResponse, SearchFilters } from '@/types';
import Search from '@/design-system/components/Search';
import RecentSuggestions from '../components/RecentSuggestions';
import Banner from '@/design-system/components/Banner';
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    categories: [],
    tags: [],
    priceRange: undefined,
    sortBy: 'relevance',
    featured: undefined,
  });
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeSuggestion, setActiveSuggestion] = useState<number>(-1);
  const [called, setCalled] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Fetch search results
  useEffect(() => {
    setLoading(true);
    setError(null);
    setCalled(true);
    const params = new URLSearchParams();
    if (filters.query) params.append('query', filters.query);
    if (filters.categories.length) params.append('category', filters.categories[0]);
    if (filters.tags.length) params.append('tags', filters.tags.join(','));
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.priceRange) {
      if (filters.priceRange.min !== undefined) params.append('minPrice', String(filters.priceRange.min));
      if (filters.priceRange.max !== undefined) params.append('maxPrice', String(filters.priceRange.max));
    }
    if (filters.featured !== undefined) params.append('featured', String(filters.featured));
    if (filters.ratings && filters.ratings.length) params.append('ratings', filters.ratings.join(','));
    if (filters.newArrivals) params.append('newArrivals', 'true');
    if (filters.bestSellers) params.append('bestSellers', 'true');

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?${params.toString()}`);
        const data: SearchResponse = await res.json();
        setResults(data);
        setSuggestions(data.suggestions);
      } catch (e) {
        setError('Failed to fetch results');
      } finally {
        setLoading(false);
      }
    }, 300);
     
  }, [filters]);

  // --- Initialize filters from URL on mount ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialFilters: SearchFilters = {
      query: params.get("query") || "",
      categories: params.get("category") ? [params.get("category")!] : [],
      tags: params.get("tags") ? params.get("tags")!.split(",") : [],
      priceRange: params.get("minPrice") || params.get("maxPrice") ? {
        min: params.get("minPrice") ? Number(params.get("minPrice")) : undefined,
        max: params.get("maxPrice") ? Number(params.get("maxPrice")) : undefined,
      } : undefined,
      sortBy: (params.get("sortBy") as SearchFilters["sortBy"]) || "relevance",
      featured: params.get("featured") ? params.get("featured") === "true" : undefined,
      ratings: params.get("ratings") ? params.get("ratings")!.split(",").map(Number) : [],
      newArrivals: params.get("newArrivals") === "true" ? true : undefined,
      bestSellers: params.get("bestSellers") === "true" ? true : undefined,
    };
    setFilters(initialFilters);
  }, []);

  // --- Update URL when filters change ---
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.query) params.set("query", filters.query);
    if (filters.categories.length) params.set("category", filters.categories[0]);
    if (filters.tags.length) params.set("tags", filters.tags.join(","));
    if (filters.sortBy) params.set("sortBy", filters.sortBy);
    if (filters.priceRange) {
      if (filters.priceRange.min !== undefined) params.set("minPrice", String(filters.priceRange.min));
      if (filters.priceRange.max !== undefined) params.set("maxPrice", String(filters.priceRange.max));
    }
    if (filters.featured !== undefined) params.set("featured", String(filters.featured));
    if (filters.ratings && filters.ratings.length) params.set("ratings", filters.ratings.join(","));
    if (filters.newArrivals) params.set("newArrivals", "true");
    if (filters.bestSellers) params.set("bestSellers", "true");
    const url = `?${params.toString()}`;
    router.replace(url, { scroll: false });
  }, [filters, router]);

  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((f) => ({ ...f, query: e.target.value }));
    setShowSuggestions(true);
  };
  const handleSuggestionClick = (suggestion: string) => {
    setFilters((f) => ({ ...f, query: suggestion }));
    setShowSuggestions(false);
  };
  const handleFiltersChange = (newFilters: Partial<SearchFilters>) => {
    setFilters((f) => ({ ...f, ...newFilters }));
  };
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || !suggestions.length) return;
    if (e.key === 'ArrowDown') {
      setActiveSuggestion((prev) => Math.min(prev + 1, suggestions.length - 1));
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      setActiveSuggestion((prev) => Math.max(prev - 1, 0));
      e.preventDefault();
    } else if (e.key === 'Enter' && activeSuggestion >= 0) {
      handleSuggestionClick(suggestions[activeSuggestion]);
      e.preventDefault();
    }
  };
  useEffect(() => {
    setActiveSuggestion(-1);
  }, [filters.query, showSuggestions]);

  return (
    <>
      {!mobileFiltersOpen && <Banner title="Free shipping on 4th of July" />}
      <Appbar
        title="shop"
        right={<ThemeToggle />}
      />
      <main className="flex flex-col min-h-screen w-4/5 mx-auto">
        <div className="flex-1 flex flex-col w-full max-w-6xl mx-auto">
          <div className="relative mt-4 mb-4">
            <Search
              ref={inputRef}
              className="pr-12"
              placeholder="Search"
              value={filters.query}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              onKeyDown={handleInputKeyDown}
              aria-label="Search"
              aria-autocomplete="list"
              aria-controls="search-suggestions"
              aria-activedescendant={activeSuggestion >= 0 ? `suggestion-${activeSuggestion}` : undefined}
              leftIcon={<SearchIcon size={20} />}
              fullWidth
            />

            {/* Suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <RecentSuggestions
                suggestions={suggestions}
                activeSuggestion={activeSuggestion}
                onSuggestionClick={handleSuggestionClick}
                onSuggestionHover={setActiveSuggestion}
              />
            )}
          </div>

          <div className="text-white dark:text-primary">Test</div>

          <SearchResults
            filters={filters}
            onFiltersChange={handleFiltersChange}
            results={results}
            loading={loading}
            error={error}
            called={called}
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
          />
        </div>
      </main>
    </>
  );
}
