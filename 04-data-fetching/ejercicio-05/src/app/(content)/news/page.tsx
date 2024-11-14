
import NewsList from '@/components/news-list';
import { getAllNews } from '@/lib/news';

/**Este es un ejemplo de un componente que es del lado del servidor, se puede transformar en async y devolver el componente
 * ya con datos completos y renderizado
 */
export default async function NewsPage() {

  const news = await getAllNews();


  return (
    <>
      <h1>News Page</h1>
      <NewsList news={news} />
    </>
  );
}
