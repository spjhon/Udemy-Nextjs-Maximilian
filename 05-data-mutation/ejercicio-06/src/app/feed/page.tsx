import Posts from '@/components/posts';
import { getPosts } from '@/lib/posts';

export default async function FeedPage() {
  const posts = await getPosts(null);
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}
