'use client';

import { Character } from '@/types/disney';
import { CharacterCard } from './character-card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CharacterGalleryProps {
  characters: Character[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onCharacterClick?: (character: Character) => void;
  isLoading?: boolean;
  viewMode?: 'grid' | 'list';
}

export const CharacterGallery = ({
  characters,
  currentPage,
  totalPages,
  onPageChange,
  onCharacterClick,
  isLoading,
  viewMode = 'grid'
}: CharacterGalleryProps) => {
  if (isLoading) {
    const gridClasses = viewMode === 'grid' 
      ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      : "space-y-4";
      
    return (
      <div className={gridClasses}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className={`bg-white rounded-lg shadow-md animate-pulse ${
            viewMode === 'list' ? 'flex items-center p-4 gap-4' : ''
          }`}>
            <div className={`bg-gray-200 ${
              viewMode === 'list' ? 'w-16 h-16 rounded-lg flex-shrink-0' : 'h-64 rounded-t-lg'
            }`} />
            <div className={viewMode === 'list' ? 'flex-1' : 'p-4'}>
              <div className="h-6 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!characters || characters.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No characters found</p>
      </div>
    );
  }

  const containerClasses = viewMode === 'grid'
    ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8"
    : "space-y-4 mb-8";

  return (
    <div>
      <div className={containerClasses}>
        {characters.map((character) => (
          <CharacterCard
            key={character._id}
            character={character}
            onClick={() => onCharacterClick?.(character)}
            viewMode={viewMode}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }

              if (pageNumber < 1 || pageNumber > totalPages) return null;

              return (
                <button
                  key={pageNumber}
                  onClick={() => onPageChange(pageNumber)}
                  className={`w-10 h-10 rounded-lg transition-colors ${
                    currentPage === pageNumber
                      ? 'bg-blue-500 text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};