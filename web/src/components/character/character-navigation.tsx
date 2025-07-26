'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Character } from '@/types/disney';

interface CharacterNavigationProps {
  prevCharacter: Character | null;
  nextCharacter: Character | null;
}

export const CharacterNavigation = ({ prevCharacter, nextCharacter }: CharacterNavigationProps) => {
  if (!prevCharacter && !nextCharacter) {
    return null;
  }

  return (
    <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-200">
      <div className="flex-1">
        {prevCharacter && (
          <Link 
            href={`/character/${prevCharacter._id}`}
            className="group flex items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors max-w-sm"
          >
            <div className="flex-shrink-0">
              <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </div>
            <div className="min-w-0">
              <p className="text-sm text-gray-500 mb-1">Previous</p>
              <p className="font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                {prevCharacter.name}
              </p>
            </div>
          </Link>
        )}
      </div>

      <div className="flex-1 flex justify-end">
        {nextCharacter && (
          <Link 
            href={`/character/${nextCharacter._id}`}
            className="group flex items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors max-w-sm text-right"
          >
            <div className="min-w-0">
              <p className="text-sm text-gray-500 mb-1">Next</p>
              <p className="font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                {nextCharacter.name}
              </p>
            </div>
            <div className="flex-shrink-0">
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};