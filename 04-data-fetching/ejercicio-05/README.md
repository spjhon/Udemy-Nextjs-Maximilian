# Ejercicio 05 Maximilliam data fetching

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Ejercicio 05 Curso Next js Maximilliam

## Como funciona la app

Es una demo de una pagina de noticias AHORA CON DATA FETCHING

## Temas tratados

- Fetching Deep Dive
- Client side data fetching
- Server side fetching
- Sever side fetching conectandose directamente a la base de datos
- Loading states con server side fetching
- Suspense
- Async functions and components

## Tips

### Option 01: Client Side Data Fetching

Esta opcion utiliza useState y useEffect del lado del cliente para controlar el fetching efectuado con states de loading, error y success, sin embargo para next js es mejor hacerlo del lado del servidor ya que en el internet la hacer fetching tiene que haber ciertas regulaciones de seguridad para evitar que cualquiera haga fetching cuando quiera.

### Option 02: Server Side Fetching

Gracias a que por defecto los componentes de next js son server side, se puede convertir el componente en async, osea que puede retornar una promesa con sus states y todo, cosa que React client side no puede hacer.

### Option 03: Server side fetching directametne conectandose a la base de datos

Este metodo ahorra tener un backend separado y escuchando peticiones sino que desde el mismo next se puede hacer, es una opcion viable solo para algunos casos especificos, pero en general es mejor tener un backend separado y controlado con cors ya que puede que no solo la app de next se conecte sino otras app independientes, en una tienda electronica pueden ser POS u otros medios de accessar a la informacion.
