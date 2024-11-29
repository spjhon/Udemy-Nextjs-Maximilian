# Ejercicio 08 Maximilliam Optimization

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

## # Ejercicio 08 Maximilliam Optimizacion

Esta es una app para demostrar el cambio de datos a una base de datos externa o una api, la app es un blog donde los usuarios llenan un formulario, este fue el ejercicio 06, pero se va a reutilizar en el ejercicio 08 para demostrar la optimizacion que se pude hacer a diferentes elementos dentro de la app, desde metadata hasta imagenes.

### Como funciona la app

### Temas tratados

- Optimizacion de imagenes
- Optimizacion de metadata

### Tips

- Cuando se importa una imagen desde next js y se conoce la imagen at build time, lo que se genera es un obejct que contiene varios atributos bastante utiles, como blur, with and height.
- Para imagenes se recomienda utilizar la propiedad exclusiva de next js llamada sizes por ejemplo "10vw" para que asi next js adapte las imagenes de acuerdo al viewport.
- Aprender a utilizar la propiedad de imagen llamada priority
- Ojo con las imagenes desde sitios externos, se debe explicitamente declarar como entran estas imagenes en next js a traves del nextconfig.js
- Puede haber metadata tanto en layouts como en pages

### Autentication

### Temas a tratar

- User singUp
- User Login
- Protecting Routes
