"use client";

import { SearchResultsGridProps } from "@/types";
import SearchResultCard from "./SearchResultCard";
import Spinner from "../design-system/components/Spinner";
import Alert from "../design-system/components/Alert";
import EmptyState from "./EmptyState";
import { motion, AnimatePresence } from "framer-motion";

/**
 * SearchResultsGrid component for displaying a grid of search results.
 * @param {SearchResultsGridProps} props
 */

/**
 * Props for SearchResultsGrid component.
 * @typedef {Object} Props
 * @property {SearchItem[]} items - Array of search result items.
 * @property {boolean} loading - Loading state.
 * @property {string|null} error - Error message.
 * @property {boolean} called - Whether a search has been performed.
 */

export default function SearchResultsGrid({ items, loading, error, called }: SearchResultsGridProps) {
  // --- Early returns ---
  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }
  if (!items.length) {
    if (called) {
      return <EmptyState message="No results found" />;
    } else {
      return null;
    }
  }
  // --- Render ---
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      role="list"
      aria-label="Search results"
    >
      <AnimatePresence initial={false}>
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <SearchResultCard
              aria-posinset={i + 1}
              aria-setsize={items.length}
              item={item}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
} 