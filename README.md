# Playwright Playground

Minimal UI smoke with **Playwright + TypeScript** for demo purposes.

## Run locally

npm ci
npx playwright install --with-deps
npx playwright test
npx playwright show-report # HTML report

### Running specific test suites

```bash
npm test              # Run UI tests
npm run test:api      # Run API tests
npm run test:visual   # Run visual regression tests
npm run test:all      # Run all tests (UI + API + Visual)
npm run test-ui       # Run UI tests in interactive mode
```

## Code Quality

### Linting (ESLint)

The project uses ESLint with TypeScript and Playwright plugins for code quality:

```bash
npm run lint          # Check for linting errors
npm run lint:fix      # Auto-fix linting errors
```

### Formatting (Prettier)

Code is automatically formatted using Prettier:

```bash
npm run format        # Format all files
npm run format:check  # Check formatting without changing files
```

### Pre-commit Hooks

This project uses Husky and lint-staged to automatically format and lint files on commit:

- Files are automatically formatted with Prettier on commit
- ESLint errors are auto-fixed when possible
- Only staged files are processed (fast commits)

If you need to skip hooks: `git commit --no-verify` (not recommended)

## API Testing

Playwright has built-in support for API testing using the `request` fixture. We can test REST APIs without opening a browser:

- **GET, POST, PUT, DELETE** requests
- **Response validation** (status, headers, body)
- **Authentication** (headers, tokens)
- **Error handling**

See `tests/api/users.spec.ts` and `tests/api/posts.spec.ts` for examples.

## Visual Regression Testing

The project includes visual regression tests in `tests/visual/` using Playwright's built-in screenshot comparison:

```bash
npm run test:visual  # Run only visual regression tests
npm run test:all    # Runs all tests including visual regression
```

**How it works:**

- First run creates baseline screenshots
- Subsequent runs compare against baselines
- Detects visual differences (layout, styling, content changes)
- Uses SSIM mode (perceptual comparison) for better accuracy

**Updating baselines:**
When intentional UI changes occur, update baselines:

```bash
npm run test:visual -- --update-snapshots  # Update visual test baselines
```

**Visual test examples:**

- Full page screenshots (homepage, cart page)
- Component-level screenshots (navbar, headers)
- Cross-browser visual consistency

## Allure Reports

After running tests, Allure results are generated in `allure-results` directory.

To view Allure report locally:

```bash
npm run allure:serve  # Serve and open report in browser
# or
npm run allure:generate  # Generate static report
npm run allure:open      # Open generated report
```

**Note:** You need to have Allure commandline installed. Install it via:

- macOS: `brew install allure`
- Or download from: https://github.com/allure-framework/allure2/releases

## CI

GitHub Actions runs on pushes/PRs with the following jobs:

1. **UI Tests** - Runs Playwright UI tests and uploads reports
2. **API Tests** - Runs API tests
3. **Visual Tests** - Runs visual regression tests (included in UI job)

Note: Visual regression tests are in `tests/visual/` directory, separate from functional UI tests.

Lint and format checks run locally via pre-commit and pre-push hooks.

All jobs upload both Playwright HTML report and Allure report as artifacts.
