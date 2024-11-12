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
