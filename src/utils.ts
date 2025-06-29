/**
 * Returns true if the given createdAt date is within the last 30 days.
 * @param createdAt - ISO date string representing the item's creation date
 */
export function isNewItem(createdAt?: string): boolean {
    if (!createdAt) return false;
    const created = new Date(createdAt);
    const now = new Date();
    const diffDays = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays <= 30;
  } 

/**
 * Uppercases the first character of a string.
 * @param str - The string to capitalize
 * @returns The string with the first character uppercased
 */
export function upperFirst(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Options for sorting items in the UI.
 * @type {{ value: string; label: string }[]}
 * @property {string} value - The sort key.
 * @property {string} label - The label to display for the sort option.
 */
export const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Rating" },
  { value: "newest", label: "Newest" },
]; 