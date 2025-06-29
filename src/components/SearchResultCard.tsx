"use client";

import { SearchResultCardProps } from "@/types";
import Tag from "../design-system/components/Tag";
import { HeartIcon } from "lucide-react";
import { isNewItem } from "../utils";
import Tooltip from "../design-system/components/Tooltip";
import { useState } from "react";

/**
 * SearchResultCard component for displaying a single search result item.
 * @param {SearchResultCardProps} props
 */

/**
 * Props for SearchResultCard component.
 * @typedef {Object} Props
 * @property {SearchItem} item - The search result item to display.
 */

export default function SearchResultCard({ item }: SearchResultCardProps) {
  // --- State ---
  const [showTooltip, setShowTooltip] = useState(false);

  // --- Derived values ---
  const isNew = isNewItem(item.createdAt);

  // --- Event handlers ---
  const handleMouseEnter = () => setShowTooltip(true);
  const handleMouseLeave = () => setShowTooltip(false);

  // --- Render ---
  return (
    <div className="cursor-pointer">
      <div
        className="relative w-full aspect-[3/4] max-h-[280px] md:max-h-none flex items-center justify-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {item.imageUrl && (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        
       {isNew && (
         <span className="absolute top-3 left-3 z-10">
         <Tag variant="primary" subtle>NEW</Tag>
       </span>
       )}
        
        <button className="absolute top-3 right-3 bg-white/80 rounded-full p-1 shadow hover:bg-white cursor-pointer">
          <HeartIcon size={20} className="text-gray-800 group-hover:text-primary transition" />
        </button>
        <Tooltip show={showTooltip} className="left-0 right-0 bottom-0 top-auto w-full text-center rounded-none">Add to cart</Tooltip>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <div className="text-base font-bold text-text dark:text-text-light line-clamp-2 mb-1" tabIndex={-1}>
          {item.title}
        </div>

        <div className="text-sm mb-1 line-clamp-2">{item.description}</div>
        <div className="font-bold text-base">{item.price !== undefined ? `$${item.price}` : ""}</div>
      </div>
    </div>
  );
} 