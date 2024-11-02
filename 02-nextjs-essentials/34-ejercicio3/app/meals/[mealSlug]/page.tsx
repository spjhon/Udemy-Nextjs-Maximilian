import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getMeal, Meal } from '@/lib/meals';
import classes from './page.module.css';
                                                                                                           


/*En Next.js, params es un objeto que contiene los parámetros dinámicos de una ruta. 
Estos parámetros son extraídos de la URL y son muy útiles para crear rutas dinámicas. 

Correcto, si el archivo que define el componente de página no está dentro de una carpeta con corchetes 
(indicando una ruta dinámica), el params no se recibirá automáticamente.

Para que params funcione y contenga los parámetros dinámicos de la URL, debes definir 
el archivo dentro de una carpeta que use corchetes para indicar una parte dinámica de la ruta.

*/

// Definición de tipos para los parámetros de la ruta
interface Params {
  params: {
    mealSlug: string;
  };
}


/**Estos son metadatos dinamicos que lo que hacen es accesar a los params para poder tener metada personalizada */
export async function generateMetadata({ params }: Params) {
  const meal = getMeal(params.mealSlug);

  if (!meal) {
    notFound();
    return null;
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default function MealDetailsPage({ params }: Params) {

  /*Sí, params.mealSlug se refiere al valor capturado por la parte dinámica de la ruta. La convención de usar corchetes [] 
  en los nombres de las carpetas o archivos dentro de pages en Next.js permite capturar diferentes valores de la URL y pasarlos 
  como parámetros a tu componente.*/
  
  const meal: Meal | undefined = getMeal(params.mealSlug);

  /** El !meal se utiliza para inyectar un not-found focalizado y no de forma general */
  if (!meal) {
    notFound();
    return null; // Return null after calling notFound() to avoid rendering the rest of the component
  }




  meal.instructions = meal.instructions.replace(/\n/g, '<br />');

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        {/*El dangerouslySetInnerHTML es para poder inyectar HTML en el render pero es peligroso para ataques crossscript */}
        <p
          className={classes.instructions}
          
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
}
