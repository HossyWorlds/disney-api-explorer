import { useState, useEffect, useCallback } from 'react';
import { Character } from '@/types/disney';

const FAVORITES_KEY = 'disney-favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveFavorites = useCallback((newFavorites: Character[]) => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  }, []);

  const addToFavorites = useCallback((character: Character) => {
    const newFavorites = [...favorites, character];
    saveFavorites(newFavorites);
  }, [favorites, saveFavorites]);

  const removeFromFavorites = useCallback((characterId: number) => {
    const newFavorites = favorites.filter(char => char._id !== characterId);
    saveFavorites(newFavorites);
  }, [favorites, saveFavorites]);

  const isFavorite = useCallback((characterId: number) => {
    return favorites.some(char => char._id === characterId);
  }, [favorites]);

  const toggleFavorite = useCallback((character: Character) => {
    if (isFavorite(character._id)) {
      removeFromFavorites(character._id);
    } else {
      addToFavorites(character);
    }
  }, [isFavorite, addToFavorites, removeFromFavorites]);

  return {
    favorites,
    isLoading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    favoriteCount: favorites.length,
  };
};