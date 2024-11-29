import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

if (!process.env.CLOUDINARY_CLOUD_NAME) {
  throw new Error('CLOUDINARY_CLOUD_NAME is not set');
}

if (!process.env.CLOUDINARY_API_KEY) {
  throw new Error('CLOUDINARY_API_KEY is not set');
}

if (!process.env.CLOUDINARY_API_SECRET) {
  throw new Error('CLOUDINARY_API_SECRET is not set');
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface UploadImageResult {
  secure_url: string;
}

export async function uploadImage(image: File): Promise<UploadImageResult> {
  /**Comprueba que el parámetro image no sea nulo o indefinido.
   * Asegura que el objeto image sea una instancia válida de la clase File.
   * Si falla la validación: Lanza un error con el mensaje 'Invalid image file'. */
  if (!image || !(image instanceof File)) {
    throw new Error('Invalid image file');
  }

  // Convert the image to a base64 URI

  //image.arrayBuffer(): Convierte el archivo de imagen en un buffer binario.
  const imageData = await image.arrayBuffer();
  //image.type: Obtiene el tipo de archivo (por ejemplo, image/jpeg).
  const mime = image.type;
  //Buffer.from(imageData).toString('base64'): Convierte los datos binarios a una cadena en formato Base64.
  const encoding = 'base64';
  const base64Data = Buffer.from(imageData).toString('base64');
  //Concatena el tipo MIME, la codificación (base64) y los datos codificados
  const fileUri = `data:${mime};${encoding},${base64Data}`;


  //Subir la imagen a Cloudinary
  try {
    // cloudinary.uploader.upload(fileUri): Usa la API de Cloudinary para subir la imagen codificada.
    const result: UploadApiResponse = await cloudinary.uploader.upload(fileUri, {
      //El objeto de opciones incluye folder: 'nextjs-course-mutations', que organiza la imagen en una carpeta específica.
      folder: 'nextjs-course-mutations',
    });

    // Al completar la subida, cloudinary devuelve un objeto con información sobre la imagen, incluyendo la URL segura.
    return { secure_url: result.secure_url };
  } catch (error) {
    throw new Error(`Failed to upload image: ${(error as Error).message}`);
  }
}


//EJEMPLO DE USO

/**
const imageFile = new File([imageBlob], 'example.jpg', { type: 'image/jpeg' });

uploadImage(imageFile)
  .then((result) => console.log('Uploaded URL:', result.secure_url))
  .catch((err) => console.error('Upload error:', err.message));
 */