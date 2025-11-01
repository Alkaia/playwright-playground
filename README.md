# Playwright Playground

Minimal UI smoke with **Playwright + TypeScript** for demo purposes.

## Run locally
npm ci
npx playwright install --with-deps
npx playwright test
npx playwright show-report  # HTML report

## CI
GitHub Actions runs the suite on pushes/PRs and uploads the HTML report as an artifact.