# Next js Cache

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Como funciona la app

## Temas Tratados

- Como funciona el cache en next js

## Tips

- son 4 los tipos de chache que maneja next js:

Dependiendo si es next js 14 o next js 15, pero el caching se hace en:

- **Request Memoization:** Next js stores data requests with the same configuration. This avoids duplicate unecesary data fetches. This cache only persist during request duration
- **Data Cache:** Next js stores and reuses fetched data until its revalidated. This avoids unnecesarry requests to the data source and speeds up the application. The cache persists until its revalidated (manually or after a set time).
- **Full Route Cache** Next js stores the rendered HTML and RSC at build time. This avoids unnecessary HTML render cycles & data fetches.
- **Router Cache**: Next js stores the RSC payload in memory in the browser. This ensures extremely fast page transitions since no server requestis needed.
