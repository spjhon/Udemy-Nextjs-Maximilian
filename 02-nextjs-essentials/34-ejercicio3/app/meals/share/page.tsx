'use client'; //Este componente necesita ser client para poder hacer validaciones en en browser pero con funciones en el servidor

import ImagePicker from '@/components/meals/image-picker';
import classes from './page.module.css';
import { shareMeal } from '@/lib/actions';
import MealsFormSubmit from '@/components/meals/meals-form-submit';
import { useFormState } from 'react-dom';
import { useActionState } from 'react';

export default function ShareMealPage() {
  const [state, formAction] = useFormState(shareMeal, { message: '' });


  /*
  interface Meal {
    title: string | null;
    summary: string | null;
    instructions: string | null;
    image: File | null;
    creator: string | null;
    creator_email: string | null;
  }

  /**Esto es un server action, Una funcion que se garantiza que se va a ejecutar en el servidor y la funcion debe de ser async
   de esta forma podemos extraer los datos del form y luego hacer un evnio al servidor
   
  async function shareMeal(formData: FormData) {
    'use server';

    const meal = {
      title: formData.get('title'),
      summary: formData.get('summary'),
      instructions: formData.get('instructions'),
      image: formData.get('image'),
      creator: formData.get('name'),
      creator_email: formData.get('email')
    }

    console.log(meal);
  }

  */
  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        {/**Esto es un llamado a un server action que esta en otro archivo que lo que hace es utilizar la informacion
         * dentro del form para extraerla procesarla, validarla y luego almacenrla en una base de datos o enviarla a travez de una
         * api
         */}
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows={10}
              required
            ></textarea>
          </p>
          <ImagePicker label='label' name="image"/>
          {state.message && <p>{state.message}</p>}
          <p className={classes.actions}>
            <MealsFormSubmit></MealsFormSubmit>
          </p>
        </form>
      </main>
    </>
  );
}
