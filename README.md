# interactive-os-folio

## GitHub Pages deployment checklist

This project is configured for project-page hosting at:

- `https://krkshitiz.github.io/interactive-os-folio/`

### One-time GitHub setting

In **Settings → Pages**:

- **Source**: `Deploy from a branch`
- **Branch**: `gh-pages`
- **Folder**: `/ (root)`

### Deploy command

```bash
npm run deploy
```

What it does:

1. Builds production assets (`vite build`).
2. Prepares `dist/404.html` from `dist/index.html` for SPA fallback behavior.
3. Adds `dist/.nojekyll` so Pages serves assets as-is.
4. Publishes `dist/` to the `gh-pages` branch root.

After deployment, hard-refresh the site (Ctrl/Cmd+Shift+R) to clear stale cached bundles.
