'use client';


import { auth } from '@/actions/auth-actions';
import Link from 'next/link';
import { useActionState } from 'react';


interface AuthFormProps {
  mode: string;
}

export default function AuthForm({ mode }: AuthFormProps) {

  const [state, formAction] = useActionState(auth.bind(null, mode), { errors: {} });

console.log(state)

  return (
    <form id="auth-form" action={formAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      {state.errors && (
        <ul id="form-errors">
          {/**Object.entries() devuelve un array de arrays, donde cada subarray contiene un par [key, value].
           * Ejemplo practico:
           * 
           * const errors = { email: 'Invalid email', password: 'Weak password' };
           * Object.entries(errors);
           * // Resultado: [['email', 'Invalid email'], ['password', 'Weak password']]
           */}
        {Object.entries(state.errors).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>
      )}
      <p>
      <button type="submit">
          {mode === 'login' ? 'Login' : 'Create Account'}
        </button>
      </p>
      <p>
        {/**aqui se puede observar que gracias a los params que se asigman desde aca, se puede renderizar diferencias
         * gracias al serachparams de next js
         */}
      {mode === 'login' && (
          <Link href="/?mode=signup">Create an account.</Link>
        )}
        {mode === 'signup' && (
          <Link href="/?mode=login">Login with existing account.</Link>
        )}
      </p>
    </form>
  );
}
