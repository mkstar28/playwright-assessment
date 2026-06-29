# QA Automation Assignments

Playwright + TypeScript test suites for two assignments:

| Assignment | Target | Type |
|------------|--------|------|
| [Assignment 1](docs/assignment-1/README.md) | [Sauce Demo](https://www.saucedemo.com) | UI — Positive, Negative, E2E |
| [Assignment 2](docs/assignment-2/README.md) | [Fake Store API](https://fakestoreapi.com) | API — Cart CRUD, Auth, Schema |

## Quick Start

```bash
npm install
npx playwright install chromium

npm run test:assignment-1    # Sauce Demo UI
npm run test:assignment-2    # Fake Store API
npm test                     # All projects
```

## Project Structure

```
docs/
  assignment-1/
    manual-test-cases.csv    # Manual test cases (Excel/Sheets ready)
    README.md
  assignment-2/
    README.md
pages/                       # POM for Sauce Demo
helpers/fakestore/           # Schema + auth helpers
tests/
  ui/                        # Assignment 1 automation
  api/fakestore/             # Assignment 2 automation
  api/users.spec.ts          # Reqres (optional, needs API key)
.github/workflows/           # CI runs on push
```

## Manual Test Cases (Assignment 1)

Import `docs/assignment-1/manual-test-cases.csv` into Google Sheets or Excel.

Columns: **Test ID, Module, Type, Severity, Priority, Steps, Expected, Actual, Status**

## CI

GitHub Actions runs UI + Fake Store API tests on every push to `main`.

## Framework

**Playwright + TypeScript** — chosen for auto-waiting, semantic locators, built-in API testing, parallel execution, and first-class CI support. See each assignment README for rationale and extension plans.
