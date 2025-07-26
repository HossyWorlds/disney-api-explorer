import { describe, it, expect } from 'vitest';
import { classifyCharacter, getFilteredCharacters } from '@/lib/character-classifier';
import { Character } from '@/types/disney';

const mockCharacters: Character[] = [
  {
    _id: 1,
    name: 'Belle',
    imageUrl: 'https://example.com/belle.jpg',
    films: ['Beauty and the Beast'],
    shortFilms: [],
    tvShows: [],
    videoGames: [],
    parkAttractions: [],
    allies: ['Beast'],
    enemies: ['Gaston'],
    sourceUrl: 'https://example.com',
    url: 'https://api.disneyapi.dev/character/1',
    createdAt: '2021-04-12T23:20:07.000Z',
    updatedAt: '2021-04-12T23:20:07.000Z',
  },
  {
    _id: 2,
    name: 'Jafar',
    imageUrl: 'https://example.com/jafar.jpg',
    films: ['Aladdin'],
    shortFilms: [],
    tvShows: [],
    videoGames: ['Kingdom Hearts'],
    parkAttractions: [],
    allies: [],
    enemies: ['Aladdin'],
    sourceUrl: 'https://example.com',
    url: 'https://api.disneyapi.dev/character/2',
    createdAt: '2021-04-12T23:20:07.000Z',
    updatedAt: '2021-04-12T23:20:07.000Z',
  },
  {
    _id: 3,
    name: 'Simba',
    imageUrl: 'https://example.com/simba.jpg',
    films: ['The Lion King'],
    shortFilms: [],
    tvShows: ['The Lion Guard'],
    videoGames: [],
    parkAttractions: ['Festival of the Lion King'],
    allies: ['Nala', 'Timon', 'Pumbaa'],
    enemies: ['Scar'],
    sourceUrl: 'https://example.com',
    url: 'https://api.disneyapi.dev/character/3',
    createdAt: '2021-04-12T23:20:07.000Z',
    updatedAt: '2021-04-12T23:20:07.000Z',
  }
];

describe('Character Classifier', () => {
  describe('classifyCharacter', () => {
    it('classifies Belle as princess', () => {
      const types = classifyCharacter(mockCharacters[0]);
      expect(types).toContain('princess');
    });

    it('classifies Jafar as villain', () => {
      const types = classifyCharacter(mockCharacters[1]);
      expect(types).toContain('villain');
    });

    it('classifies Simba as animal', () => {
      const types = classifyCharacter(mockCharacters[2]);
      expect(types).toContain('animal');
    });

    it('assigns other type when no specific classification matches', () => {
      const unknownCharacter: Character = {
        ...mockCharacters[0],
        name: 'Unknown Character'
      };
      const types = classifyCharacter(unknownCharacter);
      expect(types).toContain('other');
    });
  });

  describe('getFilteredCharacters', () => {
    it('filters by media type (films)', () => {
      const filtered = getFilteredCharacters(mockCharacters, {
        mediaTypes: ['films']
      });
      expect(filtered).toHaveLength(3); // All characters have films
    });

    it('filters by media type (tvShows)', () => {
      const filtered = getFilteredCharacters(mockCharacters, {
        mediaTypes: ['tvShows']
      });
      expect(filtered).toHaveLength(1); // Only Simba has TV shows
      expect(filtered[0].name).toBe('Simba');
    });

    it('filters by character type (princess)', () => {
      const filtered = getFilteredCharacters(mockCharacters, {
        characterTypes: ['princess']
      });
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe('Belle');
    });

    it('filters by character type (villain)', () => {
      const filtered = getFilteredCharacters(mockCharacters, {
        characterTypes: ['villain']
      });
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe('Jafar');
    });

    it('filters by alphabet range', () => {
      const filtered = getFilteredCharacters(mockCharacters, {
        alphabetRange: { start: 'a', end: 'k' }
      });
      expect(filtered).toHaveLength(2); // Belle and Jafar
      expect(filtered.map(c => c.name)).toContain('Belle');
      expect(filtered.map(c => c.name)).toContain('Jafar');
    });

    it('returns empty array when no characters match filters', () => {
      const filtered = getFilteredCharacters(mockCharacters, {
        characterTypes: ['sidekick'],
        mediaTypes: ['shortFilms']
      });
      expect(filtered).toHaveLength(0);
    });

    it('applies multiple filters (AND operation)', () => {
      const filtered = getFilteredCharacters(mockCharacters, {
        mediaTypes: ['films'],
        characterTypes: ['villain']
      });
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe('Jafar');
    });
  });
});