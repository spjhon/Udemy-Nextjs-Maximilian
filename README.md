# Udemy-Nextjs-Maximilian

Udemy course of nextJs with Maximilian Schwarzmüller.

En este README se encuentra un index del conocimiento adquirido, la teoria profundizada se encuentra en el README de cada projecto individual y tambien se encuentra esta teoria en el doc principal del DOCUSAURIO de conocimiento de desarrollo web.

[**AQUI**](https://nextjs.org/docs) esta la documentacion de VERCEL para NEXTJS.

Next.js is a React framework for building full-stack web applications.

El fuerte de next js es dar las heramientas para construir:

- Route setup & handling
  - Handel route setup handling
  - Handles requests and responses
  - Handles data fetching & submission
- Form Submission
- Data Fetching
- Autenthication
- And much more

## 1. Apps y Temas tratados

A continuacion se va a listar los temas aprendidos y tratados en cada app ya que es la estructura del curso de Udemy, sin embargo la teoria principal va a estar en el overview del docusaurio con el fin de unificar el conocimiento al igual que el MAPA para donde encontrar el conomiento mas completo y una guia de patterns.

### 1.1. Repaso React

Este es un crash course de 7 horas en el cual se muestran las bases de react en los siguientes temas:

**Nota**: Se hace contraste con el curso de grider, si hay algun conocimiento que no esta, se va a referenciar en el docusaurio principal y si se requiere mayor detalle se hara en este projecto y por supuesto se va a referenciar a el DOCUSAURO pincipal.

- Como la libreria toma el root del HTML publico y renderiza la app
- Explica un componente basico
- Sistema basico de props
- Styling (module css)
- Component chain
- State
- Lifting the state up
- The children prop
- Conditional rendering with a modal
- Form Submision
- How to update state based on a previous state
- Rendeling a list (maping) of jsx elements
- En el video 35 se utiliza un diminuto backend en node independinete que tiene unas custom APIs para hacer post y request desde el front
- Se explica el useEffect y los side effects
- Loading state
- Routing

### 1.2. Next js essentials

Despues de acentar las bases de react y entender sus sistema de renderizado de html, Next js viene para hacer el resto de trabajo tras bambalinas que apoya los elementos creados e inyectados al DOM por medio de REACT

#### 1.2.1. Temas Tratados

Esta en "34-ejercicio3"

- Routing, Pages & Components
- Fetching and Sending Data
- Styling, Images & Metadata
- Suspence, async, server vs client components
- useRef, formInput, ImageInput, manejo de archivos, preview de imagenes cargadas
- SERVER ACTIONS: una funcion que se garantiza que se va a ejecutar en el servidor y la funcion debe de ser async
- Metadata (static, dynamic)

Se comienza con la explicacion del routing ya que next js es opitionated en muchos muchos aspectos, para mas entendimiento ir al README del ejercicio del projecto 02 de este repositorio.

En el ejercicio 3 ya se crea una pagina como tal en donde se aplican ambos tipos de rutas, estaticas y dinamicas

### 1.3 Routing Deep Dive

Es un demo sencillo de un sitio de news para demostrar algo mas sobre el routing de next js

#### 1.3.1. Temas Tratados

- File Routing
- Dinamic Routing
- Parallel Routing
- Catch all routing
- Intercepting Routes
- Programatic routing
- use() y useRouter()
- Route grouping
- Route Handlers (solo introduccion)
- Middleware (solo introduccion)

### 1.4. Fetching Deep Dive

Se continua con el demo de news pero esta vez se hacer fetching desde diferentes fuentes en este deep dive que se aprecia en el ejercicio 05.

- Where and How to fetch data
- Working with apis
- Loading data from databases and other sources

#### 1.4.1. Temas tratados

- Fetching Deep Dive
- Client side data fetching
- Server side fetching
- Sever side fetching conectandose directamente a la base de datos
- Loading states con server side fetching
- Suspense
- Async functions and components

### 1.5. Mutation

Enviar, almacenar y cambiar datos utilizando server actions

#### 1.5.1. Temas tratados

- Server actions
- Form Actions
- Actions in general
- Data mutation
- Optimistic Updating
- Path Validation

### 1.6. Caching

Next js hace un cashing bastante agresivo entonces en esta seccion se busca profundizar en ese aspecto

#### 1.6.1. Temas Tratados

- Understanding Next Js Cashing
- Revalidating Cached Data
- Manually caching data

### Para tener en cuenta de parte de chatgpt

Entonces si nombro un componente async es que le estoy diciendo a next js que ese componente va a ser dinamico y que los datos se van a llamar al server en cada request, y si no tiene el async y no tiene el "use client" es que el componente es un server component que se va a renderizar de forma estatica por default y para revaidarlo sin hacer una nueva build hay que aplicarle un revalidate si se hace fetch?

Exactamente, has comprendido correctamente el funcionamiento de los **Server Components (SC)** y la configuración en **Next.js App Router**. Aquí tienes una explicación más clara y detallada de los puntos que mencionas:

---

#### **1. Componentes `async` en Server Components**

- Al declarar un componente como `async`, estás diciendo que el componente realizará operaciones asíncronas, como un `fetch`.
- Si haces un `fetch` dentro de un Server Component y **no defines una estrategia de revalidación (`revalidate`)**, el contenido se recupera dinámicamente en **cada request**.
- Esto significa que el componente **no será estático** y que el servidor de Next.js pedirá nuevos datos para cada solicitud.

##### **Ejemplo:**

```tsx
export default async function ProductList() {
  const data = await fetch('https://api.example.com/products').then((res) => res.json());
  return (
    <ul>
      {data.products.map((product: any) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
```

- Aquí, cada vez que un usuario visite la página, **se ejecutará el `fetch` para obtener datos actualizados**.

---

#### **2. Componentes sin `async` ni `use client`**

- Si el componente no es `async` y tampoco tiene `use client`, es un **Server Component** que, por defecto, será renderizado de forma estática.
- Al hacer un `fetch` en este caso, puedes especificar una estrategia de revalidación (`next: { revalidate }`) para que Next.js use **Incremental Static Regeneration (ISR)** y no tengas que hacer una nueva build.

##### **Ejemplo 2:**

```tsx
export default function ProductList() {
  const data = await fetch('https://api.example.com/products', {
    next: { revalidate: 60 }, // ISR: revalidación cada 60 segundos
  }).then((res) => res.json());

  return (
    <ul>
      {data.products.map((product: any) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
```

- Aquí, la página será **estática** y solo se actualizará después de que haya pasado el tiempo especificado en `revalidate`.

---

#### **3. Diferencias entre dinámico, estático y revalidación**

| Configuración                | Descripción                                                                                              | Revalidación                   |
|------------------------------|----------------------------------------------------------------------------------------------------------|--------------------------------|
| **`async` sin `revalidate`** | El componente realiza fetch dinámico, y los datos se actualizan en cada request.                         | No aplica                     |
| **`async` con `revalidate`** | El componente realiza fetch dinámico, pero los datos se regeneran cada cierto tiempo (ISR).              | Según el tiempo especificado. |
| **Sin `async` ni `use client`** | El componente es un Server Component puro y estático.                                                  | Solo revalidación si aplica.  |
| **`use client`**             | El componente se renderiza en el cliente, y cualquier fetch debe hacerse manualmente con `useEffect`.   | No aplica                     |

---

#### **4. Revalidar sin hacer una nueva build**

- Si deseas que un componente estático se revalide sin hacer una nueva build:
  1. **Especifica `revalidate`** en el fetch.
  2. **Configura ISR** para que Next.js regenere la página en segundo plano.
  3. Alternativamente, usa **Webhooks** (como expliqué antes) para forzar una revalidación en momentos específicos.

##### **Ejemplo con Webhooks:**

```tsx
// app/api/revalidate/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const secret = new URL(request.url).searchParams.get('secret');
  if (secret !== 'mi-secreto') {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    await fetch('https://mi-app.com/api/revalidate?path=/productos');
    return NextResponse.json({ message: 'Revalidation successful' });
  } catch (err) {
    return NextResponse.json({ message: 'Revalidation failed' }, { status: 500 });
  }
}
```

---

#### **Resumen**

1. **`async` indica que el componente hace fetch dinámico**. Si no usas `revalidate`, los datos se consultan en cada request.
2. Si el componente no es `async` y no usa `use client`, es estático por defecto, y los datos del fetch solo se actualizan con `revalidate`.
3. Para evitar builds manuales, usa **ISR** o **Webhooks** para mantener contenido actualizado.

¿Hay algo más en lo que pueda profundizar? 😊
