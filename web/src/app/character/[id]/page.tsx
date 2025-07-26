'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { disneyApi } from '@/lib/api-client';
import { Character } from '@/types/disney';

export default function CharacterDetailPage() {
  const params = useParams();
  const router = useRouter();
  const characterId = params.id as string;

  const { data: character, isLoading, error } = useQuery({
    queryKey: ['character', characterId],
    queryFn: () => disneyApi.getCharacterById(parseInt(characterId)),
    enabled: !!characterId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading character details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load character details</p>
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Character not found</p>
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to search
        </button>

        {/* Character Details */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Character Image */}
            <div className="md:w-1/3 lg:w-1/4 relative h-64 md:h-full">
              <Image
                src={character.imageUrl}
                alt={character.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            {/* Character Information */}
            <div className="md:w-2/3 lg:w-3/4 p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{character.name}</h1>

              {/* Films */}
              {character.films && character.films.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Films</h2>
                  <div className="flex flex-wrap gap-2">
                    {character.films.map((film, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {film}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* TV Shows */}
              {character.tvShows && character.tvShows.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">TV Shows</h2>
                  <div className="flex flex-wrap gap-2">
                    {character.tvShows.map((show, index) => (
                      <span
                        key={index}
                        className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                      >
                        {show}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Short Films */}
              {character.shortFilms && character.shortFilms.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Short Films</h2>
                  <div className="flex flex-wrap gap-2">
                    {character.shortFilms.map((film, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                      >
                        {film}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Video Games */}
              {character.videoGames && character.videoGames.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Video Games</h2>
                  <div className="flex flex-wrap gap-2">
                    {character.videoGames.map((game, index) => (
                      <span
                        key={index}
                        className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
                      >
                        {game}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Park Attractions */}
              {character.parkAttractions && character.parkAttractions.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Park Attractions</h2>
                  <div className="flex flex-wrap gap-2">
                    {character.parkAttractions.map((attraction, index) => (
                      <span
                        key={index}
                        className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm"
                      >
                        {attraction}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Allies */}
              {character.allies && character.allies.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Allies</h2>
                  <div className="flex flex-wrap gap-2">
                    {character.allies.map((ally, index) => (
                      <span
                        key={index}
                        className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm"
                      >
                        {ally}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Enemies */}
              {character.enemies && character.enemies.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Enemies</h2>
                  <div className="flex flex-wrap gap-2">
                    {character.enemies.map((enemy, index) => (
                      <span
                        key={index}
                        className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm"
                      >
                        {enemy}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Source Link */}
              {character.sourceUrl && (
                <div className="mt-8">
                  <a
                    href={character.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View on Disney Wiki
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}