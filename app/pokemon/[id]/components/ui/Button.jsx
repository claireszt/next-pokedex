import React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

export function ToggleCategory({ onClick, category, title }) {
  return (
    <button onClick={onClick} className="bg-gray-200 flex items-center justify-center">
      <span className="mr-2">{category ? `${title}` : `${title}`}</span>
      {category ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
    </button>
  );
}
