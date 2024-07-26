# Ejercicio 03

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Ejercicio 03 Curso Next js Maximilliam

## Como funciona la app

Es la app de una pizzeria con un pequeno blog.

## Temas tratados

- Creacion de una pagina utilizando las herramientas y enrutamiento del ejercicio anterior.
- Image tag (que permite lazy loading y un monton de optimizaciones mas)
- useClient
- fetching data

## Tips

- Comenzamos con rutas dinamicas y rutas sencillas
- Seguimos con el layout, el layout es donde se encuentra el HTML principal
- Se utilizan CSS modules
- Se utiliza y se recomienda utilizar el tag Image de next js para imagenes y optimizacion que esta en los docs. A parte del componente Link de next js tambien se tiene el Image componente que lo que hace es tener mas metadata de las imagnes para poder agregar atributos como lazy loading, cargado de diferentes resoluciones dependiendo del viewport entre otros.
- Si se desea desactivar el lazy loading se agrega el atributo priority
- Se popula la pagina desde la page.tsx principal y se utilizan los links y se adicionan temas con css module
- **OJO**, recordar que todos los componentes en nextjs por defecto son trabajados en el servidor, si se requiere algo del lado del cliente se debe de especificar el useClient.

- **Cuando utilizar server o client**, si el componente requiere manipulacion del DOM es del client, si requiere poner intervalos, es del cliente, si se desea correr scripts de animacion, en el cliente. Ahora, que va en el server, request, o llamadas post, operaciones de autenticacion.
- el slug es un prop que entra a cualquier componente para definir cual es el componente que se va a renderizar de forma dinamica.

- **Fetching Data**: Es importante observar que como el componente es un server component no se necesita un useEffect, 