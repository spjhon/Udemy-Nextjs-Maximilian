import { notFound } from 'next/navigation';

import { DUMMY_NEWS } from '@/dummy-news';

interface InterceptedImagePage {
  params: {
    slug: string;
  };
}

export default async function InterceptedImagePage({ params }: InterceptedImagePage) {
  const typedParams = await params
  const newsItemSlug = typedParams.slug;
  const newsItem = DUMMY_NEWS.find(
    (newsItem) => newsItem.slug === newsItemSlug
  );

  if (!newsItem) {
    notFound();
  }

  return (
    <>
      <div className="modal-backdrop" />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </div>
      </dialog>
    </>
  );
}
