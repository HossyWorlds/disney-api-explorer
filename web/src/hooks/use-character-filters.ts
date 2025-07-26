import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Character } from '@/types/disney';
import { FilterState, FilterOption, SortOption } from '@/types/filters';
import { getFilteredCharacters, classifyCharacter, getCharacterYearRange } from '@/lib/character-classifier';

const DEFAULT_FILTERS: FilterState = {
  mediaTypes: [],
  characterTypes: [],
  yearRange: {},
  alphabetRange: {},
  sortBy: 'name',
  sortOrder: 'asc'
};

export const useCharacterFilters = (characters: Character[]) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  // URL からフィルター状態を読み込み
  useEffect(() => {
    const urlFilters: FilterState = { ...DEFAULT_FILTERS };

    // Media types
    const mediaTypesParam = searchParams.get('mediaTypes');
    if (mediaTypesParam) {
      urlFilters.mediaTypes = mediaTypesParam.split(',') as any;
    }

    // Character types
    const characterTypesParam = searchParams.get('characterTypes');
    if (characterTypesParam) {
      urlFilters.characterTypes = characterTypesParam.split(',') as any;
    }

    // Year range
    const minYear = searchParams.get('minYear');
    const maxYear = searchParams.get('maxYear');
    if (minYear || maxYear) {
      urlFilters.yearRange = {
        min: minYear ? parseInt(minYear) : undefined,
        max: maxYear ? parseInt(maxYear) : undefined
      };
    }

    // Alphabet range
    const startLetter = searchParams.get('startLetter');
    const endLetter = searchParams.get('endLetter');
    if (startLetter || endLetter) {
      urlFilters.alphabetRange = {
        start: startLetter || undefined,
        end: endLetter || undefined
      };
    }

    // Sort
    const sortBy = searchParams.get('sortBy') as SortOption;
    const sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc';
    if (sortBy) urlFilters.sortBy = sortBy;
    if (sortOrder) urlFilters.sortOrder = sortOrder;

    setFilters(urlFilters);
  }, [searchParams]);

  // フィルター状態をURLに同期
  const updateURL = useCallback((newFilters: FilterState) => {
    const params = new URLSearchParams();

    if (newFilters.mediaTypes.length > 0) {
      params.set('mediaTypes', newFilters.mediaTypes.join(','));
    }
    if (newFilters.characterTypes.length > 0) {
      params.set('characterTypes', newFilters.characterTypes.join(','));
    }
    if (newFilters.yearRange.min) {
      params.set('minYear', newFilters.yearRange.min.toString());
    }
    if (newFilters.yearRange.max) {
      params.set('maxYear', newFilters.yearRange.max.toString());
    }
    if (newFilters.alphabetRange.start) {
      params.set('startLetter', newFilters.alphabetRange.start);
    }
    if (newFilters.alphabetRange.end) {
      params.set('endLetter', newFilters.alphabetRange.end);
    }
    if (newFilters.sortBy !== 'name') {
      params.set('sortBy', newFilters.sortBy);
    }
    if (newFilters.sortOrder !== 'asc') {
      params.set('sortOrder', newFilters.sortOrder);
    }

    const newURL = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(newURL, { scroll: false });
  }, [router, pathname]);

  const updateFilters = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
    updateURL(newFilters);
  }, [updateURL]);

  // 利用可能なフィルターオプションを計算
  const availableFilters = useMemo(() => {
    const mediaTypeCounts = {
      films: 0,
      tvShows: 0,
      shortFilms: 0,
      videoGames: 0,
      parkAttractions: 0
    };

    const characterTypeCounts = {
      princess: 0,
      villain: 0,
      animal: 0,
      sidekick: 0,
      main: 0,
      other: 0
    };

    let minYear = Infinity;
    let maxYear = -Infinity;

    characters.forEach(character => {
      // Media type counts
      if (character.films?.length > 0) mediaTypeCounts.films++;
      if (character.tvShows?.length > 0) mediaTypeCounts.tvShows++;
      if (character.shortFilms?.length > 0) mediaTypeCounts.shortFilms++;
      if (character.videoGames?.length > 0) mediaTypeCounts.videoGames++;
      if (character.parkAttractions?.length > 0) mediaTypeCounts.parkAttractions++;

      // Character type counts
      const types = classifyCharacter(character);
      types.forEach(type => {
        characterTypeCounts[type]++;
      });

      // Year range
      const year = getCharacterYearRange(character);
      if (year !== null) {
        minYear = Math.min(minYear, year);
        maxYear = Math.max(maxYear, year);
      }
    });

    return {
      mediaTypes: [
        { id: 'films', label: 'Films', count: mediaTypeCounts.films },
        { id: 'tvShows', label: 'TV Shows', count: mediaTypeCounts.tvShows },
        { id: 'shortFilms', label: 'Short Films', count: mediaTypeCounts.shortFilms },
        { id: 'videoGames', label: 'Video Games', count: mediaTypeCounts.videoGames },
        { id: 'parkAttractions', label: 'Park Attractions', count: mediaTypeCounts.parkAttractions }
      ] as FilterOption[],
      characterTypes: [
        { id: 'princess', label: 'Princess', count: characterTypeCounts.princess },
        { id: 'villain', label: 'Villain', count: characterTypeCounts.villain },
        { id: 'animal', label: 'Animal', count: characterTypeCounts.animal },
        { id: 'sidekick', label: 'Sidekick', count: characterTypeCounts.sidekick },
        { id: 'main', label: 'Main Character', count: characterTypeCounts.main },
        { id: 'other', label: 'Other', count: characterTypeCounts.other }
      ] as FilterOption[],
      yearRange: {
        min: minYear === Infinity ? 1937 : minYear,
        max: maxYear === -Infinity ? new Date().getFullYear() : maxYear
      }
    };
  }, [characters]);

  // フィルター済みとソート済みのキャラクターを計算
  const filteredAndSortedCharacters = useMemo(() => {
    // フィルタリング
    let filtered = getFilteredCharacters(characters, {
      mediaTypes: filters.mediaTypes,
      characterTypes: filters.characterTypes,
      yearRange: filters.yearRange,
      alphabetRange: filters.alphabetRange
    });

    // ソート
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (filters.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'popularity':
          // 出演作品数で人気度を推定
          const aPopularity = (a.films?.length || 0) + (a.tvShows?.length || 0);
          const bPopularity = (b.films?.length || 0) + (b.tvShows?.length || 0);
          comparison = bPopularity - aPopularity; // 降順がデフォルト
          break;
        case 'recent':
          // IDで最新追加を推定（大きいIDほど新しい）
          comparison = b._id - a._id; // 降順がデフォルト
          break;
        case 'year':
          const aYear = getCharacterYearRange(a) || 0;
          const bYear = getCharacterYearRange(b) || 0;
          comparison = aYear - bYear;
          break;
        default:
          comparison = 0;
      }

      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [characters, filters]);

  const removeFilter = useCallback((filterType: string, value: string) => {
    const newFilters = { ...filters };

    switch (filterType) {
      case 'mediaType':
        newFilters.mediaTypes = filters.mediaTypes.filter(type => type !== value);
        break;
      case 'characterType':
        newFilters.characterTypes = filters.characterTypes.filter(type => type !== value);
        break;
      case 'yearRange':
        newFilters.yearRange = {};
        break;
      case 'alphabetRange':
        newFilters.alphabetRange = {};
        break;
    }

    updateFilters(newFilters);
  }, [filters, updateFilters]);

  const clearAllFilters = useCallback(() => {
    updateFilters(DEFAULT_FILTERS);
  }, [updateFilters]);

  const hasActiveFilters = 
    filters.mediaTypes.length > 0 ||
    filters.characterTypes.length > 0 ||
    filters.yearRange.min ||
    filters.yearRange.max ||
    filters.alphabetRange.start ||
    filters.alphabetRange.end;

  return {
    filters,
    updateFilters,
    availableFilters,
    filteredCharacters: filteredAndSortedCharacters,
    removeFilter,
    clearAllFilters,
    hasActiveFilters,
    totalCount: characters.length,
    filteredCount: filteredAndSortedCharacters.length
  };
};