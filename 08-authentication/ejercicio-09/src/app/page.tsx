import AuthForm from '@/components/auth-form';

interface HomeProps {
  searchParams: {
    mode?: string;
  };
}

//El searchParams esta embeded en next js pages que lo que hace es poder leer un mode desde los params de la url
//y luego utilizar esto para generar diferenes opciones de renderizado de a cuerdo a lo que lleve params, esto se
//puede observar en authform


/**Uso de ?? (nullish coalescing operator): Si no existe searchParams.mode, se usa el valor 'login'. 
 * Esto es más seguro y compatible con casos en los que searchParams podría no estar definido. */
export default async function Home({ searchParams }: HomeProps) {

  //No olvidar que siempre que se consulte el params, se debe de hacer await
  const params = await searchParams

  const formMode: string = params?.mode ?? 'login'; // Acceso seguro
  return <AuthForm mode={formMode} />;
}