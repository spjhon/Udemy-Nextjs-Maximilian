'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";


function isInvalidText(text: String) {
  return !text || text.trim() === '';
}

interface Meal {
  title: string;
  summary: string;
  instructions: string;
  image: File;
  creator: string;
  creator_email: string;
  slug: string;
}

/** 
 * Esto es un server action, una función que se garantiza que se va a ejecutar en el servidor.
 * La función debe ser async para poder extraer los datos del form y luego hacer un envío al servidor.
 * los props de formData contienen metodos especiales como el .get()
 */
export async function shareMeal(
  // El primer argumento `state` permite que `useFormState` maneje el estado inicial y los mensajes de respuesta
// desde el servidor. Esto crea una conexión entre la acción del servidor y el formulario, facilitando la
// actualización de mensajes de estado en la interfaz del usuario.
  state: { message: string }, //el primer parámetro es el estado inicial, que contiene solo una propiedad message de tipo string. Este parámetro asegura la integración con useFormState.
  formData: FormData //el segundo parámetro es un FormData con los datos enviados desde el formulario.
): Promise<{ message: string }> {
  //Tipo de Retorno
//Promise<{ message: string }>: La función devuelve una promesa que resuelve en un objeto con un solo campo message de tipo string, que se usa para mostrar mensajes de error o éxito en el cliente.
  
  const meal: Meal = {
    title: formData.get('title') as string,
    summary: formData.get('summary') as string,
    instructions: formData.get('instructions') as string,
    image: formData.get('image') as File,
    creator: formData.get('name') as string,
    creator_email: formData.get('email') as string,
    slug: "" as string,
  };

  console.log(meal);
  

  //aqui se estan validando opr medio de una funcion perzonalizada llamada isInvalidText que valida si los campos estan vacios
  //o si la imagen esta vacia y se hace una validacion y gracias a useActionState se puede interactuar con el archivo que invoke 
  //useActionState
  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: 'Invalid input.',
    };
  }


// Here you can proceed to send `meal` to your server or handle it as needed
  /**Aqui se esta llamando la funcion saveMeal para sanear y enviar la informacion a una database */
  await saveMeal(meal );
   /**Aqui se hace un redireccionamiento luego de hacer un envio de datos */
   


   revalidatePath('/meals'); //Esta revalidacion se hace cuando se hace una build (no static build) y se generan ciertos archivos estaticos
   //entonces cuando se hace npm start, el cache de next js es mucho mas agresivo y toca hacer revalidaciones de paths cuando se cambien datos

   
  redirect('/meals');
}