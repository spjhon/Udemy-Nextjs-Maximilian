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

Es la app de una pizzeria en donde se muestra como hacer fetching y hacer post por medio de formularios, ademas de toda la informacion basica que se maneja en next js

## Temas tratados

- Creacion de una pagina utilizando las herramientas y enrutamiento del ejercicio anterior.
- Image tag (que permite lazy loading y un monton de optimizaciones mas)
- useClient
- fetching data
- Suspense
- Manejo de archivos
- useRef
- Not-found
- error
- Server Actions

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

- **Fetching Data**: Es importante observar que como el componente es un server component no se necesita un useEffect:

En Next.js, los Server Components y los Client Components tienen ciclos de vida diferentes, especialmente en cómo manejan el fetching de datos.

Fetching de Datos Antes del Renderizado: Los Server Components pueden hacer fetching de datos antes de que el componente se renderice. Esto es posible porque el componente se ejecuta en el servidor y puede esperar a que los datos estén disponibles antes de enviar el HTML al cliente.

Sin Hooks de Ciclo de Vida del Cliente: Los Server Components no tienen hooks de ciclo de vida del cliente, como useEffect, porque no se ejecutan en el cliente. Todo el fetching y la lógica de datos ocurren en el servidor.

Entonces solo se ejecuta una funcion asyncrona con codigo de una libreria pre ajustada y listo, se mandan los datos.

- Next js hace un heavy cache con las paginas una vez cargadas en el cliente
- En cuanto a los loading states, se debe de crear un archivo especial llamado loading que acuta sobre toda la pagina mientras que algun componente de esa pagina este en una promesa y que sea un server component, ahora una forma mas granular de controlar estos estados de carga (loading states), es utilizar suspense.

- En cuanto el manejo de errores se puede crear un archivo llamado error que se va a expresar cuando por ejemplo un fetch falla, se pude colocar de forma global o anidado

- En cuanto al manejo de not-found se maneja de la misma manera, se crea un archivo ya sea global o anidado y se puede despelgar un codigo custom.

- **Suspense**

Resulta que si utilizamos el file loading.js, next js reemplaza todo el componente que esta haciendo fetching (despues de detectar automaticamente el fetching) y carga el componente que se encuentre en loading.js, pero gracias a suspense, se puede crear un espacio de fetching unico a una partecita del componente y añadir el fallback

entonces segun entiendo de next js, en un server component puedo utilizar async y no hay problema ya que las operaciones se harian antes del renderizado entonces se puede esperar a obtener los datos antes del renderizado pero en un client si se necesita tener algo como useEffect para poder hacer fetching una vez renderizado el componente?

- **Error Page**

El error se puede colocar en la parte mas externa y va a coger cualquier error que este anidado, algo curioso a tener en cuenta es que next js entrega unos props especiales al componente error para poder identificar mesajes de error en production mas facil

- **Not Found**

Al igual que con error se puede colocar en cualquier lado, se puede perzonalizar.

- **Server Action**

Una funcion que se garantiza que se va a ejecutar en el servidor y la funcion debe de ser async

- **useFormState - useActionState**: Es una feature de react que permite tomar "el control" de un action (mas que todo utilizado para fomularios) y asi poder devolver mensajes que son validados en el actions antes de ser enviados a la base de datos

Al final del ejercicio se explica como usar el S3 bucket de aws pero lo voy a dejar para que funcione localmente.

- **Revalidating Paths**

- **S3 Storage**

- **Metadata**
