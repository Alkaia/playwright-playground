# Playwright Playground

Minimal UI smoke with **Playwright + TypeScript** for demo purposes.

## Run locally
npm ci
npx playwright install --with-deps
npx playwright test
npx playwright show-report  # HTML report

### Running specific test suites
```bash
npm test              # Run UI tests
npm run test:api      # Run API tests
npm run test:all      # Run all tests (UI + API)
```

## API Testing
Playwright has built-in support for API testing using the `request` fixture. You can test REST APIs without opening a browser:

- **GET, POST, PUT, DELETE** requests
- **Response validation** (status, headers, body)
- **Authentication** (headers, tokens)
- **Error handling**

See `tests/api-example.spec.ts` for examples.

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
GitHub Actions runs the suite on pushes/PRs and uploads both Playwright HTML report and Allure report as artifacts.