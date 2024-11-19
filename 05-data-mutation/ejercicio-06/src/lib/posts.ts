import sql from 'better-sqlite3';

const db = new sql('posts.db');





function initDb() {
  /**Crea la tabla users si no existe ya. */
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY, 
      first_name TEXT, 
      last_name TEXT,
      email TEXT
    )`);
    /**Crea la tabla posts si no existe. */
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY, 
      image_url TEXT NOT NULL,
      title TEXT NOT NULL, 
      content TEXT NOT NULL, 
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      user_id INTEGER, 
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    )`);
    /**Crea la tabla likes si no existe. */
  db.exec(`
    CREATE TABLE IF NOT EXISTS likes (
      user_id INTEGER, 
      post_id INTEGER, 
      PRIMARY KEY(user_id, post_id),
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE, 
      FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE
    )`);

 // Definir el tipo esperado del resultado
type UserCountResult = { count: number };

// Crear la declaración de la base de datos
const stmt = db.prepare('SELECT COUNT(*) AS count FROM users');

// Tipar el resultado explícitamente
const result = stmt.get() as UserCountResult;

// Comprobar si existen usuarios en la base de datos. Si no hay usuarios, se insertan dos usuarios predeterminados.
if (result.count === 0) {
  db.exec(`
    INSERT INTO users (first_name, last_name, email)
    VALUES ('John', 'Doe', 'john@example.com')
  `);

  db.exec(`
    INSERT INTO users (first_name, last_name, email)
    VALUES ('Max', 'Schwarz', 'max@example.com')
  `);
}
}

initDb();









export type PostType = {
  id: string;
  image: string;
  title: string;
  content: string;
  createdAt: string; // Si usas fechas en formato ISO, por ejemplo
  userFirstName: string;
  userLastName: string;
  likes: number;
  isLiked: boolean;
};

/**Esta función asíncrona obtiene los posts de la base de datos. 
 * 
 * Toma como argumento un parámetro maxNumber, que es el número máximo de 
 * posts que se deben recuperar. Si no se especifica, se retornarán todos los posts disponibles.
*/
export async function getPosts(maxNumber: number | null): Promise<PostType[]> {

  /**Si el parámetro maxNumber es proporcionado (es decir, no es undefined o 0), se agrega la cláusula LIMIT ? a la consulta, 
   * lo que limita la cantidad de posts devueltos a maxNumber.
   * 
   * Si no se pasa un valor para maxNumber, la variable limitClause queda vacía, lo que significa que no habrá 
   * límite en la consulta SQL. */
  let limitClause = '';

  if (maxNumber) {
    limitClause = 'LIMIT ?';
  }

  /**Prepara una consulta SQL para obtener la información de los posts junto con datos relacionados, 
   * como el nombre del usuario que creó el post y la cantidad de "me gusta" que ha recibido. */
  const stmt = db.prepare(`
    SELECT posts.id, image_url AS image, title, content, created_at AS createdAt, first_name AS userFirstName, last_name AS userLastName, COUNT(likes.post_id) AS likes, EXISTS(SELECT * FROM likes WHERE likes.post_id = posts.id and likes.user_id = 2) AS isLiked
    FROM posts
    INNER JOIN users ON posts.user_id = users.id
    LEFT JOIN likes ON posts.id = likes.post_id
    GROUP BY posts.id
    ORDER BY createdAt DESC
    ${limitClause}`);

  await new Promise((resolve) => setTimeout(resolve, 1000));
  /**Ejecuta la consulta SQL y devuelve los resultados.
   * Si maxNumber está definido, se limita la cantidad de resultados a maxNumber usando stmt.all(maxNumber).
   * Si maxNumber no está definido, se devuelven todos los resultados sin límite usando stmt.all().
   */
  const result = maxNumber ? stmt.all(maxNumber) : stmt.all();
  return result as PostType[]; // Usa un type assertion si estás seguro del tipo
}










type Post = {
  imageUrl: string;
  title: string;
  content: string;
  userId: number; // Ajusta según el tipo real de `userId`
};

