'use client';

import { useState } from 'react';
import { X, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { FilterState, FilterOption, MediaTypeFilter, CharacterTypeFilter } from '@/types/filters';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  availableFilters: {
    mediaTypes: FilterOption[];
    characterTypes: FilterOption[];
    yearRange: { min: number; max: number };
  };
}

interface FilterSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const FilterSection = ({ title, isExpanded, onToggle, children }: FilterSectionProps) => (
  <div className="border-b border-gray-200 last:border-b-0">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-4 px-4 text-left hover:bg-gray-50 transition-colors"
    >
      <span className="font-medium text-gray-900">{title}</span>
      {isExpanded ? (
        <ChevronUp className="w-4 h-4 text-gray-500" />
      ) : (
        <ChevronDown className="w-4 h-4 text-gray-500" />
      )}
    </button>
    {isExpanded && <div className="px-4 pb-4">{children}</div>}
  </div>
);

export const FilterSidebar = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  availableFilters
}: FilterSidebarProps) => {
  const [expandedSections, setExpandedSections] = useState({
    mediaTypes: true,
    characterTypes: true,
    yearRange: false,
    alphabetRange: false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleMediaTypeChange = (mediaType: MediaTypeFilter, checked: boolean) => {
    const newMediaTypes = checked
      ? [...filters.mediaTypes, mediaType]
      : filters.mediaTypes.filter(type => type !== mediaType);
    
    onFiltersChange({
      ...filters,
      mediaTypes: newMediaTypes
    });
  };

  const handleCharacterTypeChange = (characterType: CharacterTypeFilter, checked: boolean) => {
    const newCharacterTypes = checked
      ? [...filters.characterTypes, characterType]
      : filters.characterTypes.filter(type => type !== characterType);
    
    onFiltersChange({
      ...filters,
      characterTypes: newCharacterTypes
    });
  };

  const handleYearRangeChange = (field: 'min' | 'max', value: string) => {
    const numValue = value ? parseInt(value) : undefined;
    onFiltersChange({
      ...filters,
      yearRange: {
        ...filters.yearRange,
        [field]: numValue
      }
    });
  };

  const handleAlphabetRangeChange = (field: 'start' | 'end', value: string) => {
    onFiltersChange({
      ...filters,
      alphabetRange: {
        ...filters.alphabetRange,
        [field]: value || undefined
      }
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      mediaTypes: [],
      characterTypes: [],
      yearRange: {},
      alphabetRange: {},
      sortBy: 'name',
      sortOrder: 'asc'
    });
  };

  const hasActiveFilters = 
    filters.mediaTypes.length > 0 ||
    filters.characterTypes.length > 0 ||
    filters.yearRange.min ||
    filters.yearRange.max ||
    filters.alphabetRange.start ||
    filters.alphabetRange.end;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:transform-none lg:shadow-none lg:border-r lg:border-gray-200
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            </div>
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all
                </button>
              )}
              <button
                onClick={onClose}
                className="lg:hidden p-1 rounded-md hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Filter Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Media Types */}
            <FilterSection
              title="Media Types"
              isExpanded={expandedSections.mediaTypes}
              onToggle={() => toggleSection('mediaTypes')}
            >
              <div className="space-y-3">
                {availableFilters.mediaTypes.map(option => (
                  <label key={option.id} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.mediaTypes.includes(option.id as MediaTypeFilter)}
                      onChange={(e) => handleMediaTypeChange(option.id as MediaTypeFilter, e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 flex-1">{option.label}</span>
                    {option.count && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {option.count}
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </FilterSection>

            {/* Character Types */}
            <FilterSection
              title="Character Types"
              isExpanded={expandedSections.characterTypes}
              onToggle={() => toggleSection('characterTypes')}
            >
              <div className="space-y-3">
                {availableFilters.characterTypes.map(option => (
                  <label key={option.id} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.characterTypes.includes(option.id as CharacterTypeFilter)}
                      onChange={(e) => handleCharacterTypeChange(option.id as CharacterTypeFilter, e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 flex-1">{option.label}</span>
                    {option.count && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {option.count}
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </FilterSection>

            {/* Year Range */}
            <FilterSection
              title="Release Year"
              isExpanded={expandedSections.yearRange}
              onToggle={() => toggleSection('yearRange')}
            >
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">From</label>
                    <input
                      type="number"
                      placeholder={availableFilters.yearRange.min.toString()}
                      value={filters.yearRange.min || ''}
                      onChange={(e) => handleYearRangeChange('min', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">To</label>
                    <input
                      type="number"
                      placeholder={availableFilters.yearRange.max.toString()}
                      value={filters.yearRange.max || ''}
                      onChange={(e) => handleYearRangeChange('max', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </FilterSection>

            {/* Alphabet Range */}
            <FilterSection
              title="Name Range"
              isExpanded={expandedSections.alphabetRange}
              onToggle={() => toggleSection('alphabetRange')}
            >
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">From</label>
                    <select
                      value={filters.alphabetRange.start || ''}
                      onChange={(e) => handleAlphabetRangeChange('start', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Any</option>
                      {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
                        <option key={letter} value={letter.toLowerCase()}>{letter}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">To</label>
                    <select
                      value={filters.alphabetRange.end || ''}
                      onChange={(e) => handleAlphabetRangeChange('end', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Any</option>
                      {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
                        <option key={letter} value={letter.toLowerCase()}>{letter}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </FilterSection>
          </div>
        </div>
      </div>
    </>
  );
};