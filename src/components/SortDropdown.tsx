import React from "react";
import CustomSelect from "../design-system/components/CustomSelect";
import { sortOptions } from "../utils";
import { SearchFilters } from "@/types";

/**
 * Props for SortDropdown component.
 */
export interface SortDropdownProps {
  value: SearchFilters["sortBy"];
  onChange: (value: SearchFilters["sortBy"]) => void;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
  optionsAlign?: "left" | "right";
}

/**
 * SortDropdown wraps CustomSelect for search sort options.
 * @param {SortDropdownProps} props
 */
export default function SortDropdown({ value, onChange, size = "sm", fullWidth = false, className = "", optionsAlign = "right" }: SortDropdownProps) {
  return (
    <CustomSelect
      value={value}
      onChange={val => onChange(val as SearchFilters["sortBy"])}
      options={sortOptions}
      size={size}
      fullWidth={fullWidth}
      className={className}
      optionsAlign={optionsAlign}
    />
  );
} 