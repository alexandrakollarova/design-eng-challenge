import React from "react";

/**
 * Props for FilterSummary component.
 */
export interface FilterSummaryProps {
  summary?: React.ReactNode;
  className?: string;
}

/**
 * FilterSummary displays a summary of selected filters if present.
 * @param {FilterSummaryProps} props
 */
export default function FilterSummary({ summary, className = "" }: FilterSummaryProps) {
  if (!summary) return null;
  return (
    <div className={`text-sm text-gray-600 font-normal mb-2 ${className}`}>{summary}</div>
  );
} 