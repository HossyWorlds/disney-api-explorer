'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Character } from '@/types/disney';
import { useRelatedCharacters } from '@/hooks/use-related-characters';

interface RelatedCharactersProps {
  character: Character;
}

export const RelatedCharacters = ({ character }: RelatedCharactersProps) => {
  const { data: relatedCharacters, isLoading } = useRelatedCharacters(character);

  if (isLoading) {
    return (
      <div className="mt-8 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Related Characters</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-lg animate-pulse">
              <div className="aspect-[3/4] bg-gray-200 rounded-t-lg" />
              <div className="p-3">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!relatedCharacters || relatedCharacters.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 pt-8 border-t border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Related Characters</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {relatedCharacters.map((relatedChar) => (
          <Link
            key={relatedChar._id}
            href={`/character/${relatedChar._id}`}
            className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden"
          >
            <div className="aspect-[3/4] relative bg-gradient-to-br from-gray-100 to-gray-200">
              <Image
                src={relatedChar.imageUrl}
                alt={relatedChar.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
            <div className="p-3">
              <h4 className="font-medium text-gray-900 text-sm group-hover:text-blue-600 transition-colors line-clamp-2">
                {relatedChar.name}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};