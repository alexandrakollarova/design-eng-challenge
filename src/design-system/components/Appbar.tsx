import React from 'react';

/**
 * Appbar component for top navigation/header bar.
 * @param {AppbarProps} props - Appbar properties
 */

interface AppbarProps {
  title: string;
  right?: React.ReactNode;
}

/**
 * Props for Appbar component.
 * @typedef {Object} AppbarProps
 * @property {string} title - The title to display in the Appbar.
 * @property {React.ReactNode} [right] - Optional right-side content.
 */

export default function Appbar({ title, right }: AppbarProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 relative z-40 mt-8 border-b border-gray-200 fixed top-0 left-0 w-full">
      <h1 className="text-xl font-bold text-primary">{title}</h1>
      {right && <div>{right}</div>}
    </header>
  );
} 