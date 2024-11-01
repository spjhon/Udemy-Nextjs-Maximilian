import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
/**Fs quiere decir que file sistem y es para guardar las imagenes en el sistema de archivos */
import fs from 'node:fs';

const db = sql('meals.db');

export interface Meal {
  title: string;
  slug: string;
  image: string; //aqui las interfaces son diferentes en el fetch y en el save dado que la imagen se lee como un string que es una ruta, mientras que la imagen que entra es un jodido archivo que hay que procesar y convertir en una ruta
  summary: string;
  creator: string;
  creator_email: string;
  instructions: string;
}

//ojo con el delay

/*
Dado que las operaciones son sincrónicas, no necesitas utilizar await. Aquí tienes la función getMeals sin el uso de await:

OJO, esta sincroncronicidad se debe a la libreria para consultar la base de datos, pero se puede utilizar una libreria mas poderoas
y hacer la operacion asyncrona y utilizar suspense en el componente en cuestion

*/

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

//throw new Error('Loading meals failed');

  return db.prepare('SELECT * FROM meals').all() as Meal[];
}





export function getMeal(slug: string): Meal | undefined {
  /*Algo curioso es que en donde esta el ?, se le puede agregar solamente + slug, pero no es recomendable ya que pueden
  presentarse ataques por ahi, entnces es mejor utilizar el .get(slug)*/
  /*y se elimina el async eliminando por tanto la promesa y asi no tener que utilizar estados de loading sino de una mandar resultado */
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug) as Meal | undefined;
}






// Definición del tipo para el parámetro de la función saveMeal
interface SaveMealInput {
  title: string;
  instructions: string;
  image: File;
  summary: string;
  creator: string;
  creator_email: string;
  slug: string;
}

/**El asnc se necesita mas que todo para el await del buffered para poder crear el archivo de imagen */
export async function saveMeal(meal: SaveMealInput): Promise<void> {
  /**El slugify y el xss es para hacer saneamiento de la informacion ingresada por el usuario 
   * lo que se hace es modificar el object de meal y reemplazarlo por los valores saneados
  */
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);


  /**Aqui estamos extrayendo la extencion del archivo */
  const extension = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}.${extension}`;

  /**Este es el path en donde se va a escribir o crear el archivo de imagen */
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  /**Aqui se crea el archivo de imagen y se tiene un error que es un object que se manifiesta si se presenta
   * un error en la escritura del nuevo archivo
   */
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Saving image failed!');
    }
  });

    // Asigna la ruta de la imagen a una nueva propiedad
    //aqui hay un error que toca arreglar despues, resulta que si se deja el mismo nombre de title hay conflicto en el slug
    const imageData = `/images/${fileName}`;

  // Inserta los datos en la base de datos, utilizando `imageData` en lugar de `meal.image`
  db.prepare(`
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `).run({
    ...meal,
    image: imageData, // Usa `imageData` aquí
  });
}