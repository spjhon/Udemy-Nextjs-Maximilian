"use client"

import { formatDate } from "@/lib/format";
import LikeButton from "./like-icon";
import { togglePostLikeStatus } from "@/actions/posts";
import { useOptimistic } from "react";

export interface PostType {
  id: number;
  image: string;
  title: string;
  userFirstName: string;
  createdAt: string;
  content: string;
  isLiked: boolean;
  likes: number;
}

interface PostProps {
  post: PostType;
  action: (postId: number) => void;
}

function Post({ post, action }: PostProps) {
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
              action={action.bind(null, post.id)}
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

type CurrentState = PostType[] | null;

export default function Posts({ posts }: PostsProps) {

//Se comienza con la creacion de la sintaxis de useOptimistic, lo cual en principio acepta como primer argumento el currentState
//que en este caso es el posts que es un array, el segundo es una funcion que se ejecuta cuando se llama el action, y a esta
//funcion le entra, lo que retorna el state es el nuevo state que se va a utilizar en el action


  const [optimisticState, setOptimisticState] = useOptimistic(posts, (currentState: CurrentState, action) => {
    // Lógica para actualizar el estado optimista

    
    if (!currentState) {
      return []; // Si currentState es null, retorna un array vacío.
    }

    const updatedPostIndex = currentState.findIndex(post => post.id === action);
console.log(updatedPostIndex)

    if (updatedPostIndex === -1) {
      return currentState; // Si no se encuentra, no se modifica nada.
    }

    const updatedPost = { ...currentState[updatedPostIndex] }; // Clona la publicación seleccionada
    updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1); // Incrementa o decrementa el contador de "likes".
    updatedPost.isLiked = !updatedPost.isLiked; // Alterna el estado de "me gusta".
    const newPosts = [...currentState]; // Crea una copia del estado actual.
    newPosts[updatedPostIndex] = updatedPost; // Actualiza la publicación modificada en la copia.
    
    return newPosts; // Retorna el nuevo estado.
  });



//en esta funcion se combianan el optimistic con el toggle que el action que activa la comunicacion con la base de datos
async function updatePost(postId: number) {
  setOptimisticState(postId);
  await togglePostLikeStatus(postId);
  /**OJO
   * Nota: Si esta llamada falla, no hay manejo de errores explícito en este código. 
   * Podrías implementar un mecanismo para revertir el estado optimista en caso de error. */
  
}

  
  if (!optimisticState || optimisticState.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  //console.log(posts[0].isLiked);
  return (
    <ul className="posts">
      {optimisticState.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatePost}/>
        </li>
      ))}
    </ul>
  );
}
