# Agents Coding Guidelines

## Build/Lint/Test Commands
- `pnpm dev` — Start development server
- `pnpm build` — Build for production
- `pnpm lint` — Run ESLint and Prettier checks
- `pnpm lint:fix` — Auto-fix linting and formatting issues
- `pnpm test` — Run all tests
- `pnpm test -- <test-file>` — Run a single test file (e.g. `pnpm test -- layers/base/app/components/BaseButton.spec.ts`)
- Husky pre-commit hooks run automatically on commit

## Code Style
- **Formatting**: Prettier — 2 spaces, single quotes, no semicolons, LF line endings
- **Imports**: Use `#imports` for Nuxt auto-imports, relative imports for local files
- **Types**: Use branded types (`Brand<T>`), Zod schemas for validation
- **Functions**: Use `export default function` for composables, `defineCachedEventHandler` for API routes
- **Naming**: camelCase for variables/functions, PascalCase for components/types
- **Files**: kebab-case for file names, `.vue` for components, `.ts` for composables
- **Error Handling**: Use try-catch for async, log errors appropriately

## Architecture
- **Layers**: Organized in layers (base, chat, marketing, music) with separate configs
- **API**: Server routes in `/server/api/`, repository pattern for data access
- **Types**: Shared types in `/shared/types/`, branded types for IDs
- **Composables**: Vue composables for state management and API calls
