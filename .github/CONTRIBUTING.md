# Contributing to Velness

Thank you for your interest in contributing to Velness! This guide will help you get started.

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/datascyther/velness-ai.git
   cd velness-ai
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install Worker dependencies**
   ```bash
   cd worker && npm install && cd ..
   ```

4. **Set up local secrets**
   ```bash
   cd worker
   cp .dev.vars.example .dev.vars
   # Edit .dev.vars with your GitHub personal access token
   cd ..
   ```

5. **Start the Worker** (Terminal 1)
   ```bash
   cd worker && npm run dev
   ```

6. **Start the frontend** (Terminal 2)
   ```bash
   npm run dev
   ```

The frontend dev server runs at `http://localhost:5173` and proxies `/api` requests to the Worker at `http://localhost:8787`.

## Branch Naming

- `feat/<description>` — new features
- `fix/<description>` — bug fixes
- `chore/<description>` — maintenance tasks
- `docs/<description>` — documentation changes

## Pull Request Guidelines

- Keep PRs focused on a single change
- Include a clear description of what and why
- Reference related issues
- Ensure the build passes (`npm run build`)
- Ensure TypeScript checks pass (`npx tsc --noEmit` in both root and `worker/`)

## Code Style

- TypeScript with strict mode
- Tailwind CSS for styling
- Follow existing patterns in the codebase
- No unnecessary dependencies
