'use server';

import { createAuthSession } from "@/lib/auth";
import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { createUser, getUserByEmail } from "@/lib/user";
import { redirect } from "next/navigation";

export async function signup(prevState: { errors: { [key: string]: string } }, formData: FormData): Promise<{ errors: { [key: string]: string } }> {
  
  
  
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  
/**TypeScript, los tipos para un array y para un objeto tienen definiciones 
 * distintas porque representan estructuras de datos diferentes */
  const errors: { [key: string]: string } = {};

  if (!email.includes('@')) {
    errors.email = 'Please enter a valid email address.';
  }

  if (password.trim().length < 8) {
    errors.password = 'Password must be at least 8 characters long.';
  }

  if (Object.keys(errors).length > 0) {
    return {errors};
  }

  const hashedPassword = hashUserPassword(password);

  try {

    const id = createUser(email, hashedPassword);
    //aqui se uede observar como se crea la sesion de auth y se crea la sesion en el servidor y
    //el cookie que devuelve la conexcion con el servidor
    await createAuthSession(id);
    redirect('/training');

  } catch (error) {
    if (error instanceof Error && 'code' in error) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return {
          errors: {
            email: 'It seems like an account for the chosen email already exists.',
          },
        };
      }
    }
    throw error;
  }
}






export async function login(prevState: { errors: { [key: string]: string } }, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return {
      errors: {
        email: 'Could not authenticate user, please check your credentials.',
      },
    };
  }

  const isValidPassword = verifyPassword(existingUser.password, password);

  if (!isValidPassword) {
    return {
      errors: {
        password: 'Could not authenticate user, please check your credentials.',
      },
    };
  }

  await createAuthSession(existingUser.id);
  redirect('/training');
}




/**Esta funcion auth es para poder cambiar los action que se le meten al form de acuerdo a los searchParams
 * para usarla se reemplaza en el form este action para que se desvie de acuerdo al mode
 */
export async function auth(mode: string, prevState: { errors: { [key: string]: string } }, formData: FormData) {
  if (mode === 'login') {
    return login(prevState, formData);
  }
  return signup(prevState, formData);
}