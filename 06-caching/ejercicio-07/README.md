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

***

- Resulta que en next js 14 cuando se hace un nuevo request, si los datos se mantienen no hace un nuevo request, en next js 15, la cosa cambia.
- Una forma es utilizar el revalidatePath() al final del action o del request.
- desde el fetch se puede configurar el cache y next js va a sobreescribir la configuracion de fetch para modificar el comportamiento del cache.
- se le puede ademas en el fetch agregar una propiedad nueva llamada next que lo que hace es poder establecer un tiempo de que guarda el cache pero despues lo desecha y si despues se hace un request no se utiliza el cache
- tambien se puden utilizar exports de variables con palabras reservadas para generar las revalidaciones como por ejemplo const revalidate y const dynamic o una funcion especial que se importa llamada unstableNo_Store()
- Se recomienda revalidatePath(/) ya que es mas granular asi como suspense, tambien existe revalidateTag()
- Cuando el fetching es directamente desde next js y no desde una api externa hay ciertas diferencias en el cache que hay que tener en cuenta cuando se hace la build de la app
