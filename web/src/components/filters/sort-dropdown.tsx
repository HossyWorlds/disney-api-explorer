'use client';

import { useState } from 'react';
import { ChevronDown, ArrowUpDown, Calendar, Star, Hash, Clock } from 'lucide-react';
import { SortOption, SortOptionItem } from '@/types/filters';

interface SortDropdownProps {
  sortBy: SortOption;
  sortOrder: 'asc' | 'desc';
  onSortChange: (sortBy: SortOption, sortOrder: 'asc' | 'desc') => void;
}

const SORT_OPTIONS: SortOptionItem[] = [
  { value: 'name', label: 'Name', icon: Hash },
  { value: 'popularity', label: 'Popularity', icon: Star },
  { value: 'recent', label: 'Recently Added', icon: Clock },
  { value: 'year', label: 'Release Year', icon: Calendar },
];

export const SortDropdown = ({ sortBy, sortOrder, onSortChange }: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentOption = SORT_OPTIONS.find(option => option.value === sortBy);
  const IconComponent = currentOption?.icon || ArrowUpDown;

  const handleOptionClick = (option: SortOption) => {
    if (option === sortBy) {
      // Same option, toggle order
      onSortChange(option, sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Different option, use default order for that option
      const defaultOrder = option === 'popularity' || option === 'recent' ? 'desc' : 'asc';
      onSortChange(option, defaultOrder);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
      >
        <IconComponent className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">
          {currentOption?.label}
        </span>
        <span className="text-xs text-gray-500">
          {sortOrder === 'asc' ? '↑' : '↓'}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
            <div className="py-1">
              {SORT_OPTIONS.map((option) => {
                const OptionIcon = option.icon;
                const isActive = option.value === sortBy;
                
                return (
                  <button
                    key={option.value}
                    onClick={() => handleOptionClick(option.value)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors
                      ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}
                    `}
                  >
                    <OptionIcon className="w-4 h-4" />
                    <span className="text-sm font-medium flex-1">{option.label}</span>
                    {isActive && (
                      <span className="text-xs">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};