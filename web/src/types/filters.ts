export interface FilterState {
  mediaTypes: MediaTypeFilter[];
  characterTypes: CharacterTypeFilter[];
  yearRange: {
    min?: number;
    max?: number;
  };
  alphabetRange: {
    start?: string;
    end?: string;
  };
  sortBy: SortOption;
  sortOrder: 'asc' | 'desc';
}

export type MediaTypeFilter = 'films' | 'tvShows' | 'shortFilms' | 'videoGames' | 'parkAttractions';

export type CharacterTypeFilter = 'princess' | 'villain' | 'animal' | 'sidekick' | 'main' | 'other';

export type SortOption = 'name' | 'popularity' | 'recent' | 'year';

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

export interface SortOptionItem {
  value: SortOption;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface FilterSectionProps {
  title: string;
  options: FilterOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  maxHeight?: string;
  searchable?: boolean;
}