# Assignment 2 — Fake Store API Cart CRUD

**Target:** [https://fakestoreapi.com](https://fakestoreapi.com)

## Framework Choice

**Playwright Request API + TypeScript**

| Reason | Detail |
|--------|--------|
| No browser overhead | API tests use `request` fixture — fast and CI-friendly |
| Built-in assertions | `expect(response.status())`, schema helpers, `toMatchSnapshot()` |
| Same ecosystem as UI | One config, one CI pipeline, shared reporters |
| TypeScript interfaces | Typed cart payloads and response validation |
| Data-driven tests | Native `for...of` loops over product ID fixtures |

## What's Included

| Spec | Coverage |
|------|----------|
| `cart-crud.spec.ts` | GET, POST, PUT, DELETE — positive and negative |
| `cart-auth.spec.ts` | Valid/invalid login, bearer token cart creation |
| `cart-data-driven.spec.ts` | Same POST scenario over product IDs 1, 2, 3 |
| `cart-data-driven.spec.ts` | **Contract test** — snapshot response shape |

### Schema Validation
`helpers/fakestore/cart-schema.ts` validates:
- `id`, `userId`, `date`, `products[]` presence and types
- Each product has `productId` and `quantity` > 0

### Senior Bonus — Contract Test
`toMatchSnapshot('cart-response-contract')` captures the response shape (keys + structure). Future API changes that break the contract fail the test.

## Run

```bash
npm install
npm run test:assignment-2
```

## Extension Plan

| Area | Next Step |
|------|-----------|
| **Parallelisation** | Already `fullyParallel`; increase CI workers for API-only runs |
| **Reporting** | Add JUnit XML for CI dashboards; trend pass rate over time |
| **Schema** | Migrate to Zod/JSON Schema for stricter validation |
| **Auth** | Store token in `test.beforeAll` fixture; test expired token scenarios |
| **Data** | Externalise payloads to JSON/CSV for broader data-driven coverage |
| **Contract** | Publish OpenAPI spec; auto-generate snapshots on API version bump |

## CI

Fake Store API tests run on every push via GitHub Actions (no API key required).
