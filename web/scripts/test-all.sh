#!/bin/bash

echo "🧪 Running all tests for Disney API Explorer..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Please run this script from the web directory"
    exit 1
fi

# 1. Type checking
echo "📝 Running TypeScript type checking..."
if npm run type-check; then
    print_status "Type checking passed"
else
    print_error "Type checking failed"
    exit 1
fi

# 2. Linting
echo "🔍 Running ESLint..."
if npm run lint; then
    print_status "Linting passed"
else
    print_warning "Linting failed - continuing with tests"
fi

# 3. Build
echo "🏗️  Building application..."
if npm run build; then
    print_status "Build successful"
else
    print_error "Build failed"
    exit 1
fi

# 4. Unit tests
echo "🧪 Running unit tests..."
if npm run test; then
    print_status "Unit tests passed"
else
    print_error "Unit tests failed"
    exit 1
fi

# 5. E2E tests (if Playwright is installed)
if command -v npx playwright &> /dev/null; then
    echo "🌐 Running E2E tests..."
    if npm run test:e2e; then
        print_status "E2E tests passed"
    else
        print_error "E2E tests failed"
        exit 1
    fi
else
    print_warning "Playwright not installed - skipping E2E tests"
    echo "To install Playwright: npm install @playwright/test && npx playwright install"
fi

echo ""
echo "🎉 All tests completed successfully!"
echo ""
echo "📊 Test Summary:"
echo "  ✅ Type checking: PASSED"
echo "  ✅ Build: PASSED"
echo "  ✅ Unit tests: PASSED"
if command -v npx playwright &> /dev/null; then
    echo "  ✅ E2E tests: PASSED"
else
    echo "  ⚠️  E2E tests: SKIPPED"
fi 
