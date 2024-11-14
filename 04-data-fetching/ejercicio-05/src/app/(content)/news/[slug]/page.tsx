
import { getAllNews, NewsItem } from "@/lib/news";
import Link from "next/link";
//import Image from 'next/image';

interface NewsDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const typedParams = await params;
  const newsSlug = typedParams.slug;
  const news = await getAllNews();
  const newsItem: NewsItem | undefined = news.find((newsItem) => newsItem.slug === newsSlug);

  // Verificar si newsItem es undefined para evitar errores
  if (!newsItem) {
    return <p>News item not found.</p>; //Not found
  }

  return (
    <article className="news-article">
      <header>
        <Link href={`/news/${newsItem.slug}/image`}>
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </Link>
        <h1>{newsItem.title}</h1>
        <time dateTime={newsItem.date}>{newsItem.date}</time>
      </header>
      <p>{newsItem.content}</p>
    </article>
  );
}
