'use client';
//Este componente es una abstraccion para tener un nav link reutilizable y permitiendo ademas
//utlizar use client solo en este componente y que el resto se logre renderizar en el servidor
// el usePathname es para leer el path en donde se encuenre renderizado el componente en ese momento y
//asi logre tomar desciciones

//el startsWith es parte de la libreria next navigation
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classes from './nav-link.module.css';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

//Este componente es que se esta creando unos link que son especiales y solo son para el nav y tiene
//su forma especial de agregar las clases de acuerdo si al momento de renderizar cada componente cuando se solicite
//desde el padre tenga un href y coincida con el que esta en la barra de direcciones.

export default function NavLink({ href, children }: NavLinkProps) {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={
        path.startsWith(href)
          ? `${classes.link} ${classes.active}`
          : classes.link
      }
    >
      {children}
    </Link>
  );
}
