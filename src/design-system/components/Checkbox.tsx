import React from "react";
import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { CheckIcon } from "lucide-react";
import { baseLabelStyle } from "../utils/baseLabelStyle";

/**
 * Props for Checkbox component.
 * @typedef {Object} CheckboxProps
 * @property {string} [id] - Checkbox id.
 * @property {string} [label] - Checkbox label.
 * @property {boolean} [checked] - Checked state.
 * @property {boolean} [disabled] - Disabled state.
 * @property {function} [onChange] - Change handler.
 * @property {string} [className] - Additional class names.
 */

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, checked, disabled, ...props }, ref) => (
    <label className={clsx("inline-flex items-center gap-3 cursor-pointer", disabled && "opacity-60 cursor-not-allowed")}> 
      <span className="relative flex items-center justify-center">
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          className="peer appearance-none w-6 h-6 rounded-md border border-primary dark:border-primary bg-white dark:bg-primary checked:bg-primary dark:checked:bg-white checked:border-primary dark:checked:border-white transition-all"
          {...props}
        />
        {/* Checkmark */}
        <CheckIcon
          className="pointer-events-none absolute left-1 top-1 w-4 h-4 opacity-0 peer-checked:opacity-100 transition-opacity text-white"
          strokeWidth={2}
        />
      </span>
      {label && <span className={baseLabelStyle}>{label}</span>}
    </label>
  )
);
Checkbox.displayName = "Checkbox";

export default Checkbox; 