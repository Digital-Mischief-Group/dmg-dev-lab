# Commands and Guidelines for dmg-dev-lab

## Build/Test Commands
- Build: `pnpm build` or `turbo build`
- Dev: `pnpm dev` or `turbo dev`
- Lint: `pnpm lint` or `ultracite lint`
- Format: `pnpm format` or `ultracite format`
- Test (all): `pnpm test` or `turbo test`
- Test (single): `NODE_ENV=test vitest run path/to/test.test.ts`
- Typecheck: `pnpm typecheck`

## Code Style
- **Formatting**: Uses Biome (extends ultracite)
- **Indentation**: 2 spaces
- **Quotes**: Single quotes for JS/TS, double quotes for JSX
- **Line Width**: 80 characters
- **Semicolons**: Required
- **File Naming**: kebab-case
- **Imports**: Organized via Biome's `organizeImports`
- **Types**: Strict TypeScript, strict null checks enabled
- **Architecture**: Monorepo with Turbo (apps/ and packages/)
- **Package Manager**: Bun 1.1.43
- **Test Framework**: Vitest with JSDOM