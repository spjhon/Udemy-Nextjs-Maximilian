import Link from 'next/link';
import { Suspense } from 'react';

import classes from './page.module.css';
import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/meals';

/*
En Next.js, los Server Components y los Client Components tienen ciclos de vida diferentes, 
especialmente en cómo manejan el fetching de datos. 

Fetching de Datos Antes del Renderizado: Los Server Components pueden hacer fetching de datos antes 
de que el componente se renderice. Esto es posible porque el componente se ejecuta en el servidor y 
puede esperar a que los datos estén disponibles antes de enviar el HTML al cliente.

Sin Hooks de Ciclo de Vida del Cliente: Los Server Components no tienen hooks de ciclo de vida del cliente, 
como useEffect, porque no se ejecutan en el cliente. Todo el fetching y la lógica de datos ocurren en el servidor.

*/

async function Meals() {
  const meals = await getMeals();
// Ok, esto es un minicomponente que se va a envolver un un suspense, la idea es que solo esta parte muestre el state de loading
//y el resto de la pagina se cargue parcialmente.

// - El fallback es la pieza de codigo que se va a mostrar mientras la operacion asyncrona se realiza
  return <MealsGrid meals={meals} />;
}

export default async function MealsPage() {
 

  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{' '}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          
          <Link href="/meals/share">
            Share Your Favorite Recipe
          </Link>
        </p>
      </header>
      <main className={classes.main}>
      <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
