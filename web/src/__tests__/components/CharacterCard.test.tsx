import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CharacterCard } from '@/components/character/character-card'
import { Character } from '@/types/disney'

const mockCharacter: Character = {
  _id: 1,
  name: 'Mickey Mouse',
  imageUrl: 'https://example.com/mickey.jpg',
  films: ['Fantasia', 'Steamboat Willie'],
  shortFilms: ['The Band Concert'],
  tvShows: ['Mickey Mouse Clubhouse'],
  videoGames: ['Kingdom Hearts'],
  parkAttractions: ['Mickey\'s Toontown'],
  allies: ['Minnie Mouse', 'Donald Duck'],
  enemies: ['Pete'],
  sourceUrl: 'https://disney.fandom.com/wiki/Mickey_Mouse',
  url: 'https://api.disneyapi.dev/character/1',
  createdAt: '2021-04-12T23:20:07.000Z',
  updatedAt: '2021-04-12T23:20:07.000Z',
}

const mockCharacterNoMedia: Character = {
  _id: 2,
  name: 'Test Character',
  imageUrl: 'https://example.com/test.jpg',
  films: [],
  shortFilms: [],
  tvShows: [],
  videoGames: [],
  parkAttractions: [],
  allies: [],
  enemies: [],
  sourceUrl: 'https://example.com/test',
  url: 'https://api.disneyapi.dev/character/2',
  createdAt: '2021-04-12T23:20:07.000Z',
  updatedAt: '2021-04-12T23:20:07.000Z',
}

describe('CharacterCard', () => {
  const mockOnClick = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders character name correctly', () => {
    render(<CharacterCard character={mockCharacter} onClick={mockOnClick} />)
    
    expect(screen.getByText('Mickey Mouse')).toBeInTheDocument()
  })

  it('displays media count correctly', () => {
    render(<CharacterCard character={mockCharacter} onClick={mockOnClick} />)
    
    // Check for film count (2 films)
    expect(screen.getByText('2')).toBeInTheDocument()
    
    // Check for counts (multiple items have count of 1)
    const countOnes = screen.getAllByText('1')
    expect(countOnes.length).toBeGreaterThan(0)
  })

  it('shows "No media appearances" when character has no media', () => {
    render(<CharacterCard character={mockCharacterNoMedia} onClick={mockOnClick} />)
    
    expect(screen.getByText('No media appearances')).toBeInTheDocument()
  })

  it('calls onClick when card is clicked', async () => {
    const user = userEvent.setup()
    render(<CharacterCard character={mockCharacter} onClick={mockOnClick} />)
    
    const card = screen.getByText('Mickey Mouse').closest('.cursor-pointer')
    expect(card).toBeInTheDocument()
    
    if (card) {
      await user.click(card)
      expect(mockOnClick).toHaveBeenCalledTimes(1)
    }
  })

  it('handles missing onClick gracefully', async () => {
    const user = userEvent.setup()
    render(<CharacterCard character={mockCharacter} />)
    
    const card = screen.getByText('Mickey Mouse').closest('.cursor-pointer')
    expect(card).toBeInTheDocument()
    
    // Should not throw error when clicked without onClick
    if (card) {
      await user.click(card)
    }
  })

  it('has correct hover effects', () => {
    render(<CharacterCard character={mockCharacter} onClick={mockOnClick} />)
    
    const card = screen.getByText('Mickey Mouse').closest('.cursor-pointer')
    expect(card).toHaveClass('hover:shadow-xl')
    expect(card).toHaveClass('transition-all')
  })

  it('displays fallback when image url is empty', () => {
    const noImageCharacter: Character = {
      ...mockCharacter,
      imageUrl: '',
    }
    
    render(<CharacterCard character={noImageCharacter} onClick={mockOnClick} />)
    
    // Should show fallback with first letter
    expect(screen.getByText('M')).toBeInTheDocument()
  })
})