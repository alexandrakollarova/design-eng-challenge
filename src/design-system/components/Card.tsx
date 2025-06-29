import React from "react";
import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

/**
 * Card component for content containers with optional shadow and padding.
 * @param {CardProps} props - Card properties
 */

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  shadow?: boolean;
  padding?: boolean;
}

/**
 * Props for Card component.
 * @typedef {Object} CardProps
 * @property {ReactNode} children - Card content.
 * @property {boolean} [shadow] - Show shadow.
 * @property {boolean} [padding] - Add padding.
 * @property {string} [className] - Additional class names.
 */

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, shadow = true, padding = true, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(
        "bg-surface dark:bg-surface-dark rounded-lg",
        shadow && "shadow-lg hover:shadow-lg transition",
        padding && "p-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
Card.displayName = "Card";

export default Card; 