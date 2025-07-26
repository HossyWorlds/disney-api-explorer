import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { SearchBar } from '@/components/ui/search-bar'

describe('SearchBar', () => {
  const mockOnSearch = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders search input correctly', () => {
    render(<SearchBar onSearch={mockOnSearch} />)
    
    const searchInput = screen.getByPlaceholderText('Search Disney characters...')
    expect(searchInput).toBeInTheDocument()
    expect(searchInput).toHaveAttribute('type', 'text')
  })

  it('renders search icon', () => {
    render(<SearchBar onSearch={mockOnSearch} />)
    
    // Check for search icon (Lucide Search icon)
    const searchIcon = screen.getByRole('textbox').parentElement?.querySelector('svg')
    expect(searchIcon).toBeInTheDocument()
  })

  it('calls onSearch when user types', async () => {
    const user = userEvent.setup()
    render(<SearchBar onSearch={mockOnSearch} />)
    
    const searchInput = screen.getByPlaceholderText('Search Disney characters...')
    
    await user.type(searchInput, 'Mickey')
    
    // Should call onSearch with debounced input
    await waitFor(
      () => {
        expect(mockOnSearch).toHaveBeenCalledWith('Mickey')
      },
      { timeout: 1000 }
    )
  })

  it('maintains input value correctly', async () => {
    const user = userEvent.setup()
    render(<SearchBar onSearch={mockOnSearch} />)
    
    const searchInput = screen.getByPlaceholderText('Search Disney characters...')
    
    await user.type(searchInput, 'Minnie')
    
    expect(searchInput).toHaveValue('Minnie')
  })

  it('has correct accessibility attributes', () => {
    render(<SearchBar onSearch={mockOnSearch} />)
    
    const searchInput = screen.getByPlaceholderText('Search Disney characters...')
    
    expect(searchInput).toHaveAttribute('type', 'text')
    expect(searchInput).toHaveAttribute('placeholder', 'Search Disney characters...')
  })
})