import { notFound } from 'next/navigation';
import { getAllNews, NewsItem } from '@/lib/news';


interface ImagePageProps {
  params: {
    slug: string;
  };
}

export default async function ImagePage({ params }: ImagePageProps) {
  const typedParams = await params
  const newsItemSlug = typedParams.slug;
  const news = await getAllNews();
  const newsItem: NewsItem | undefined = news.find((newsItem) => newsItem.slug === newsItemSlug);

  if (!newsItem) {
    notFound();
  }

  return (
    <div className="fullscreen-image">
      <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
      {"sdfsdfdfd"}
    </div>
  );
}
