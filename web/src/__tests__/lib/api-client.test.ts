import { describe, it, expect } from 'vitest'
import { disneyApi, apiClient } from '@/lib/api-client'

describe('API Client Structure Tests', () => {
  it('should export disneyApi object with correct methods', () => {
    expect(disneyApi).toBeDefined()
    expect(typeof disneyApi.searchCharacters).toBe('function')
    expect(typeof disneyApi.getCharacterById).toBe('function')
    expect(typeof disneyApi.getAllCharacters).toBe('function')
  })

  it('should have correct function signatures', () => {
    // Check function parameters
    expect(disneyApi.searchCharacters.length).toBeGreaterThanOrEqual(1)
    expect(disneyApi.getCharacterById.length).toBe(1)
    expect(disneyApi.getAllCharacters.length).toBeGreaterThanOrEqual(0)
  })

  it('should export apiClient with axios methods', () => {
    expect(apiClient).toBeDefined()
    expect(typeof apiClient.get).toBe('function')
    expect(typeof apiClient.post).toBe('function')
    expect(typeof apiClient.put).toBe('function')
    expect(typeof apiClient.delete).toBe('function')
  })

  it('should have proper API configuration', () => {
    // Verify defaults are set
    expect(apiClient.defaults).toBeDefined()
    expect(apiClient.defaults.timeout).toBe(10000)
    expect(apiClient.defaults.headers?.['Content-Type']).toBe('application/json')
  })

  it('should have correct base URL configuration', () => {
    const baseURL = apiClient.defaults.baseURL
    expect(baseURL).toBeDefined()
    expect(baseURL).toContain('disneyapi.dev')
  })
})