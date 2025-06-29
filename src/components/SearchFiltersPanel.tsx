"use client";

import { SearchFiltersPanelProps } from "@/types";
import { useMemo } from "react";
import { XIcon, StarIcon, DollarSign } from "lucide-react";
import Button from "../design-system/components/Button";
import Input from "../design-system/components/Input";
import Checkbox from "../design-system/components/Checkbox";
import Accordion from "../design-system/components/Accordion";
import CheckboxList from "../design-system/components/CheckboxList";
import { upperFirst } from '../utils';
import FilterSummary from "./FilterSummary";

/**
 * SearchFiltersPanel component for displaying and managing search filters.
 * @param {SearchFiltersPanelProps} props
 */
export default function SearchFiltersPanel({ filters, facets, onChange }: SearchFiltersPanelProps) {
  // --- Derived values (hooks) ---
  const hasFilters = Boolean(
    (filters.categories && filters.categories.length > 0) ||
    (filters.tags && filters.tags.length > 0) ||
    (filters.priceRange && (filters.priceRange.min !== undefined || filters.priceRange.max !== undefined)) ||
    filters.featured ||
    (filters.ratings && filters.ratings.length > 0) ||
    filters.newArrivals ||
    filters.bestSellers ||
    (filters.query && filters.query.trim() !== "")
  );

  const categorySummary = useMemo(() => (filters.categories?.length ? filters.categories.map(upperFirst).join(", ") : null), [filters.categories]);
  const tagsSummary = useMemo(() => (filters.tags?.length ? filters.tags.map(upperFirst).join(", ") : null), [filters.tags]);
  const priceSummary = useMemo(() => {
    const min = filters.priceRange?.min;
    const max = filters.priceRange?.max;
    if (min === undefined && max === undefined) return '-';
    if (min !== undefined && max !== undefined) return `$${min} - $${max}`;
    if (min !== undefined) return `Min $${min}`;
    if (max !== undefined) return `Max $${max}`;
    return '-';
  }, [filters.priceRange]);
  const topPicks = [
    filters.featured ? "Featured" : null,
    filters.newArrivals ? "New Arrivals" : null,
    filters.bestSellers ? "Best Sellers" : null,
  ].filter(Boolean);
  const featuredSummary = topPicks.length ? topPicks.join(", ") : null;
  const ratingSummary = filters.ratings?.length ? `${filters.ratings.join(', ')} ★` : null;

  // Prepare options for CheckboxList
  const categoryOptions = [
    { value: "Electronics", label: "Electronics" },
    { value: "Furniture", label: "Furniture" },
  ];
  const tagOptions = facets?.tags.map(tag => ({
    value: tag.name,
    label: <span>{upperFirst(tag.name)} <span className="text-gray-400">({tag.count})</span></span>
  })) || [];
  const ratingOptions = [5, 4, 3, 2, 1].map(stars => ({
    value: stars,
    label: (
      <span className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} size={16} className={i < stars ? "fill-yellow-400 text-yellow-400" : "text-gray-400"} />
        ))}
      </span>
    )
  }));

  // --- Event handlers ---
  const handleCategoryChange = (value: string | number, checked: boolean) => {
    const category = String(value);
    const categories = filters.categories || [];
    onChange({
      categories: checked
        ? [...categories, category]
        : categories.filter((c) => c !== category),
    });
  };

  const handleTagChange = (value: string | number, checked: boolean) => {
    const tag = String(value);
    const tags = filters.tags || [];
    onChange({
      tags: checked
        ? [...tags, tag]
        : tags.filter((t) => t !== tag),
    });
  };

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const num = value === '' ? undefined : Number(value);
    const min = type === 'min' ? num : filters.priceRange?.min;
    const max = type === 'max' ? num : filters.priceRange?.max;
    onChange({ priceRange: { min, max } });
  };

  const handleTopPickChange = (field: 'featured' | 'newArrivals' | 'bestSellers', checked: boolean) => {
    onChange({ [field]: checked });
  };

  const handleRatingChange = (value: string | number, checked: boolean) => {
    const stars = Number(value);
    const ratings = filters.ratings || [];
    onChange({
      ratings: checked
        ? [...ratings, stars]
        : ratings.filter((r) => r !== stars),
    });
  };

  const handleClearAll = () => {
    onChange({
      categories: [],
      tags: [],
      priceRange: undefined,
      featured: undefined,
      ratings: [],
      newArrivals: undefined,
      bestSellers: undefined,
      query: "",
    });
  };

  // --- Render ---
  return (
    <div
      className="flex flex-col gap-4 rounded-lg px-xs py-xs mb-2"
      role="region"
      aria-label="Search filters"
    >
      <div className="mb-2 mt-1">
        <span className="text-sm font-bold uppercase tracking-wider">Filters</span>
      </div>

      {/* Category Accordion */}
      <Accordion title="Category">
        <CheckboxList
          options={categoryOptions}
          selected={filters.categories || []}
          onChange={handleCategoryChange}
          name="Categories"
          className="flex flex-col gap-2"
        />
      </Accordion>
      <FilterSummary summary={categorySummary} />

      {/* Features */}
      <Accordion title="Features">
        <CheckboxList
          options={tagOptions}
          selected={filters.tags || []}
          onChange={handleTagChange}
          name="Tags"
          className="flex flex-col gap-2"
        />
      </Accordion>
      <FilterSummary summary={tagsSummary} />

      {/* Price Range */}
      <Accordion title="Price">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Input
              type="number"
              size="sm"
              leftIcon={<DollarSign size={16} />}
              className="pl-8"
              min={Number(facets?.priceRange.min ?? 0)}
              max={Number(facets?.priceRange.max ?? 1000000)}
              value={filters.priceRange?.min === undefined ? '' : filters.priceRange.min}
              onChange={(e) => handlePriceChange('min', e.target.value)}
              aria-label="Minimum price"
              placeholder="Min"
              fullWidth
            />
            <span className="text-gray-400">-</span>
            <Input
              type="number"
              size="sm"
              leftIcon={<DollarSign size={16} />}
              className="pl-8"
              min={Number(facets?.priceRange.min ?? 0)}
              max={Number(facets?.priceRange.max ?? 1000000)}
              value={filters.priceRange?.max === undefined ? '' : filters.priceRange.max}
              onChange={(e) => handlePriceChange('max', e.target.value)}
              aria-label="Maximum price"
              placeholder="Max"
              fullWidth
            />
          </div>
        </div>
      </Accordion>
      {(filters.priceRange?.min !== undefined || filters.priceRange?.max !== undefined) && (
        <FilterSummary summary={priceSummary} className="flex items-center gap-1" />
      )}

      {/* Top Picks */}
      <Accordion title="Top Picks">
        <div className="flex flex-col gap-2">
          <Checkbox
            id="featured"
            checked={!!filters.featured}
            onChange={(e) => handleTopPickChange('featured', e.target.checked)}
            aria-checked={!!filters.featured}
            label="Featured"
          />
          <Checkbox
            id="top-new"
            checked={!!filters.newArrivals}
            onChange={e => handleTopPickChange('newArrivals', e.target.checked)}
            label="New Arrivals"
          />
          <Checkbox
            id="top-best"
            checked={!!filters.bestSellers}
            onChange={e => handleTopPickChange('bestSellers', e.target.checked)}
            label="Best Sellers"
          />
        </div>
      </Accordion>
      <FilterSummary summary={featuredSummary} />

      {/* Rating Accordion */}
      <Accordion title="Rating">
        <CheckboxList
          options={ratingOptions}
          selected={filters.ratings || []}
          onChange={handleRatingChange}
          name="Ratings"
        />
      </Accordion>
      <FilterSummary summary={ratingSummary} />

      {/* Clear All Filters */}
      <Button
        variant="primary"
        size="sm"
        leftIcon={<XIcon size={20} />}
        className="ml-auto flex items-center gap-1"
        onClick={handleClearAll}
        aria-label="Clear all filters"
        type="button"
        tabIndex={0}
        fullWidth
        disabled={!hasFilters}
      >
        Clear All
      </Button>
    </div>
  );
} 