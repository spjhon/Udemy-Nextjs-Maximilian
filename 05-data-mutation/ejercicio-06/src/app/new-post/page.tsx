import FormSubmit from "@/components/form-submit";
import { storePost } from "@/lib/posts";
import { redirect } from "next/navigation";



interface typeFormDataExtracted {
  title: string;
  imageUrl: null;
  content: string;
  userId: number;
}

export default function NewPostPage() {

    async function createPost(formData: FormData) {
      "use server";
      
      const formDataExtracted: typeFormDataExtracted = {
        imageUrl: null as null,
        title: formData.get('title') as string,
        content: formData.get('content') as string,
        userId: 1 as number
      };
  

      await storePost(formDataExtracted);
  
      redirect('/feed');
    }

    
  return (
    <>
      <h1>Create a new post</h1>
      <form action={createPost}>
        <p className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </p>
        <p className="form-control">
          <label htmlFor="image">Image URL</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            name="image"
          />
        </p>
        <p className="form-control">
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" rows={5} />
        </p>
        <p className="form-actions">
          <FormSubmit />
        </p>
      </form>
    </>
  );
}
