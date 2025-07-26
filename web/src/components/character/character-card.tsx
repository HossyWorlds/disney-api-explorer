import Image from 'next/image';
import { Character } from '@/types/disney';
import { Film, Tv, Gamepad, MapPin } from 'lucide-react';
import { FavoriteButton } from '@/components/ui/favorite-button';

interface CharacterCardProps {
  character: Character;
  onClick?: () => void;
}

export const CharacterCard = ({ character, onClick }: CharacterCardProps) => {
  const mediaCount = 
    character.films.length + 
    character.shortFilms.length + 
    character.tvShows.length + 
    character.videoGames.length;

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
      onClick={() => onClick?.()}
    >
      <div className="relative h-64 bg-gray-100">
        {character.imageUrl ? (
          <Image
            src={character.imageUrl}
            alt={character.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
            <span className="text-4xl font-bold text-gray-400">
              {character.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        
        {/* Favorite Button */}
        <div className="absolute top-2 right-2">
          <FavoriteButton character={character} size="sm" />
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
          {character.name}
        </h3>
        
        <div className="flex items-center gap-4 text-sm text-gray-600">
          {character.films.length > 0 && (
            <div className="flex items-center gap-1">
              <Film className="w-4 h-4" />
              <span>{character.films.length}</span>
            </div>
          )}
          
          {character.tvShows.length > 0 && (
            <div className="flex items-center gap-1">
              <Tv className="w-4 h-4" />
              <span>{character.tvShows.length}</span>
            </div>
          )}
          
          {character.videoGames.length > 0 && (
            <div className="flex items-center gap-1">
              <Gamepad className="w-4 h-4" />
              <span>{character.videoGames.length}</span>
            </div>
          )}
          
          {character.parkAttractions.length > 0 && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{character.parkAttractions.length}</span>
            </div>
          )}
        </div>
        
        {mediaCount === 0 && (
          <p className="text-sm text-gray-500 mt-2">No media appearances</p>
        )}
      </div>
    </div>
  );
};