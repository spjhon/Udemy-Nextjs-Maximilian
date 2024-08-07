'use client';
//Este componente es una abstraccion para tener un nav link reutilizable y permitiendo ademas
//utlizar use client solo en este componente y que el resto se logre renderizar en el servidor
// el usePathname es para leer el path en donde se encuenre renderizado el componente en ese momento y
//asi logre tomar desciciones

//el startsWith es parte de la libreria next navigation
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classes from './nav-link.module.css';

export default function NavLink({ href, children }) {
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
