 "use server"

import { uploadImage } from "@/lib/cloudinary";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface typeFormDataExtracted {
  title: string;
  imageUrl: string; // Cambiamos image a imageUrl como string
  content: string;
  userId: number;
}

export async function createPost( prevState: { errors: string[] }, formData: FormData): Promise<{ errors: string[] }> {
 

  const errors = [];

  // Validamos los campos antes de procesar la imagen
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const image = formData.get("image") as File;

  if (!title || title.trim().length === 0) {
    errors.push("Title is required.");
  }

  if (!content || content.trim().length === 0) {
    errors.push("Content is required.");
  }

  if (!image || image.size === 0) {
    errors.push("Image is required.");
  }

  if (errors.length > 0) {
    return { errors };
  }

  // Subimos la imagen y obtenemos la URL
  let imageUrl: string;

  try {
    const result = await uploadImage(image);
    
    imageUrl = result.secure_url;
  } catch (error) {
    throw new Error(
      `Image upload failed, post was not created. Please try again later. ${error}`
    );
  }

  // Creamos el objeto final para almacenar
  const formDataExtracted: typeFormDataExtracted = {
    title,
    imageUrl, // Reemplazamos la imagen con la URL
    content,
    userId: 1,
  };

  // Enviamos los datos al backend
  await storePost(formDataExtracted);

  revalidatePath('/', 'layout');
  redirect("/feed");
}

export async function togglePostLikeStatus(postId: number) {
 
  await updatePostLikeStatus(postId, 2);
  //Este revalidate path lo que hace es decirle a next js que revalide los paths despues de ejecutar acciones de arriba
  //para evitar el cache que es muy agresivo en next js y entonces para evitar el state se utiiza esto y algo llamado OPTIMISTIC UPDATE
  revalidatePath("/", "layout")
}

