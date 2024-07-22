import Link from 'next/link';
import Image from 'next/image';

import classes from './meal-item.module.css';

export interface MealItemProps {
  title: string;
  slug: string;
  image: string;
  summary: string;
  creator: string;
}
//una particularidad es que las imagenes no son estaticas osea que no estan disponibles at buildtime sino 
//at runtime por lo que es dinamico la carga de estas imagenes, ahora como no se sabe las dimenciones
// se utiliza el prop fill
export default function MealItem({ title, slug, image, summary, creator }: MealItemProps) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image src={image} alt={title} fill />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
