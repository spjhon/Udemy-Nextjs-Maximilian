import { notFound } from 'next/navigation';

import { DUMMY_NEWS } from '@/dummy-news';


interface ImagePageProps {
  params: {
    slug: string;
  };
}

export default async function ImagePage({ params }: ImagePageProps) {
  const typedParams = await params
  const newsItemSlug = typedParams.slug;
  const newsItem = DUMMY_NEWS.find((newsItem) => newsItem.slug === newsItemSlug);

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
