import MainHeader from '@/components/main-header';

export const metadata = {
  title: 'Next.js Page Routing & Rendering',
  description: 'Learn how to route to different pages.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}


export default function ContentLayout({ children }: RootLayoutProps) {
  return (
    <div id='page'>
      <MainHeader />
      {children}
    </div>
  );
}
