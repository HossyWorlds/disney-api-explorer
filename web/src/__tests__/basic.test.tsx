import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

// Simple smoke test to verify testing setup
describe('Basic Test Setup', () => {
  it('can render a simple component', () => {
    const TestComponent = () => <div>Hello Test</div>
    render(<TestComponent />)
    expect(screen.getByText('Hello Test')).toBeInTheDocument()
  })

  it('can use vitest matchers', () => {
    expect(1 + 1).toBe(2)
    expect('hello').toMatch(/hello/)
    expect(['apple', 'banana']).toContain('apple')
  })

  it('can handle async operations', async () => {
    const asyncFunction = () => Promise.resolve('async result')
    const result = await asyncFunction()
    expect(result).toBe('async result')
  })
})