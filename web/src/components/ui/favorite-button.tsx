'use client';

import { Heart } from 'lucide-react';
import { Character } from '@/types/disney';
import { useFavorites } from '@/hooks/use-favorites';

interface FavoriteButtonProps {
  character: Character;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const FavoriteButton = ({ 
  character, 
  size = 'md', 
  showText = false,
  className = '' 
}: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isCharacterFavorite = isFavorite(character._id);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(character);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        ${sizeClasses[size]} 
        rounded-full flex items-center justify-center gap-2 transition-all duration-200 
        ${isCharacterFavorite 
          ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg' 
          : 'bg-white hover:bg-gray-50 text-gray-400 hover:text-red-500 border border-gray-200 hover:border-red-200'
        }
        ${className}
      `}
      aria-label={isCharacterFavorite ? `Remove ${character.name} from favorites` : `Add ${character.name} to favorites`}
      title={isCharacterFavorite ? `Remove from favorites` : `Add to favorites`}
    >
      <Heart 
        className={`${iconSizes[size]} ${isCharacterFavorite ? 'fill-current' : ''} transition-all duration-200`} 
      />
      {showText && (
        <span className="text-sm font-medium">
          {isCharacterFavorite ? 'Favorited' : 'Favorite'}
        </span>
      )}
    </button>
  );
};