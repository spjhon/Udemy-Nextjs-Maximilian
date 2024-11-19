import { storePost } from "@/lib/posts";
import { redirect } from "next/navigation";



interface typeFormDataExtracted {
  title: string;
  imageUrl: string;
  content: string;
  userId: number;
}


export async function createPost(prevState: { errors: string[] }, formData: FormData): Promise<{errors: string[]}> {
    "use server";
    
    const formDataExtracted: typeFormDataExtracted = {
      imageUrl: "" as string,
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      userId: 1 as number
    };

    const errors = [];

    if (!formDataExtracted.title || formDataExtracted.title.trim().length === 0) {
      errors.push('Title is required.');
    }

    if (!formDataExtracted.content || formDataExtracted.content.trim().length === 0) {
      errors.push('Content is required.');
    }

    if (!formDataExtracted.imageUrl || formDataExtracted.imageUrl.size === 0) {
      errors.push('Image is required.');
    }

    if (errors.length > 0) {
      return { errors };
    }

    await storePost(formDataExtracted);

    redirect('/feed');
  }