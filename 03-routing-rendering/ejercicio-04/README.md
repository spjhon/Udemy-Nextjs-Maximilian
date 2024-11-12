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

-**Programatic routing**: se utiliza el useRouter()

- un detalle, cuando se utiliza params en un server component, se debe de utilizar el async y el await, pero si es "use clien" o cliente componente entonces se debe de utilizar el hook use() de react y todo esto debido a que params es una jodida promesa en next js.

-**Route Grouping**: es una forma de que se muestren diferentes layouts de acuerdo a la ruta que se navegue, sin tener que depender de un layout principal

Sí, **Grouping Layouts** en Next.js te permiten tener layouts distintos para cada grupo de rutas, y esos layouts solo se aplican a las rutas dentro de su respectivo grupo de paréntesis. Esto significa que puedes crear varios layouts en tu aplicación, y cada uno de ellos se activará solo cuando el usuario esté navegando dentro de las rutas de su grupo.

### Cómo funciona el Grouping Layout para diferentes grupos

Cuando usas un directorio de agrupación `(group-name)`, cualquier layout definido dentro de ese grupo solo se aplicará a las rutas en ese directorio, pero no afectará a las rutas fuera del grupo. Esto es útil para tener layouts que solo se activan para un conjunto específico de rutas, sin afectar la estructura de URL o la apariencia de otras secciones de tu aplicación.

### Ejemplo de Grouping Layout en Next.js

Imagina que tienes dos grupos de rutas, `(admin)` y `(user)`, y cada grupo tiene su propio layout:

```mdx
app/
├── (admin)/
│   ├── layout.tsx       // Layout específico para rutas de admin
│   ├── dashboard/
│   │   └── page.tsx
│   └── settings/
│       └── page.tsx
├── (user)/
│   ├── layout.tsx       // Layout específico para rutas de usuario
│   ├── profile/
│   │   └── page.tsx
│   └── settings/
│       └── page.tsx
└── layout.tsx           // Layout general para toda la aplicación
```

### Cómo se aplican los layouts

- **`app/layout.tsx`** es el layout raíz y puede contener elementos comunes para toda la aplicación, como un encabezado o un pie de página general.
- **`app/(admin)/layout.tsx`** define un layout que solo se aplicará a las rutas dentro del grupo `(admin)`, como `/dashboard` y `/settings`.
- **`app/(user)/layout.tsx`** define un layout para las rutas dentro del grupo `(user)`, como `/profile` y `/settings`.

### Ejecución de los layouts por grupo

Cuando el usuario navegue a:

- `/dashboard` o `/settings` del grupo `(admin)`, el layout `app/(admin)/layout.tsx` será el que se utilice para mostrar esas rutas, aplicando los estilos y configuraciones definidas allí.
- `/profile` o `/settings` del grupo `(user)`, el layout `app/(user)/layout.tsx` se encargará de renderizar esas rutas con sus propios estilos y configuraciones.

### Ventajas de este enfoque

- **Separación de layouts**: Puedes tener diferentes apariencias y componentes para cada sección de tu aplicación sin afectar a las demás.
- **URLs limpias**: El directorio de agrupación `(group-name)` no afecta la URL, por lo que puedes organizar el código sin cambiar la estructura de URL de la aplicación.

Este sistema es particularmente útil en aplicaciones con secciones muy distintas (por ejemplo, áreas de administración vs. área de usuario) donde cada una necesita un layout diferente.

- **Route Handlers**: Los Route Handlers en Next.js son funciones que permiten manejar rutas específicas dentro de la carpeta app para crear APIs o manejar peticiones personalizadas. Estos se encuentran dentro de la estructura de rutas y funcionan como endpoints de servidor para procesar peticiones HTTP (GET, POST, PUT, DELETE, etc.), directamente desde la misma estructura de archivos.

Características clave de los Route Handlers en Next.js:
Ubicación:

Se definen dentro de la carpeta app en Next.js, en la estructura de la ruta que quieres manejar.
Por ejemplo, una ruta app/api/user/route.js definirá un endpoint en /api/user.
Funciones manejadoras de HTTP:

Los Route Handlers exportan funciones asincrónicas para cada tipo de petición HTTP que deseas soportar (por ejemplo, GET, POST, DELETE, etc.).
Cada función maneja un tipo de petición y puede procesarla de acuerdo con la lógica de tu aplicación.

Respuestas de servidor:

Utilizan el objeto Response de Web APIs para devolver respuestas personalizadas al cliente.
Puedes devolver JSON, HTML, o cualquier tipo de respuesta que necesites.
Uso de Middlewares:

Pueden integrarse con middlewares y autenticación, lo cual permite manejar validaciones, permisos o verificar tokens antes de procesar la lógica de la ruta.
Optimización y SSR:

Los Route Handlers permiten una mayor flexibilidad en el manejo de datos y optimización del lado del servidor, ya que Next.js maneja directamente las solicitudes del cliente.
