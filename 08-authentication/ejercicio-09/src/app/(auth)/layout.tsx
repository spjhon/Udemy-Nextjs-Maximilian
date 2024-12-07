import { logout } from '@/actions/auth-actions';
import '../globals.css';

export const metadata = {
  title: 'Next Auth',
  description: 'Next.js Authentication',
};

interface AuthRootLayoutProps {
  children: React.ReactNode;
}

export default function AuthRootLayout({ children }: AuthRootLayoutProps) {
  return (
    <>
      <header id="auth-header">
        <p>Welcome back!</p>
        <form action={logout}>
          <button>Logout</button>
        </form>
      </header>
      {children}
    </>
  );
}
