import { useQuery } from '@tanstack/react-query';
import { disneyApi } from '@/lib/api-client';

export const useCharacterNavigation = (currentCharacterId: number) => {
  const { data: charactersData } = useQuery({
    queryKey: ['characters', 'all', 1],
    queryFn: () => disneyApi.getAllCharacters(1, 50),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  const characters = charactersData?.data || [];
  const currentIndex = characters.findIndex(char => char._id === currentCharacterId);
  
  const prevCharacter = currentIndex > 0 ? characters[currentIndex - 1] : null;
  const nextCharacter = currentIndex < characters.length - 1 ? characters[currentIndex + 1] : null;

  return {
    prevCharacter,
    nextCharacter,
    hasNavigation: prevCharacter || nextCharacter,
  };
};