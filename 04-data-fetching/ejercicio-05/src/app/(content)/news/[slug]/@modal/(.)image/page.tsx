

import ModalBackdrop from '@/components/modal-backdrop';
import { getAllNews } from '@/lib/news';
import { notFound} from 'next/navigation';
import { NewsItem } from '@/lib/news';

interface InterceptedImagePageProps {
  params: {
    slug: string;
  };
}

export default async function InterceptedImagePage({ params }: InterceptedImagePageProps) {

  const typedParams = await params;
  const newsItemSlug = typedParams.slug;
  const news = await getAllNews();
  const newsItem: NewsItem | undefined = news.find(
    (newsItem) => newsItem.slug === newsItemSlug
  );

  if (!newsItem) {
    notFound();
  }

  return (
    <>
      <ModalBackdrop></ModalBackdrop>
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </div>
      </dialog>
    </>
  );
}
