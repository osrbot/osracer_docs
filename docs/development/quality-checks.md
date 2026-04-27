# Quality Checks

This documentation site uses static checks to keep content readable and deployable.

## Local checks

```bash
npm run lint
npm run typecheck
npm run build
```

## What is checked

- Markdown style with markdownlint.
- Code and config style with ESLint.
- Formatting with Prettier.
- Vue and TypeScript types with vue-tsc.
- VitePress production build.

## Review expectation

A documentation pull request should pass the same checks that GitHub Actions runs on `main`.
