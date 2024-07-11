import "./globals.css";
import { ReactNode } from "react";

import MainHeader from "@/components/main-header/main-header";


export const metadata = {
  title: "NextLevel Food",
  description: "Delicious meals, shared by a food-loving community.",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        
        <MainHeader></MainHeader>
        {children}
      </body>
    </html>
  );
}
