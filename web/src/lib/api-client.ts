import axios from 'axios';
import { Character, ApiResponse } from '@/types/disney';

const API_BASE_URL = process.env.NEXT_PUBLIC_DISNEY_API_URL || 'https://api.disneyapi.dev';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const disneyApi = {
  searchCharacters: async (name: string, page = 1, pageSize = 50) => {
    const params = new URLSearchParams();
    if (name) params.append('name', name);
    params.append('page', page.toString());
    params.append('pageSize', pageSize.toString());
    
    const response = await apiClient.get<ApiResponse<Character[]>>(`/character?${params.toString()}`);
    return response.data;
  },

  getCharacterById: async (id: number) => {
    const response = await apiClient.get<Character>(`/character/${id}`);
    return response.data;
  },

  getAllCharacters: async (page = 1, pageSize = 50) => {
    const response = await apiClient.get<ApiResponse<Character[]>>(`/character?page=${page}&pageSize=${pageSize}`);
    return response.data;
  },
};