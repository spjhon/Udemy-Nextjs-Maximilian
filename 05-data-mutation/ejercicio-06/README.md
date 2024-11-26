# Ejercicio 06 Maximilliam data mutation

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

## # Ejercicio 06 Maximilliam data mutation

Esta es una app para demostrar el cambio de datos a una base de datos externa o una api, la app es un blog donde los usuarios llenan un formulario

### Como funciona la app

### Temas tratados

- **Server Actions:** Es un feature de react que solo se desbloquea cuando se utiliza con next js y lo que hace es ejecutar funciones que se encuetran en el servidor y que pueden ser llamadas al client para poder interactuar con forms
- **Form Actions:** Es otro feature de react que permite utilizar el actions de los form para trigger funciones del lado del cliente sin que se ejecute el submit default del browser y ejecutar funciones del lado del cliente
- **Optimistic Update**: Lo que hace es hacer un update en la ui, haciendo revalidaciones de paths pero ANTES de hacer updates a la base de datos, por eso se le llama optimistic ya que hace primero el update en el ui antes que en la base de datos

 Este hook es útil cuando deseas reflejar cambios inmediatos en la interfaz de usuario antes de que se confirme una operación asíncrona, como una actualización en un servidor.

### Tips

- "use server" does not mean or guarantee that the code will only execute on the server! Whilst that will be the case for server actions, you can't rely on the usage of "use server" to "hide code" from the client!

If you have code that must never end up on the client-side (no matter if it's a server action or not), you should instead use the server-only package as described [here](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#keeping-server-only-code-out-of-the-client-environment).
