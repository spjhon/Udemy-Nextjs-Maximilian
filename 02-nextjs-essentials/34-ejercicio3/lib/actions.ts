'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

interface Meal {
  title: string | null;
  summary: string | null;
  instructions: string | null;
  image: File | null;
  creator: string | null;
  creator_email: string | null;
  slug: string | null;
}

/** 
 * Esto es un server action, una función que se garantiza que se va a ejecutar en el servidor.
 * La función debe ser async para poder extraer los datos del form y luego hacer un envío al servidor.
 */
export async function shareMeal(formData: FormData) {
  
  const meal: Meal = {
    title: formData.get('title') as string | null,
    summary: formData.get('summary') as string | null,
    instructions: formData.get('instructions') as string | null,
    image: formData.get('image') as File | null,
    creator: formData.get('name') as string | null,
    creator_email: formData.get('email') as string | null,
  };

  console.log(meal);
  // Here you can proceed to send `meal` to your server or handle it as needed

  /**Aqui se esta llamando la funcion saveMeal para sanear y enviar la informacion a una database */
  await saveMeal(meal);
   /**Aqui se hace un redireccionamiento luego de hacer un envio de datos */
  redirect('/meals');
}