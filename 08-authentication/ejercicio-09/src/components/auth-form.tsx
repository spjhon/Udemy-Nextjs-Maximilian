import Link from 'next/link';
import { useActionState } from 'react';
import { signup } from '@/actions/auth-actions';

export default function AuthForm() {

  const [state, formAction] = useActionState(signup, { errors: { [key: string]: string }});

  return (
    <form id="auth-form" action={formAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      {state.errors && (
        <ul id="form-errors">
          {/**Object.keys lo que hace es extraer las llaves de un object y convertirlo en un array */}
          {Object.keys(state.errors).map((error) => (
            <li key={error}>{state.errors[error]}</li>
          ))}
        </ul>
      )}
      <p>
        <button type="submit">
          Create Account
        </button>
      </p>
      <p>
        <Link href="/">Login with existing account.</Link>
      </p>
    </form>
  );
}
