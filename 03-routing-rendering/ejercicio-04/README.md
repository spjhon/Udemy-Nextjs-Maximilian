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

- Se recomienda que cuando se utilizen hooks que requieran el "use client", es mejor separarlos en diferentes achivos para poder renderizar lo que mas se pueda en el servidor

- Siempre busque hacer los componentes clientes lo mas pequeños posibles

---

- **Interceptor Route** En Next.js, los **Interceptor Routes** son rutas especiales introducidas en Next.js 13 y usadas para interceptar la navegación de los usuarios y modificar o alterar el comportamiento de ciertas rutas sin cambiar la URL visible en el navegador. Esto es útil cuando necesitas mostrar vistas o contenido adicional, como un modal o una pantalla temporal, sin cambiar la navegación principal.

### Ejemplo de uso típico

Los interceptor routes son ideales para casos como:

- Mostrar un **modal** al hacer clic en un enlace de detalles sin recargar la página ni cambiar la URL.
- Agregar una **vista previa** de contenido o una pantalla adicional sobre la página actual.
- Implementar una experiencia de navegación en la que se necesita mostrar contenido sin cambiar completamente el estado de la navegación.

### Cómo funcionan los Interceptor Routes

En Next.js, los Interceptor Routes se configuran utilizando la convención de directorios y el componente `<Link>`. Generalmente:

1. **Definición de la ruta**: Se crea una ruta de interceptación, por ejemplo, una carpeta para la página original y otra para la ruta de interceptación, donde la vista interceptora se muestra como un modal o una capa sobre la página actual.
2. **Intercepción y comportamiento**: Cuando un usuario navega a esta ruta, el interceptor detiene la navegación completa y muestra el contenido como una vista adicional, en lugar de hacer una transición de página completa.

### Ejemplo de estructura de archivos

Imagina que tienes un blog y deseas mostrar un modal para ver una publicación sin cambiar la URL:

```mdx
app/
├── blog/
│   ├── [slug]/
│   │   ├── page.tsx            # Página de detalle de blog
│   └── @modal/
│       └── [slug]/
│           └── page.tsx        # Modal que intercepta la ruta
```

En este caso:

- La carpeta `@modal/[slug]/page.tsx` actúa como un interceptor de la ruta `blog/[slug]`.
- Si se usa un `<Link>` a esta ruta, se muestra la ruta de interceptación (`@modal/[slug]`) en lugar de la página completa.

### Beneficios

- **Experiencia de usuario** mejorada, ya que permite mostrar contenido adicional sin cambiar la URL ni hacer una transición completa de página.
- **Mantiene el estado de la página**: el usuario puede regresar al estado original de la página después de cerrar el modal o la vista interceptada sin recargar.

### Limitaciones

- La configuración puede ser compleja para aplicaciones con rutas anidadas y múltiples modales.
- No siempre es adecuado para todos los tipos de contenido, ya que puede afectar el rendimiento en rutas complejas.

Los Interceptor Routes son una herramienta poderosa para mejorar la experiencia de usuario y permitir interacciones dinámicas sin la necesidad de cambiar completamente la URL o el contexto de la página actual.

ALGO IMPORTANTE: Algo importante de las interceptor routes es que la idea es mostrar diferentes paginas que tengan la misma url pero que cambien de acuerdo a como se llega a la pagina (palabras de maximilliam)

- En el ejemplo de maximiliam lo que se muestra es que si se va desde un link interno se carga el interceptor pero si se recarga la pagina se carga el que no es interceptor

---

- Se pueden anidar rutas estaticas dentro de rutas dinamicas
