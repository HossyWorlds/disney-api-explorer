import { useQuery } from '@tanstack/react-query';
import { disneyApi } from '@/lib/api-client';
import { Character } from '@/types/disney';

export const useRelatedCharacters = (character: Character) => {
  return useQuery({
    queryKey: ['characters', 'related', character._id],
    queryFn: async () => {
      // Get characters that share films, TV shows, or are allies/enemies
      const allCharactersResponse = await disneyApi.getAllCharacters(1, 100);
      const allCharacters = allCharactersResponse.data;
      
      const related = allCharacters
        .filter(char => char._id !== character._id) // Exclude current character
        .map(char => {
          let relevanceScore = 0;
          
          // Characters that appear in same films
          const sharedFilms = char.films?.filter(film => 
            character.films?.includes(film)
          ) || [];
          relevanceScore += sharedFilms.length * 3;
          
          // Characters that appear in same TV shows
          const sharedTVShows = char.tvShows?.filter(show => 
            character.tvShows?.includes(show)
          ) || [];
          relevanceScore += sharedTVShows.length * 2;
          
          // Characters that are allies or enemies
          const isAllyOrEnemy = character.allies?.includes(char.name) || 
                               character.enemies?.includes(char.name) ||
                               char.allies?.includes(character.name) ||
                               char.enemies?.includes(character.name);
          if (isAllyOrEnemy) relevanceScore += 5;
          
          return { character: char, relevanceScore };
        })
        .filter(item => item.relevanceScore > 0) // Only include characters with some relation
        .sort((a, b) => b.relevanceScore - a.relevanceScore) // Sort by relevance
        .slice(0, 6) // Take top 6
        .map(item => item.character);
      
      return related;
    },
    enabled: !!character,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};