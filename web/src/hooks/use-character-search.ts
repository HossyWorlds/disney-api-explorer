import { useQuery } from '@tanstack/react-query';
import { disneyApi } from '@/lib/api-client';

export const useCharacterSearch = (searchTerm: string, page = 1, enabled = true) => {
  return useQuery({
    queryKey: ['characters', 'search', searchTerm, page],
    queryFn: () => disneyApi.searchCharacters(searchTerm, page),
    enabled: enabled && searchTerm.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useAllCharacters = (page = 1) => {
  return useQuery({
    queryKey: ['characters', 'all', page],
    queryFn: () => disneyApi.getAllCharacters(page),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};