"use client";

import { useRouter } from 'next/navigation';


//Este componene es una extraccion que se hace en la page de la imagen interceptada (.)image, 
//con el fin de mantener el component lo mas server que se pueda y asi solo teener este client component y el resto
// en server
export default function ModalBackdrop() {
  const router = useRouter(); //This hook allows you to programmatically change routes inside Client Component.

  return <div className="modal-backdrop" onClick={router.back} />
}