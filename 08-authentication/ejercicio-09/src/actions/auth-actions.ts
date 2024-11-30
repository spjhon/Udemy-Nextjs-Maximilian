'use server';

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
    return {
      errors,
    };
  }

  // store it in the database (create a new user)
  return {
    errors: {}, // Si no hay errores, devuelves un objeto vacío
  };
}
