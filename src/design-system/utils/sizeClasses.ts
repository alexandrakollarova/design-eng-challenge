export type Size = "sm" | "md" | "lg";

export const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm h-10",
  md: "px-8 py-4 text-base h-12",
  lg: "px-16 px-8 text-lg h-16",
}; 