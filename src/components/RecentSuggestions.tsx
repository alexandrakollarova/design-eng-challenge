import { HistoryIcon } from 'lucide-react';
import React from 'react';
import { baseLabelStyle } from '../design-system/utils/baseLabelStyle';
import type { RecentSuggestionsProps } from '@/types';

/**
 * Props for RecentSuggestions component.
 * @typedef {Object} RecentSuggestionsProps
 * @property {string[]} suggestions - List of recent suggestions.
 * @property {number} activeSuggestion - Index of the currently active suggestion.
 * @property {function} onSuggestionClick - Callback when a suggestion is clicked.
 * @property {function} [onSuggestionHover] - Callback when a suggestion is hovered.
 */

/**
 * RecentSuggestions component displays a list of recent search suggestions.
 * @param {RecentSuggestionsProps} props
 */
export default function RecentSuggestions({ suggestions, activeSuggestion, onSuggestionClick, onSuggestionHover }: RecentSuggestionsProps) {
  // --- Render ---
  return (
    <div className="absolute z-10 left-0 right-0 bg-white dark:bg-card border border-gray-200 dark:border-card-border rounded-xl shadow-lg mt-2 max-h-96 overflow-auto">
      <div className="px-6 pt-4 pb-2 text-sm font-bold text-gray-500 tracking-widest uppercase">Recent</div>
      <ul id="search-suggestions" role="listbox">
        {suggestions.map((s, i) => (
          <li
            id={`suggestion-${i}`}
            key={s}
            className={
              [
                baseLabelStyle,
                "flex items-center gap-4 px-6 py-3 cursor-pointer transition rounded-lg mb-2 last:mb-0",
                i === activeSuggestion
                  ? "font-bold bg-gray-100 dark:bg-gray-800"
                  : "hover:bg-gray-50 dark:hover:bg-gray-900"
              ].join(' ')
            }
            onMouseDown={() => onSuggestionClick(s)}
            onMouseEnter={() => onSuggestionHover && onSuggestionHover(i)}
            role="option"
            aria-selected={i === activeSuggestion}
          >
            <HistoryIcon size={18} className="text-gray-400 shrink-0" />
            <span className="flex-1 text-base font-medium text-gray-900 dark:text-gray-100">{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
} 