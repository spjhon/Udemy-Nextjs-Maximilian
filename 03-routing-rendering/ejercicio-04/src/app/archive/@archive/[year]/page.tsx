import NewsList from '@/components/news-list';
import { getNewsForYear } from '@/lib/news';

interface FilteredNewsPageProps {
  params: {
    year: string; // Suponiendo que el año se pasa como string
  };
}


export default function FilteredNewsPage({ params }: FilteredNewsPageProps) {
  const year = params.year;
  const newsYear = parseInt(year, 10);

  const news = getNewsForYear(newsYear); 

  return <NewsList news={news} />;
}