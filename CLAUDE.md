# Disney API Explorer

A modern web-based GUI for exploring Disney characters using the Disney API.

## Project Context & Vision
This project was created by a software engineer and Disney fan to solve a real problem: Disney API (disneyapi.dev) lacks a user-friendly GUI interface. We're building the first comprehensive web-based tool for Disney character exploration, targeting Disney fans who want to easily search, discover, and learn about their favorite characters.

## Business Goals
- **First-mover advantage**: No existing GUI tools for Disney API
- **Community contribution**: Showcase project for Disney API ecosystem
- **User value**: Make Disney character data accessible to non-technical users

## Tech Stack
- Framework: Next.js 14 with App Router
- Language: TypeScript 5.2
- Styling: Tailwind CSS 3.4
- State Management: React Query
- Icons: Lucide React

## Project Structure
- `/web`: React/Next.js application
  - `src/app`: Next.js App Router pages and layouts
  - `src/components`: Reusable React components
    - `src/components/ui`: Base UI components
    - `src/components/character`: Character-specific components
  - `src/lib`: Core utilities and API clients
  - `src/types`: TypeScript type definitions
  - `src/hooks`: Custom React hooks

## Commands
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm run type-check`: Run TypeScript compiler
- `npm run test`: Run Jest tests

## Code Style
- Use ES modules (import/export) syntax, not CommonJS
- Destructure imports when possible (e.g., `import { useState } from 'react'`)
- All components must be function components with TypeScript
- Use arrow functions for component definitions
- Prefer const assertions for literal types
- Use proper TypeScript types, avoid `any`

## Disney API Details
- **API Provider**: Manu Castrillon (individual developer, Disney fan)
- **License**: BSD-3-Clause (Open Source)
- **Data Source**: Disney Wiki + public information
- **Character Count**: 9,820+ Disney characters
- **Status**: Unofficial, individually maintained for 3+ years
- **Sustainability**: Depends on community donations

### API Endpoints
- Base URL: `https://api.disneyapi.dev`
- `GET /character` - All characters (paginated, 50 per page)
- `GET /character/:id` - Single character by ID
- `GET /character?name={name}` - Search by character name
- No authentication required
- RESTful + GraphQL support

### Character Data Structure
```typescript
interface Character {
  _id: number;
  name: string;
  imageUrl: string;
  films: string[];
  shortFilms: string[];
  tvShows: string[];
  videoGames: string[];
  parkAttractions: string[];
  allies: string[];
  enemies: string[];
  sourceUrl: string; // Disney Wiki link
}
```

## Risk Management
**IMPORTANT**: Disney API is unofficial and has inherent risks
- Service could discontinue without notice
- Individual maintenance (not corporate-backed)
- Potential copyright considerations
- Rate limiting recommended to be respectful

### Mitigation Strategies
- Implement robust caching to reduce API dependency
- Display proper attribution to Disney and API creator
- Have fallback/migration plan to alternative APIs
- Monitor service health and community updates

## File Naming
- Components: PascalCase (e.g., `CharacterCard.tsx`)
- Utilities: camelCase (e.g., `apiClient.ts`)
- Pages: kebab-case (e.g., `character-details`)
- Types: PascalCase with descriptive names

## Git Workflow
- Branch naming: `feature/issue-number-description` or `fix/issue-number-description`
- Commit messages: Follow conventional commits format
- Always create PRs for changes
- Run lint and type-check before committing

## Testing
- Write tests for utility functions and complex components
- Use React Testing Library for component tests
- Mock API calls in tests
- Test files should be co-located with source files (`.test.tsx`)

## Environment Variables
- `NEXT_PUBLIC_DISNEY_API_URL`: Disney API base URL
- Store in `.env.local` for development
- Never commit environment files

## Target Features (MVP)
1. **Character Search**: Real-time search with debouncing
2. **Character Gallery**: Paginated card-based display
3. **Character Details**: Full information page with media
4. **Responsive Design**: Mobile-first, works on all devices
5. **Error Handling**: Graceful API failure management

## Enhanced Features (Post-MVP)
- Advanced filtering (by films, TV shows, games)
- Favorites system (localStorage-based)
- Random character discovery
- Social sharing capabilities
- Character comparison tool
- Search history

## User Experience Goals
- **Intuitive**: Non-technical Disney fans can easily navigate
- **Fast**: Sub-second search responses with caching
- **Engaging**: Encourage character discovery and exploration
- **Accessible**: WCAG 2.1 compliant for all users
- **Mobile-optimized**: Touch-friendly interactions

## Accessibility
- Use semantic HTML elements
- Provide alt text for all images
- Ensure keyboard navigation works
- Maintain color contrast ratios
- Use ARIA labels where needed

## Important Notes
- Disney API is unofficial and individually maintained
- **Always display proper attribution** to Disney and API creator Manu Castrillon
- Implement error boundaries for API failures
- Be respectful of API - implement caching and avoid excessive requests
- This is a portfolio/community project, not commercial
- Consider Disney's intellectual property rights in all implementations

## Development Philosophy
- **User-first**: Every feature should solve a real Disney fan's problem
- **Quality over speed**: Better to ship fewer, polished features
- **Community-driven**: Open to feedback and contributions
- **Respectful**: Honor Disney's brand and API creator's work
- **Sustainable**: Build for long-term maintenance and growth

## Do Not
- Edit files in `node_modules`
- Commit `.env.local` or sensitive data
- Use inline styles instead of Tailwind classes
- Create components without proper TypeScript types
- Skip error handling for API calls

## When Working on Features
1. Create feature branch from main
2. Implement with tests
3. Run `npm run lint` and `npm run type-check`
4. Test locally with `npm run dev`
5. Create PR with descriptive title and body
6. Wait for review before merging

## Claude-Specific Instructions
- Always run type-check after making changes
- Use the exact command names listed above
- When creating components, include proper TypeScript interfaces
- Follow the established project structure strictly
- Ask for clarification if requirements are unclear
- Suggest improvements when you see opportunities
