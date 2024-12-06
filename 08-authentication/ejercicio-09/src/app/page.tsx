import AuthForm from '@/components/auth-form';

interface HomeProps {
  searchParams: {
    mode?: string;
  };
}

//El searchParams esta embeded en next js pages que lo que hace es poder leer un mode desde los params de la url
//y luego utilizar esto para generar diferenes opciones de renderizado de a cuerdo a lo que lleve params, esto se
//puede observar en authform

export default async function Home({ searchParams }: HomeProps) {
  const formMode: string = searchParams.mode || 'login';
  return <AuthForm mode={formMode} />;
}