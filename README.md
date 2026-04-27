# OSRacer Docs

Developer documentation site for [OSRacer](https://github.com/osrbot/osracer), built with VitePress, Markdown, Mermaid, bilingual content, and GitHub Pages.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The changelog pages are generated from recent commit messages in `osrbot/osracer` during build.

## Quality checks

```bash
npm run lint
npm run typecheck
```

## Deployment

GitHub Actions builds the site and deploys it to GitHub Pages from the `main` branch.
