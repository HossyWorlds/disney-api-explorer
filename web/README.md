This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Testing Strategy

This project implements a comprehensive testing strategy to ensure quality and reliability:

### Unit Tests (Vitest + React Testing Library)
- **Location**: `src/__tests__/`
- **Run**: `npm run test`
- **Coverage**: `npm run test:coverage`
- **Watch mode**: `npm run test:watch`

### E2E Tests (Playwright)
- **Location**: `src/__tests__/e2e/`
- **Run**: `npm run test:e2e`
- **UI mode**: `npm run test:e2e:ui`
- **Headed mode**: `npm run test:e2e:headed`

### Visual Regression Tests
- Screenshot comparisons for UI consistency
- Mobile and desktop layouts
- Search results and error states

### Performance Tests
- Page load time measurements
- Search response time validation
- Memory leak detection

### Running All Tests
```bash
# Run the comprehensive test suite
./scripts/test-all.sh
```

### Test Categories

1. **Home Page Tests**
   - Page loading and rendering
   - Character card display
   - Search functionality
   - Navigation to detail pages
   - Error handling
   - Mobile responsiveness

2. **Character Detail Tests**
   - Detail page loading
   - Information sections display
   - Navigation back to home
   - Non-existent character handling
   - Mobile layout verification

3. **Visual Regression Tests**
   - Screenshot comparisons
   - Layout consistency
   - Cross-browser compatibility

4. **Performance Tests**
   - Load time measurements
   - Search response times
   - Memory usage monitoring

## CI/CD Integration

Tests are automatically run on:
- Every push to main/develop branches
- All pull requests
- Manual triggers

Test results and screenshots are uploaded as artifacts for review.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
