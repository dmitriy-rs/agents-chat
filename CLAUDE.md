# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `pnpm dev` - Start development server on http://localhost:3000
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build locally

### Code Quality
- `pnpm lint` - Run ESLint and Prettier checks
- `pnpm lint:fix` - Auto-fix linting and formatting issues
- Pre-commit hooks run automatically via Husky

### Database
- `pnpm db:push` - Push database schema changes using Drizzle
- `pnpm db:studio` - Open Drizzle Studio for database management
- `pnpm db:seed` - Seed the database with initial data
- Database uses PostgreSQL with Drizzle ORM
- Migrations stored in `layers/chat/server/db/migrations/`

### Testing
- `pnpm test` - Run all tests
- `pnpm test -- <test-file>` - Run a specific test file

## Architecture

This is a Nuxt 4 application with a layered architecture:

### Layers
- **base/** - Core UI components, layouts, and shared utilities
  - Contains common components like AppHeader, AppSidebar, BaseButton
  - Markdown rendering capabilities with MDC module
  - Theme toggling and color mode support
  
- **chat/** - Chat functionality and AI integration
  - Server API routes follow REST patterns in `/server/api/`
  - Repository pattern for data access (chatRepository, projectRepository, messagesRepository)
  - AI integration using Vercel AI SDK with support for OpenAI and Groq models
  - Real-time streaming responses with `streamChatResponse`
  - Database schema with users, projects, chats, and messages tables
  
- **marketing/** - Marketing/landing pages
  
- **music/** - Audio features including background music and sound effects
  - Audio engine with background music player
  - Sound effects system using retro-sound library

### Key Patterns

**API Routes**: Use `defineCachedEventHandler` for GET requests, `defineEventHandler` for mutations
```typescript
export default defineCachedEventHandler(async (event) => {
  // GET handler implementation
})
```

**Branded Types**: IDs use branded types for type safety
```typescript
type ChatId = Brand<'ChatId'>
type ProjectId = Brand<'ProjectId'>
```

**Composables**: Vue composables for state management and API calls
- Query composables: `use*Query` (e.g., `useChatQuery`)  
- Mutation composables: `use*Mutation` (e.g., `useProjectUpdateMutation`)
- Feature composables: `useChat`, `useProjects`, `useChatScroll`

**Repository Pattern**: Data access through repository layer
- Direct database queries using Drizzle ORM
- Consistent error handling and data transformation

### Database

PostgreSQL with Drizzle ORM:
- Schema defined in `layers/chat/server/db/schema.ts`
- Relations in `layers/chat/server/db/relations.ts`
- Environment variable `DATABASE_URL` required

### Configuration

- Main config: `nuxt.config.ts`
- Layer configs: Each layer has its own `nuxt.config.ts`
- Environment variables for API keys:
  - `NUXT_OPENAI_API_KEY` - OpenAI API key
  - `NUXT_GROQ_API_KEY` - Groq API key
  - `NUXT_HF_TOKEN` - Hugging Face token
  - `DATABASE_URL` - PostgreSQL connection string

### Code Style

From AGENTS.md guidelines:
- Prettier: 2 spaces, single quotes, no semicolons, LF line endings
- Imports: Use `#imports` for Nuxt auto-imports
- Components: PascalCase naming, `.vue` extension
- Composables: camelCase, export default function
- Files: kebab-case naming
- Error handling: Try-catch for async operations