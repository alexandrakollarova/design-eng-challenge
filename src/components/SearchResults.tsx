"use client";

import { SearchResultsProps } from "@/types";
import SearchFiltersPanel from "./SearchFiltersPanel";
import SearchResultsGrid from "./SearchResultsGrid";
import { baseInputStyle } from "../design-system/utils/baseInputStyle";
import Drawer from "../design-system/components/Drawer";
import SortDropdown from "./SortDropdown";

/**
 * Props for SearchResults component.
 * @typedef {Object} SearchResultsProps
 * @property {SearchFilters} filters - The current filter state.
 * @property {function} onFiltersChange - Callback when filters change.
 * @property {SearchResponse|null} results - Search results data.
 * @property {boolean} loading - Loading state.
 * @property {string|null} error - Error message.
 * @property {boolean} called - Whether a search has been performed.
 * @property {boolean} mobileFiltersOpen - Whether the mobile filters drawer is open.
 * @property {function} setMobileFiltersOpen - Function to set the mobile filters drawer state.
 */

/**
 * SearchResults component for displaying search results and filters.
 * @param {SearchResultsProps} props
 */
const sizeClasses = {
  sm: "py-2 px-3 text-sm min-h-[36px]",
  md: "py-3 px-4 text-base min-h-[44px]",
  lg: "py-4 px-6 text-lg min-h-[52px]",
};

export default function SearchResults({ filters, onFiltersChange, results, loading, error, called, mobileFiltersOpen, setMobileFiltersOpen }: SearchResultsProps) {
  // --- Derived values ---
  const filterCount = [
    filters.categories?.length || 0,
    filters.tags?.length || 0,
    filters.priceRange && (filters.priceRange.min !== undefined || filters.priceRange.max !== undefined) ? 1 : 0,
    filters.featured ? 1 : 0,
    filters.ratings?.length ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  // --- Event handlers ---
  const handleOpenFilters = () => setMobileFiltersOpen(true);
  const handleCloseFilters = () => setMobileFiltersOpen(false);

  // --- Render ---
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div className="text-sm font-medium truncate">
          {results ? (
            <>
              Found <span className="font-bold">{results.total}</span> results{filters.query && (
                <> for <span className="font-semibold">&ldquo;{filters.query}&rdquo;</span></>
              )}
            </>
          ) : null}
        </div>
        <div className="hidden md:block">
          <SortDropdown
            value={filters.sortBy}
            onChange={val => onFiltersChange({ sortBy: val })}
            size="sm"
            fullWidth={false}
            optionsAlign="right"
          />
        </div>
      </div>
      {/* Mobile filter/sort bar */}
      <div className="flex gap-4 mb-4 md:hidden">
       <div className="flex-1">
       <button
          className={`flex-1 flex items-center justify-between w-full font-semibold ${baseInputStyle} ${sizeClasses.sm}`}
          onClick={handleOpenFilters}
          type="button"
        >
          <span className="text-gray-900">FILTERS{filterCount > 0 && <span className="ml-1">({filterCount})</span>}</span>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="ml-2 transition-transform"><path d="M7 10l5 5 5-5" /></svg>
        </button>
       </div>
       <div className="flex-1">
       <SortDropdown
          value={filters.sortBy}
          onChange={val => onFiltersChange({ sortBy: val })}
          size="sm"
          fullWidth
          className="flex-1"
          optionsAlign="right"
        />
       </div>
      </div>
      {/* Responsive layout */}
      <div className="flex gap-8 items-start">
        {/* Desktop sidebar */}
        <aside className="w-60 shrink-0 hidden md:block">
          <SearchFiltersPanel
            filters={filters}
            facets={results?.facets}
            onChange={onFiltersChange}
          />
        </aside>
        <main className="flex-1 min-w-0">
          <SearchResultsGrid
            items={results?.items || []}
            loading={loading}
            error={error}
            called={called}
          />
        </main>
      </div>
      {/* Mobile Filters Drawer */}
      <Drawer open={mobileFiltersOpen} onClose={handleCloseFilters}>
        <SearchFiltersPanel
          filters={filters}
          facets={results?.facets}
          onChange={onFiltersChange}
        />
      </Drawer>
    </>
  );
} 