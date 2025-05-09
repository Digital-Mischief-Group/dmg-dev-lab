# shadcn-ui Registry Template

The [shadcn-ui registry-template-v4](https://github.com/shadcn-ui/registry-template-v4) is a template for running your own component registry using Next.js. It allows you to distribute custom components, hooks, pages, and other files to any React project.

## Overview

This template uses Tailwind v4. For Tailwind v3, see [registry-template](https://github.com/shadcn-ui/registry-template).

## Key Features

- Uses a `registry.json` file to define components and their files
- Leverages the `shadcn build` command to build the registry
- Serves registry items as static files under `public/r/[name].json`
- Includes a route handler for serving registry items
- All registry items are compatible with the `shadcn` CLI
- Integrates with v0 using the "Open in v0" API

## Repository Structure

The repository is organized with the following key directories:

- `/app` - Next.js application code
- `/components` - UI components
- `/lib` - Utility functions and helpers
- `/public` - Static assets
- `/registry/new-york` - Example registry components

## File Configuration

Important configuration files include:

- `.gitignore` - Files and directories to ignore in version control
- `README.md` - Documentation
- `components.json` - Component configuration
- `registry.json` - Registry configuration
- Various configuration files for Next.js, ESLint, PostCSS, etc.

## Documentation

For complete documentation, visit the [shadcn documentation](https://ui.shadcn.com/docs/registry).

## Repository Info

- **Stars**: 58
- **Forks**: 13
- **Watchers**: 4
- **Languages**: TypeScript (75.6%), CSS (22.8%), JavaScript (1.6%)

---

Source: [shadcn-ui/registry-template-v4](https://github.com/shadcn-ui/registry-template-v4)