export async function storePost(post: Post) {
  /**Aquí, se utiliza db.prepare de la librería better-sqlite3 para crear una declaración SQL preparada.
   * La consulta es un INSERT INTO para insertar un nuevo registro en la tabla posts.
   * Los signos de interrogación (?) son placeholders que serán reemplazados por los valores que se proporcionen más adelante.
   * Los campos que se insertan son: image_url, title, content y user_id, que corresponden a las columnas de la tabla posts. 
   */
  console.log(post)
  const stmt = db.prepare(`
    INSERT INTO posts (image_url, title, content, user_id)
    VALUES (?, ?, ?, ?)`);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  /**Aquí, la función ejecuta la consulta preparada usando el método run de la declaración stmt.
   * Los valores del post (como post.imageUrl, post.title, etc.) se pasan como argumentos en el mismo orden en que se encuentran los placeholders (?) en la consulta SQL.
   * stmt.run() ejecuta la inserción en la base de datos con esos valores.
   * run() devuelve un objeto con información sobre la ejecución de la consulta, pero no es utilizado en este caso. */
  return stmt.run(post.imageUrl, post.title, post.content, post.userId);

}
/**Aquí, la función ejecuta la consulta preparada usando el método run de la declaración stmt.
Los valores del post (como post.imageUrl, post.title, etc.) se pasan como argumentos en el mismo orden en que se encuentran los placeholders (?) en la consulta SQL.
stmt.run() ejecuta la inserción en la base de datos con esos valores.
run() devuelve un objeto con información sobre la ejecución de la consulta, pero no es utilizado en este caso. */








type LikeCountResult = { count: number };

export async function updatePostLikeStatus(postId: number, userId: number) {
  /**Preparar la consulta SQL:
   * Se crea una declaración preparada que cuenta cuántas filas existen en la tabla likes para el par de 
   * user_id y post_id especificado. */
  const stmt = db.prepare(`
    SELECT COUNT(*) AS count
    FROM likes
    WHERE user_id = ? AND post_id = ?`);

  // Usa `.get` con parámetros de forma normal, sin necesidad de tipo genérico
  /**stmt.get(userId, postId) ejecuta la consulta con los valores proporcionados 
   * y devuelve un objeto que contiene el resultado. Este objeto tiene la forma LikeCountResult. 
  */
  const result = stmt.get(userId, postId) as LikeCountResult;

  /**Si result.count es 0, significa que el usuario no ha dado "like" al post. En este caso, se añadirá un "like".
   * Si result.count es mayor a 0, significa que el usuario ya ha dado "like" al post. En este caso, se eliminará el "like". */
  const isLiked = result.count === 0;

  /**Si isLiked es true, se añadirá un "like".
   * Si isLiked es false, se eliminará el "like". */
  if (isLiked) {
    /**Se prepara una consulta INSERT INTO para añadir un nuevo registro en la 
     * tabla likes con los valores proporcionados (userId y postId). */
    const stmt = db.prepare(`
      INSERT INTO likes (user_id, post_id)
      VALUES (?, ?)`);
      /**Se introduce un retraso artificial de 1 segundo con setTimeout para simular una operación asíncrona. */
    await new Promise((resolve) => setTimeout(resolve, 1000));
    /**Se ejecuta la consulta con stmt.run(userId, postId). */
    return stmt.run(userId, postId);
  } else {
    // Eliminar un "like"

    /**Se prepara una consulta DELETE FROM para eliminar el 
     * registro de la tabla likes que coincida con los valores de userId y postId. */
    const stmt = db.prepare(`
      DELETE FROM likes
      WHERE user_id = ? AND post_id = ?`);
      /**Al igual que antes, se introduce un retraso artificial de 1 segundo. */
    await new Promise((resolve) => setTimeout(resolve, 1000));
    /**La consulta se ejecuta con stmt.run(userId, postId). */
    return stmt.run(userId, postId);
  }
}

/**OJO CON LA ESCALABILIDAD
 * 
 * Escalabilidad:

Si tienes muchos usuarios interactuando, esta función puede convertirse en un 
* cuello de botella si no optimizas el acceso a la base de datos 
(por ejemplo, eliminando el retraso artificial).
 */

/**NOTA IMPORTANTE
 * Si hay posibilidad de que stmt.all() no devuelva datos válidos (por ejemplo, si el esquema de la base de datos cambia), 
 * considera validar los datos antes de devolverlos, utilizando un runtime type-checking library como zod o io-ts para mayor 
 * seguridad.
*/