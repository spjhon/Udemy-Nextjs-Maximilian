import NewsList from '@/components/news-list';
import { getLatestNews } from '@/lib/news';
import { NewsItem } from '@/lib/news';


export default function LatestNewsPage() {
  const latestNews: NewsItem[] = getLatestNews();

  return (
    <>
      <h2>Latest News</h2>
      <NewsList news={latestNews} />
    </>
  );
}