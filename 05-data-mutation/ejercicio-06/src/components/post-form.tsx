'use client';



import FormSubmit from '@/components/form-submit';
import { useActionState } from 'react';

/**ActionFunction es un tipo en TypeScript que define la forma (o "contrato") de una función. 
 * Es como un molde que describe:
Qué argumentos acepta.
Qué tipo de datos retorna. 
*/
type ActionFunction = (
  prevState: { errors: string[] }, formData: FormData) => Promise<{errors: string[];}>;


interface PostFormProps {
  action: ActionFunction;
}

export default function PostForm(props: PostFormProps)  {
  //El primer argumento es el action, la funcion que se ejecuta cuando se hace submit
  //el segundo es el valor por defecto del state, y el state es normalmente el valor que retorna la funcion de action.
  const [state, formAction] = useActionState(props.action, { errors: [] });

  return (
    <>
      <h1>Create a new post</h1>
      <form action={formAction}>
        <p className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </p>
        <p className="form-control">
          <label htmlFor="image">Image URL</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            name="image"
          />
        </p>
        <p className="form-control">
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" rows={5} />
        </p>
        <p className="form-actions">
          <FormSubmit />
        </p>
        {state.errors && (
          <ul className="form-errors">
            {state.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
      </form>
    </>
  );
}
