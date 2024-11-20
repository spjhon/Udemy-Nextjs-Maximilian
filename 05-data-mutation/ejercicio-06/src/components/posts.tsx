import { formatDate } from '@/lib/format';
import LikeButton from './like-icon';

export interface PostType {
  id: string;
  image: string;
  title: string;
  userFirstName: string;
  createdAt: string;
  content: string;
}

interface PostProps {
  post: PostType;
}

function Post({ post }: PostProps) {
  return (
    <article className="post">
      <div className="post-image">
        {post.image === null ?  "no hay imagen, lo siento":<img src={post.image} alt={post.title} />}
      </div> 
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{' '}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <LikeButton />
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

interface PostsProps {
  posts: PostType[] | null;
}

export default function Posts({ posts }: PostsProps) {
  if (!posts || posts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  return (
    <ul className="posts">
      {posts.map((post) => (
        <li key={post.id}>
          <Post post={post} />
        </li>
      ))}
    </ul>
  );
}
