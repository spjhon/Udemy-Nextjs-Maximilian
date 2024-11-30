import './globals.css';

export const metadata = {
  title: 'Next Auth',
  description: 'Next.js Authentication',
};


interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
