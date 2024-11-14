import NewsList from '@/components/news-list';
import { getLatestNews } from '@/lib/news';
import { NewsItem } from '@/lib/news';


export default async function LatestNewsPage() {
  const latestNews: NewsItem[] = await getLatestNews();

  return (
    <>
      <h2>Latest News</h2>
      <NewsList news={latestNews} />
    </>
  );
}