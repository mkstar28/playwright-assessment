# QA Engineer Take-Home Assignment

Playwright + TypeScript test suite covering UI automation against [Sauce Demo](https://www.saucedemo.com) and API automation against [Reqres](https://reqres.in/).

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm
- A free [Reqres API key](https://app.reqres.in/api-keys) (required since Reqres now authenticates all `/api/*` requests)

## Installation

```bash
npm install
npx playwright install chromium
```

Set your Reqres API key before running API tests:

```bash
# PowerShell
$env:REQRES_API_KEY="your-key-here"

# Bash
export REQRES_API_KEY="your-key-here"
```

## Running Tests

Run the full suite:

```bash
npm test
```

Run UI tests only:

```bash
npm run test:ui
```

Run API tests only:

```bash
npm run test:api
```

Run with the browser visible:

```bash
npm run test:headed
```

View the HTML report after a run:

```bash
npm run report
```

## Project Structure

```
├── pages/                  # Page Object Model classes
│   ├── LoginPage.ts        # Login form actions and locators
│   ├── ProductsPage.ts     # Inventory, cart badge, sorting
│   └── CheckoutPage.ts     # Checkout flow steps
├── tests/
│   ├── fixtures/
│   │   └── test-data.ts    # Shared credentials and checkout data
│   ├── ui/
│   │   ├── login.spec.ts   # Login success and locked-out scenarios
│   │   ├── cart.spec.ts    # Cart badge and product sorting
│   │   └── checkout.spec.ts # End-to-end checkout flow
│   └── api/
│       └── users.spec.ts   # Reqres GET/POST user endpoints
├── playwright.config.ts
└── package.json
```

## Test Coverage

### Part 1 — UI (Sauce Demo)

| Test | Scenario |
|------|----------|
| `login.spec.ts` | Standard user logs in and reaches the products page |
| `login.spec.ts` | Locked-out user sees the error message and stays on login |
| `cart.spec.ts` | Adding two products updates the cart badge to 2 |
| `checkout.spec.ts` | Full checkout flow confirms "Thank you for your order!" |
| `cart.spec.ts` | Sorting by "Price (low to high)" shows the cheapest product first |

Locators prefer `getByTestId` using Sauce Demo's `data-test` attributes, with semantic locators where appropriate.

### Part 2 — API (Reqres)

| Test | Scenario |
|------|----------|
| `users.spec.ts` | `GET /api/users?page=2` — status 200, `data` array, required user fields |
| `users.spec.ts` | `POST /api/users` — status 201, echoed name/job, id and createdAt |
| `users.spec.ts` | Bonus: create-then-verify flow structure (reqres does not persist data) |

API tests use Playwright's `request` fixture — no browser is launched.

## Design Decisions

- **Page Object Model** keeps locators and user actions out of spec files.
- **Independent tests** — each spec logs in fresh via `beforeEach` where needed, so tests run in any order or in parallel.
- **Chromium only** — cross-browser coverage was out of scope per the assignment brief.
- **Separate Playwright projects** for UI and API tests with appropriate base URLs.

## Configuration

- UI base URL: `https://www.saucedemo.com`
- API base URL: `https://reqres.in`
- Parallel execution enabled locally; retries enabled on CI
