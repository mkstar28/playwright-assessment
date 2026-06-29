# Assignment 1 — Sauce Demo E-Commerce

**Target:** [https://www.saucedemo.com](https://www.saucedemo.com)

## Framework Choice

**Playwright + TypeScript + Page Object Model (POM)**

| Reason | Detail |
|--------|--------|
| Auto-waiting | Built-in retries reduce flaky UI tests |
| Semantic locators | `getByTestId`, `getByRole` align with Sauce Demo's `data-test` attributes |
| Single tool for UI + API | Same runner, reporters, and CI config |
| TypeScript | Type-safe page objects and shared fixtures |
| Parallel execution | Tests run independently with `fullyParallel: true` |

## What's Included

### Manual Test Cases
`docs/assignment-1/manual-test-cases.csv` — import into Excel or Google Sheets.

**Columns:** Test ID, Module, Type, Severity, Priority, Steps, Expected, Actual, Status

Covers **Positive**, **Negative**, and **End-to-End** scenarios across Login, Products, Cart, Checkout, and Navigation modules (25 test cases).

### Automation
| Spec | Coverage |
|------|----------|
| `login.spec.ts` | Positive login, locked-out user |
| `login-negative.spec.ts` | Empty fields, invalid credentials |
| `cart.spec.ts` | Cart badge, price sorting |
| `checkout.spec.ts` | Full checkout flow |
| `checkout-negative.spec.ts` | Missing shipping fields |
| `e2e.spec.ts` | Full shopping journey end-to-end |

## Run

```bash
npm install
npx playwright install chromium
npm run test:assignment-1          # headless
npm run test:headed                # browser visible
```

## Extension Plan

| Area | Next Step |
|------|-----------|
| **Parallelisation** | Shard by spec file in CI (`--shard=1/3`); already parallel locally |
| **Reporting** | Add Allure or JSON reporter; upload artifacts in GitHub Actions |
| **Fixtures** | Custom `authenticatedPage` fixture to reduce `beforeEach` login boilerplate |
| **Cross-browser** | Enable Firefox/WebKit projects in `playwright.config.ts` |
| **Visual regression** | `toHaveScreenshot()` on product grid and checkout pages |
| **CI** | Matrix strategy for browser × shard; Slack/email on failure |

## CI

GitHub Actions runs UI tests on every push to `main` — see `.github/workflows/playwright.yml`.
