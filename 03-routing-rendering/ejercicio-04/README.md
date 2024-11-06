# Ejercicio 04 Maximilliam

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

## Ejercicio 04 Curso Next js Maximilliam

## Como funciona la app

Es una demo de una pagina de noticias

## Temas tratados

- Routing Deep Dive

## Tips

- Se esta utilizando por primera vez Next js 15 y Turbopack

- **Standard Routes** Son aquellas rutas que se hacen solo con crear una carpeta en el directorio de la app (/about).
- **Dynamic Routes** Son aqullas deifinidas por segmentos que son dinamicos y que tienen acceso a params para rutas dinamicas y cambiantes (/app/post/[slug]).
- **Prallel Routes** Como su nombre lo indica son dos rutas que van a la misma parte, rutas paralelas. En Next.js, las rutas paralelas (o parallel routes) permiten crear varias rutas o vistas que pueden renderizarse de forma simultánea en una misma página. Su propósito es ofrecer mayor flexibilidad en la gestión del enrutado y la renderización de contenido dentro de una misma URL, permitiendo dividir la interfaz en secciones que puedan cambiar de manera independiente.

  1. Renderización simultánea de contenido independiente
  2. Experiencias de usuario complejas
  3. Gestión de rutas complejas en aplicaciones avanzadas
  4. Reducción de la carga inicial
  5. Control granular del estado y renderizado
- **Catch All Routing** Es una característica que permite capturar rutas dinámicas y manejarlas en una sola página o componente. Esto es útil cuando tienes una estructura de URL donde varias rutas comparten un patrón común, pero tienen partes variables. En lugar de crear un archivo de página para cada ruta posible, Next.js permite manejar todos los casos en una sola ruta dinámica.

Casos de uso comunes:

  1. Páginas de blog: Si tienes una estructura de URL donde cada entrada de blog tiene varias secciones o categorías, puedes capturar todas las rutas y manejar la lógica en una sola página.
  2. Documentación: En sitios de documentación, donde puede haber varias subsecciones y niveles anidados.
  3. 404 personalizadas: Puedes utilizar el catch-all para manejar rutas desconocidas y redirigir o mostrar una página 404 personalizada.

La diferencia principal entre un catch-all route y un layout en Next.js está en su propósito y la forma en que se utilizan:

  1. Catch-All Route: Captura múltiples rutas dinámicas y las dirige a un solo componente de página, permitiéndote manejar varias estructuras de URL de forma centralizada.
  2. Layout: Sirve como una estructura envolvente o contenedor para organizar y reutilizar secciones comunes de la interfaz (como la barra de navegación, el pie de página, etc.) en varias páginas o secciones de tu aplicación.

La diferencia clave con layout es que layout no tiene acceso a params entonces un layout esta "ciego" al tratarse de rutas mas profundas.

Ahora la diferencia con el "[slug]" conocido es que los params solo tienen uno solo, mientras que con "[...slug]" "[[slug]]" es que tienen acceso a un array y con eso lograr crear rutas dinamicas anidadas.
