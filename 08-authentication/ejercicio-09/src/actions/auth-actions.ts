'use server';

import { hashUserPassword } from "@/lib/hash";
import { createUser } from "@/lib/user";
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

    createUser(email, hashedPassword);

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

  redirect('/training');
}
