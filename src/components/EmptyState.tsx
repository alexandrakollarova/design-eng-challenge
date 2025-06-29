import React from "react";

/**
 * EmptyState component for displaying empty or no results messages.
 * @param {object} props
 * @param {string} props.message - The message to display.
 * @param {React.ReactNode} [props.icon] - Optional icon to display above the message.
 */
export default function EmptyState({ message, icon }: { message: string; icon?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center text-lg text-gray-400 font-medium gap-4">
      {icon && <div className="mb-2">{icon}</div>}
      <span>{message}</span>
    </div>
  );
} 