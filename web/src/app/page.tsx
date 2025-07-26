'use client';

import { useState, useCallback } from 'react';
import { SearchBar } from '@/components/ui/search-bar';
import { CharacterGallery } from '@/components/character/character-gallery';
import { useCharacterSearch, useAllCharacters } from '@/hooks/use-character-search';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const isSearching = searchTerm.length > 0;

  const allCharactersQuery = useAllCharacters(currentPage);
  const searchQuery = useCharacterSearch(searchTerm, currentPage, isSearching);

  const activeQuery = isSearching ? searchQuery : allCharactersQuery;
  const { data, isLoading, error } = activeQuery;

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleCharacterClick = useCallback(() => {
    // TODO: Implement character detail view
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Disney Character Explorer
          </h1>
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">
              Error loading characters. Please try again later.
            </p>
          </div>
        )}

        <CharacterGallery
          characters={data?.data || []}
          currentPage={currentPage}
          totalPages={data?.info?.totalPages || 1}
          onPageChange={handlePageChange}
          onCharacterClick={handleCharacterClick}
          isLoading={isLoading}
        />
      </main>

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