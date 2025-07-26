'use client';

import { X } from 'lucide-react';
import { FilterState } from '@/types/filters';

interface FilterChipsProps {
  filters: FilterState;
  onRemoveFilter: (filterType: string, value: string) => void;
  onClearAll: () => void;
}

interface FilterChip {
  type: string;
  value: string;
  label: string;
}

const MEDIA_TYPE_LABELS: Record<string, string> = {
  films: 'Films',
  tvShows: 'TV Shows',
  shortFilms: 'Short Films',
  videoGames: 'Video Games',
  parkAttractions: 'Park Attractions'
};

const CHARACTER_TYPE_LABELS: Record<string, string> = {
  princess: 'Princess',
  villain: 'Villain',
  animal: 'Animal',
  sidekick: 'Sidekick',
  main: 'Main Character',
  other: 'Other'
};

export const FilterChips = ({ filters, onRemoveFilter, onClearAll }: FilterChipsProps) => {
  const chips: FilterChip[] = [];

  // Media type chips
  filters.mediaTypes.forEach(type => {
    chips.push({
      type: 'mediaType',
      value: type,
      label: MEDIA_TYPE_LABELS[type] || type
    });
  });

  // Character type chips
  filters.characterTypes.forEach(type => {
    chips.push({
      type: 'characterType',
      value: type,
      label: CHARACTER_TYPE_LABELS[type] || type
    });
  });

  // Year range chip
  if (filters.yearRange.min || filters.yearRange.max) {
    const minYear = filters.yearRange.min || 'Any';
    const maxYear = filters.yearRange.max || 'Any';
    chips.push({
      type: 'yearRange',
      value: 'range',
      label: `Year: ${minYear} - ${maxYear}`
    });
  }

  // Alphabet range chip
  if (filters.alphabetRange.start || filters.alphabetRange.end) {
    const startLetter = filters.alphabetRange.start?.toUpperCase() || 'A';
    const endLetter = filters.alphabetRange.end?.toUpperCase() || 'Z';
    chips.push({
      type: 'alphabetRange',
      value: 'range',
      label: `Name: ${startLetter} - ${endLetter}`
    });
  }

  if (chips.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <span className="text-sm text-gray-600 font-medium">Active filters:</span>
      
      {chips.map((chip, index) => (
        <div
          key={`${chip.type}-${chip.value}-${index}`}
          className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
        >
          <span>{chip.label}</span>
          <button
            onClick={() => onRemoveFilter(chip.type, chip.value)}
            className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
            aria-label={`Remove ${chip.label} filter`}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
      
      {chips.length > 1 && (
        <button
          onClick={onClearAll}
          className="text-sm text-gray-500 hover:text-gray-700 font-medium underline transition-colors"
        >
          Clear all
        </button>
      )}
    </div>
  );
};