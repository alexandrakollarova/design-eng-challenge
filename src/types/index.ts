export interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  price?: number;
  rating?: number;
  imageUrl?: string;
  createdAt: string;
  featured?: boolean;
}

export interface SearchFilters {
  query: string;
  categories: string[];
  tags: string[];
  priceRange?: {
    min?: number;
    max?: number;
  };
  sortBy: 'relevance' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  featured?: boolean;
  ratings?: number[];
  newArrivals?: boolean;
  bestSellers?: boolean;
}

export interface SearchResponse {
  items: SearchItem[];
  total: number;
  suggestions: string[];
  facets: {
    categories: Array<{ name: string; count: number }>;
    tags: Array<{ name: string; count: number }>;
    priceRange: { min: number; max: number };
  };
}

export interface SearchState {
  filters: SearchFilters;
  results: SearchItem[];
  loading: boolean;
  error: string | null;
  suggestions: string[];
  facets: SearchResponse['facets'];
}

// Add src/components types

export interface RecentSuggestionsProps {
  suggestions: string[];
  activeSuggestion: number;
  onSuggestionClick: (suggestion: string) => void;
  onSuggestionHover?: (index: number) => void;
}

export interface SearchResultsProps {
  filters: SearchFilters;
  onFiltersChange: (newFilters: Partial<SearchFilters>) => void;
  results: SearchResponse | null;
  loading: boolean;
  error: string | null;
  called: boolean;
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SearchResultsGridProps {
  items: SearchItem[];
  loading: boolean;
  error: string | null;
  called: boolean;
}

export interface SearchResultCardProps {
  item: SearchItem;
}

export interface SearchFiltersPanelProps {
  filters: SearchFilters;
  facets?: SearchResponse["facets"];
  onChange: (filters: Partial<SearchFilters>) => void;
} 