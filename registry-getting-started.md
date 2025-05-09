# Getting Started with shadcn/ui Registry

This guide walks through the process of setting up your own component registry for distributing custom components, hooks, pages, and other files to React projects.

## Introduction

If you're starting a new registry project, you can use the [registry template](https://github.com/shadcn-ui/registry-template) as a starting point (already configured). This guide assumes you already have a project with components and want to turn it into a registry.

## Setting Up registry.json

The `registry.json` file is required if you're using the `shadcn` CLI to build your registry. Create this file in the root of your project:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "acme",
  "homepage": "https://acme.com",
  "items": [
    // ...
  ]
}
```

This file must conform to the [registry schema specification](https://ui.shadcn.com/docs/registry/registry-json).

## Adding Registry Items

### 1. Create Your Component

Add your component to your project. For example, a simple `<HelloWorld />` component:

```tsx
// registry/new-york/hello-world/hello-world.tsx
import { Button } from "@/components/ui/button"

export function HelloWorld() {
  return <Button>Hello World</Button>
}
```

**Note**: This example places the component in the `registry/new-york` directory. Follow the `registry/[NAME]` directory structure, and ensure it's configured in your `tailwind.config.ts` file.

### 2. Add Component to Registry

Add your component definition to `registry.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "acme",
  "homepage": "https://acme.com",
  "items": [
    {
      "name": "hello-world",
      "type": "registry:block",
      "title": "Hello World",
      "description": "A simple hello world component.",
      "files": [
        {
          "path": "registry/new-york/hello-world/hello-world.tsx",
          "type": "registry:component"
        }
      ]
    }
  ]
}
```

Define your registry item with `name`, `type`, `title`, `description`, and `files`. For each file, specify the `path` and `type`.

## Building Your Registry

### 1. Install the shadcn CLI

```bash
pnpm add shadcn@canary
```

Note: The `build` command is only available in the `shadcn@canary` version.

### 2. Add a Build Script

Add a build script to your `package.json` file:

```json
{
  "scripts": {
    "registry:build": "shadcn build"
  }
}
```

### 3. Run the Build Script

```bash
pnpm registry:build
```

By default, this generates the registry JSON files in `public/r` (e.g., `public/r/hello-world.json`). You can change the output directory with the `--output` option.

## Serving Your Registry

Run your development server:

```bash
pnpm dev
```

Your files will be served at `http://localhost:3000/r/[NAME].json` (e.g., `http://localhost:3000/r/hello-world.json`).

## Publishing Your Registry

To make your registry available to other developers, deploy your project to a public URL.

## Adding Authorization

The `shadcn` CLI doesn't include built-in authentication, but you can implement it on your registry server. A common approach is using a `token` query parameter:

```
http://localhost:3000/r/hello-world.json?token=[SECURE_TOKEN_HERE]
```

Authenticate requests with a secure token and return a 401 Unauthorized response if invalid. Both the `shadcn` CLI and "Open in v0" will handle the 401 response appropriately.

**Note**: Make sure to encrypt and expire tokens.

## Registry Guidelines

- Place registry items in the `registry/[STYLE]/[NAME]` directory
- Required properties for block definitions: `name`, `description`, `type`, and `files`
- List all registry dependencies in `registryDependencies`
- List all external package dependencies in `dependencies`
- Imports should always use the `@/registry` path
- Place files within a registry item in `components`, `hooks`, `lib` directories

## Installing Registry Items

To install a registry item using the `shadcn` CLI:

```bash
pnpm dlx shadcn@latest add http://localhost:3000/r/hello-world.json
```

---

Source: [shadcn/ui Registry Documentation](https://ui.shadcn.com/docs/registry/getting-started)
