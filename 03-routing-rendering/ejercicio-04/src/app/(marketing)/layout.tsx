export const metadata = {
  title: "Next.js Page Routing & Rendering",
  description: "Learn how to route to different pages.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: RootLayoutProps) {
  return <main>{children}</main>;
}