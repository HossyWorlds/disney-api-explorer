import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { disneyApi } from '@/lib/api-client'
import { Character, ApiResponse } from '@/types/disney'

// Mock axios
vi.mock('axios')
const mockedAxios = vi.mocked(axios)

// Mock axios.create to return a mocked instance
const mockAxiosInstance = {
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
}

mockedAxios.create = vi.fn(() => mockAxiosInstance as any)

const mockCharacter: Character = {
  _id: 1,
  name: 'Mickey Mouse',
  imageUrl: 'https://example.com/mickey.jpg',
  films: ['Fantasia'],
  shortFilms: [],
  tvShows: ['Mickey Mouse Clubhouse'],
  videoGames: [],
  parkAttractions: [],
  allies: [],
  enemies: [],
  sourceUrl: 'https://disney.fandom.com/wiki/Mickey_Mouse',
  url: 'https://api.disneyapi.dev/character/1',
  createdAt: '2021-04-12T23:20:07.000Z',
  updatedAt: '2021-04-12T23:20:07.000Z',
}

const mockApiResponse: ApiResponse<Character[]> = {
  info: {
    count: 1,
    totalPages: 1,
  },
  data: [mockCharacter],
}

describe('disneyApi', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('searchCharacters', () => {
    it('makes correct API call for character search', async () => {
      mockAxiosInstance.get.mockResolvedValue({ data: mockApiResponse })

      const result = await disneyApi.searchCharacters('Mickey', 1, 50)

      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        '/character?name=Mickey&page=1&pageSize=50'
      )
      expect(result).toEqual(mockApiResponse)
    })

    it('handles search without name parameter', async () => {
      mockAxiosInstance.get.mockResolvedValue({ data: mockApiResponse })

      const result = await disneyApi.searchCharacters('', 2, 25)

      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        '/character?page=2&pageSize=25'
      )
      expect(result).toEqual(mockApiResponse)
    })

    it('uses default parameters correctly', async () => {
      mockAxiosInstance.get.mockResolvedValue({ data: mockApiResponse })

      const result = await disneyApi.searchCharacters('Donald')

      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        '/character?name=Donald&page=1&pageSize=50'
      )
      expect(result).toEqual(mockApiResponse)
    })

    it('handles API errors correctly', async () => {
      const errorMessage = 'Network Error'
      mockAxiosInstance.get.mockRejectedValue(new Error(errorMessage))

      await expect(disneyApi.searchCharacters('Mickey')).rejects.toThrow(errorMessage)
    })
  })

  describe('getCharacterById', () => {
    it('makes correct API call for single character', async () => {
      mockAxiosInstance.get.mockResolvedValue({ data: mockCharacter })

      const result = await disneyApi.getCharacterById(1)

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/character/1')
      expect(result).toEqual(mockCharacter)
    })

    it('handles character not found', async () => {
      mockAxiosInstance.get.mockResolvedValue({ data: null })

      const result = await disneyApi.getCharacterById(999)

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/character/999')
      expect(result).toBeNull()
    })

    it('handles API errors correctly', async () => {
      const errorMessage = '404 Not Found'
      mockAxiosInstance.get.mockRejectedValue(new Error(errorMessage))

      await expect(disneyApi.getCharacterById(1)).rejects.toThrow(errorMessage)
    })
  })

  describe('getAllCharacters', () => {
    it('makes correct API call for all characters', async () => {
      mockAxiosInstance.get.mockResolvedValue({ data: mockApiResponse })

      const result = await disneyApi.getAllCharacters(3, 20)

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/character?page=3&pageSize=20')
      expect(result).toEqual(mockApiResponse)
    })

    it('uses default parameters correctly', async () => {
      mockAxiosInstance.get.mockResolvedValue({ data: mockApiResponse })

      const result = await disneyApi.getAllCharacters()

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/character?page=1&pageSize=50')
      expect(result).toEqual(mockApiResponse)
    })

    it('handles empty response correctly', async () => {
      const emptyResponse: ApiResponse<Character[]> = {
        info: { count: 0, totalPages: 0 },
        data: [],
      }
      mockAxiosInstance.get.mockResolvedValue({ data: emptyResponse })

      const result = await disneyApi.getAllCharacters()

      expect(result).toEqual(emptyResponse)
      expect(result.data).toHaveLength(0)
    })

    it('handles API errors correctly', async () => {
      const errorMessage = 'Server Error'
      mockAxiosInstance.get.mockRejectedValue(new Error(errorMessage))

      await expect(disneyApi.getAllCharacters()).rejects.toThrow(errorMessage)
    })
  })
})