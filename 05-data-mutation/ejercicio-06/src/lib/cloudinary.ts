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
  // Ensure the input is a valid File object
  if (!image || !(image instanceof File)) {
    throw new Error('Invalid image file');
  }

  // Convert the image to a base64 URI
  const imageData = await image.arrayBuffer();
  const mime = image.type;
  const encoding = 'base64';
  const base64Data = Buffer.from(imageData).toString('base64');
  const fileUri = `data:${mime};${encoding},${base64Data}`;

  try {
    // Upload the image to Cloudinary
    const result: UploadApiResponse = await cloudinary.uploader.upload(fileUri, {
      folder: 'nextjs-course-mutations',
    });

    // Return only the secure URL
    return { secure_url: result.secure_url };
  } catch (error) {
    throw new Error(`Failed to upload image: ${(error as Error).message}`);
  }
}
