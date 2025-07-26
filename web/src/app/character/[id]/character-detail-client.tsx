'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ExternalLink, Film, Tv, Gamepad, MapPin, Users, Swords, Star } from 'lucide-react';
import Image from 'next/image';
import { disneyApi } from '@/lib/api-client';
import { Character } from '@/types/disney';
import { FavoriteButton } from '@/components/ui/favorite-button';
import { SocialShare } from '@/components/ui/social-share';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { CharacterNavigation } from '@/components/character/character-navigation';
import { RelatedCharacters } from '@/components/character/related-characters';
import { useCharacterNavigation } from '@/hooks/use-character-navigation';

const InfoSection = ({ title, items, icon: Icon, colorClass }: {
  title: string;
  items: string[];
  icon: any;
  colorClass: string;
}) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${colorClass}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <span className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded-full font-medium">
          {items.length}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 hover:shadow-sm transition-shadow"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

interface CharacterDetailClientProps {
  characterId: string;
}

export const CharacterDetailClient = ({ characterId }: CharacterDetailClientProps) => {
  const router = useRouter();

  const { data: character, isLoading, error } = useQuery({
    queryKey: ['character', characterId],
    queryFn: () => disneyApi.getCharacterById(parseInt(characterId)),
    enabled: !!characterId,
  });

  const { prevCharacter, nextCharacter } = useCharacterNavigation(
    character ? character._id : 0
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded-lg w-32 mb-6"></div>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 lg:w-1/4 h-64 md:h-96 bg-gray-200"></div>
                <div className="md:w-2/3 lg:w-3/4 p-8">
                  <div className="h-10 bg-gray-200 rounded-lg w-3/4 mb-6"></div>
                  <div className="space-y-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="bg-gray-100 rounded-xl p-6">
                        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                        <div className="grid grid-cols-2 gap-2">
                          {Array.from({ length: 3 }).map((_, j) => (
                            <div key={j} className="h-8 bg-gray-200 rounded"></div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">Failed to load character details. Please try again later.</p>
          <button
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="h-8 w-8 text-gray-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Character Not Found</h2>
          <p className="text-gray-600 mb-6">The character you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <button
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const sections = [
    { title: 'Films', items: character.films, icon: Film, colorClass: 'bg-blue-500' },
    { title: 'TV Shows', items: character.tvShows, icon: Tv, colorClass: 'bg-purple-500' },
    { title: 'Short Films', items: character.shortFilms, icon: Film, colorClass: 'bg-green-500' },
    { title: 'Video Games', items: character.videoGames, icon: Gamepad, colorClass: 'bg-orange-500' },
    { title: 'Park Attractions', items: character.parkAttractions, icon: MapPin, colorClass: 'bg-yellow-500' },
    { title: 'Allies', items: character.allies, icon: Users, colorClass: 'bg-emerald-500' },
    { title: 'Enemies', items: character.enemies, icon: Swords, colorClass: 'bg-red-500' },
  ];

  const activeSections = sections.filter(section => section.items && section.items.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb 
          items={[
            { label: 'Characters', href: '/' },
            { label: character.name }
          ]}
        />

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="lg:flex">
            <div className="lg:w-1/3 relative">
              <div className="aspect-[3/4] lg:aspect-auto lg:h-full relative bg-gradient-to-br from-gray-100 to-gray-200">
                <Image
                  src={character.imageUrl}
                  alt={character.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>

            <div className="lg:w-2/3 p-8">
              <div className="border-b border-gray-200 pb-6 mb-8">
                <div className="flex items-start justify-between mb-4">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{character.name}</h1>
                  <div className="flex items-center gap-2">
                    <FavoriteButton character={character} size="lg" />
                    <SocialShare character={character} />
                  </div>
                </div>
                <p className="text-gray-600">
                  Disney Character • {activeSections.length} categories of appearances
                </p>
              </div>

              {activeSections.length > 0 ? (
                <div className="space-y-6">
                  {activeSections.map((section, index) => (
                    <InfoSection
                      key={index}
                      title={section.title}
                      items={section.items}
                      icon={section.icon}
                      colorClass={section.colorClass}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-8 text-center">
                  <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">No additional information</h3>
                  <p className="text-gray-500">
                    This character doesn&apos;t have detailed information about films, shows, or other appearances yet.
                  </p>
                </div>
              )}

              {character.sourceUrl && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <a
                    href={character.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View on Disney Wiki
                  </a>
                </div>
              )}

              <RelatedCharacters character={character} />

              <CharacterNavigation 
                prevCharacter={prevCharacter} 
                nextCharacter={nextCharacter} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};