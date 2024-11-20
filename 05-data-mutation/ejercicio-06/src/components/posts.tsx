import { formatDate } from "@/lib/format";
import LikeButton from "./like-icon";
import { togglePostLikeStatus } from "@/actions/posts";

export interface PostType {
  id: number;
  image: string;
  title: string;
  userFirstName: string;
  createdAt: string;
  content: string;
  isLiked: boolean;
}

interface PostProps {
  post: PostType;
}

function Post({ post }: PostProps) {
  return (
    <article className="post">
      <div className="post-image">
        {post.image === "" ? (
          "no hay imagen, lo siento"
        ) : (
          <img src={post.image} alt={post.title} />
        )}
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{" "}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            {/**La función togglePostLikeStatus requiere el postId como argumento para identificar qué publicación debe
             * ser "likeada" o "unlikeada". Sin embargo, en este caso, la acción (action) dentro del formulario no permite
             * pasar directamente un argumento dinámico como post.id.
             *
             * Con bind(), puedes crear una nueva función preconfigurada que, al ejecutarse, ya tenga el argumento post.id listo. */}

            {/**El atributo action espera una función que se ejecutará cuando el formulario sea enviado. Sin bind(), sería difícil
             * asociar dinámicamente el post.id con cada formulario, ya que:
             * togglePostLikeStatus necesita el post.id.
             * action no puede ejecutar directamente la función con argumentos
             * (no podrías hacer togglePostLikeStatus(post.id) sin que se ejecute inmediatamente al renderizarse el componente). */}
            <form
              action={togglePostLikeStatus.bind(null, post.id)}
              className={post.isLiked ? "liked" : ""}
            >
              <LikeButton />
            </form>
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

  //console.log(posts[0].isLiked);
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
