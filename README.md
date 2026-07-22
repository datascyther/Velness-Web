# Velness

A privacy-respecting approach to AI and personal growth. Built in public.

## Architecture

```
Firebase Hosting (free static hosting)
       │
       ▼
React 19 + Vite 7 + TypeScript + Tailwind
       │
       ▼
Cloudflare Worker (free GitHub API backend)
       │
       ▼
GitHub API
```

## Quick Start

```bash
# Install dependencies
npm install
cd worker && npm install && cd ..

# Set up secrets
cd worker && cp .dev.vars.example .dev.vars
# Edit .dev.vars with your GitHub token

# Terminal 1: Start the Worker
cd worker && npm run dev

# Terminal 2: Start the frontend
npm run dev
```

## Deploy

```bash
# Deploy Worker
cd worker && npx wrangler deploy

# Deploy frontend
npm run build && firebase deploy --only hosting
```

## Contributing

See [CONTRIBUTING.md](.github/CONTRIBUTING.md).

## License

MIT
