import Image from 'next/image';
import { Character } from '@/types/disney';
import { Film, Tv, Gamepad, MapPin } from 'lucide-react';
import { FavoriteButton } from '@/components/ui/favorite-button';

interface CharacterCardProps {
  character: Character;
  onClick?: () => void;
  viewMode?: 'grid' | 'list';
}

export const CharacterCard = ({ character, onClick, viewMode = 'grid' }: CharacterCardProps) => {
  const mediaCount = 
    character.films.length + 
    character.shortFilms.length + 
    character.tvShows.length + 
    character.videoGames.length;

  const cardClasses = viewMode === 'grid'
    ? "bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
    : "bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group flex items-center p-4 gap-4";

  return (
    <div 
      className={cardClasses}
      onClick={() => onClick?.()}
    >
      <div className={`relative bg-gray-100 ${
        viewMode === 'list' 
          ? 'w-16 h-16 rounded-lg flex-shrink-0' 
          : 'h-64'
      }`}>
        {character.imageUrl ? (
          <Image
            src={character.imageUrl}
            alt={character.name}
            fill
            className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
              viewMode === 'list' ? 'rounded-lg' : ''
            }`}
            sizes={viewMode === 'list' ? '64px' : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 ${
            viewMode === 'list' ? 'rounded-lg' : ''
          }`}>
            <span className={`font-bold text-gray-400 ${
              viewMode === 'list' ? 'text-lg' : 'text-4xl'
            }`}>
              {character.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        
        {/* Favorite Button */}
        <div className={`absolute ${
          viewMode === 'list' ? 'top-1 right-1' : 'top-2 right-2'
        }`}>
          <FavoriteButton character={character} size={viewMode === 'list' ? 'sm' : 'sm'} />
        </div>
      </div>
      
      <div className={viewMode === 'list' ? 'flex-1 min-w-0' : 'p-4'}>
        <h3 className={`font-semibold text-gray-900 line-clamp-1 ${
          viewMode === 'list' ? 'text-base mb-1' : 'text-lg mb-2'
        }`}>
          {character.name}
        </h3>
        
        <div className={`flex items-center text-sm text-gray-600 ${
          viewMode === 'list' ? 'gap-3' : 'gap-4'
        }`}>
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
        
        {mediaCount === 0 && viewMode === 'grid' && (
          <p className="text-sm text-gray-500 mt-2">No media appearances</p>
        )}
      </div>
    </div>
  );
};