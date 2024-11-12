"use client"

import { notFound, useRouter } from 'next/navigation';
import { use } from 'react';
import { DUMMY_NEWS } from '@/dummy-news';

interface InterceptedImagePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function InterceptedImagePage({ params }: InterceptedImagePageProps) {

  const router = useRouter() //This hook allows you to programmatically change routes inside Client Component.
  const typedParams = use(params); // Usa `use` para esperar que `params` sea resuelto
  const newsItemSlug = typedParams.slug;
  const newsItem = DUMMY_NEWS.find(
    (newsItem) => newsItem.slug === newsItemSlug
  );

  if (!newsItem) {
    notFound();
  }

  return (
    <>
      <div className="modal-backdrop" onClick={router.back} />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </div>
      </dialog>
    </>
  );
}
