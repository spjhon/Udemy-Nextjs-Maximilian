import { ReactNode } from 'react';

interface NewsDetailLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}


//Layout que pertenece a las rutas paralelas que en este caso seria solo modal que entraria como paralela, image entraria normal
export default function NewsDetailLayout({ children, modal }: NewsDetailLayoutProps) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}