'use client';

import { useState, useCallback, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Filter, Grid, List } from 'lucide-react';
import { SearchBar } from '@/components/ui/search-bar';
import { CharacterGallery } from '@/components/character/character-gallery';
import { FilterSidebar } from '@/components/filters/filter-sidebar';
import { SortDropdown } from '@/components/filters/sort-dropdown';
import { FilterChips } from '@/components/filters/filter-chips';
import { useCharacterSearch, useAllCharacters } from '@/hooks/use-character-search';
import { useCharacterFilters } from '@/hooks/use-character-filters';
import { Character } from '@/types/disney';
import { FilterState } from '@/types/filters';

function HomeContent() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const isSearching = searchTerm.length > 0;

  const allCharactersQuery = useAllCharacters(1, 200); // Get more characters for filtering
  const searchQuery = useCharacterSearch(searchTerm, currentPage, isSearching);

  const activeQuery = isSearching ? searchQuery : allCharactersQuery;
  const { data, isLoading, error } = activeQuery;
  
  // Get all characters for filtering
  const allCharacters = data?.data || [];
  
  const {
    filters,
    updateFilters,
    availableFilters,
    filteredCharacters,
    removeFilter,
    clearAllFilters,
    hasActiveFilters,
    totalCount,
    filteredCount
  } = useCharacterFilters(allCharacters);

  // Paginate filtered results
  const itemsPerPage = 20;
  const totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCharacters = filteredCharacters.slice(startIndex, startIndex + itemsPerPage);

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleCharacterClick = useCallback((character: Character) => {
    router.push(`/character/${character._id}`);
  }, [router]);

  const handleFiltersChange = useCallback((newFilters: FilterState) => {
    updateFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  }, [updateFilters]);

  const handleSortChange = useCallback((sortBy: any, sortOrder: 'asc' | 'desc') => {
    updateFilters({
      ...filters,
      sortBy,
      sortOrder
    });
    setCurrentPage(1);
  }, [filters, updateFilters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Disney Character Explorer
          </h1>
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Filter Sidebar */}
        <FilterSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          availableFilters={availableFilters}
        />

        {/* Main Content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 lg:pl-0">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Filters</span>
                {hasActiveFilters && (
                  <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {filters.mediaTypes.length + filters.characterTypes.length + 
                     (filters.yearRange.min || filters.yearRange.max ? 1 : 0) +
                     (filters.alphabetRange.start || filters.alphabetRange.end ? 1 : 0)}
                  </span>
                )}
              </button>
              
              <div className="text-sm text-gray-600">
                Showing {filteredCount.toLocaleString()} of {totalCount.toLocaleString()} characters
              </div>
            </div>

            <div className="flex items-center gap-3">
              <SortDropdown
                sortBy={filters.sortBy}
                sortOrder={filters.sortOrder}
                onSortChange={handleSortChange}
              />
              
              <div className="hidden sm:flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-700'} transition-colors rounded-l-lg`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-700'} transition-colors rounded-r-lg`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Chips */}
          <FilterChips
            filters={filters}
            onRemoveFilter={removeFilter}
            onClearAll={clearAllFilters}
          />

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-600">
                Error loading characters. Please try again later.
              </p>
            </div>
          )}

          {/* No Results */}
          {!isLoading && filteredCharacters.length === 0 && hasActiveFilters && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Filter className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No characters found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your filters to see more results.</p>
              <button
                onClick={clearAllFilters}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Character Gallery */}
          <CharacterGallery
            characters={paginatedCharacters}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onCharacterClick={handleCharacterClick}
            isLoading={isLoading}
            viewMode={viewMode}
          />
        </main>
      </div>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            Data provided by{' '}
            <a
              href="https://disneyapi.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-500"
            >
              Disney API
            </a>{' '}
            by Manu Castrillon. Disney characters © Disney.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-gray-600">Loading...</div></div>}>
      <HomeContent />
    </Suspense>
  );
}