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







/**Esta función asíncrona obtiene los posts de la base de datos. 
 * 
 * Toma como argumento un parámetro maxNumber, que es el número máximo de 
 * posts que se deben recuperar. Si no se especifica, se retornarán todos los posts disponibles.
*/
export async function getPosts(maxNumber: number) {

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
  return maxNumber ? stmt.all(maxNumber) : stmt.all();
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
  const stmt = db.prepare(`
    SELECT COUNT(*) AS count
    FROM likes
    WHERE user_id = ? AND post_id = ?`);

  // Usa `.get` con parámetros de forma normal, sin necesidad de tipo genérico
  const result = stmt.get(userId, postId) as LikeCountResult;

  const isLiked = result.count === 0;

  if (isLiked) {
    const stmt = db.prepare(`
      INSERT INTO likes (user_id, post_id)
      VALUES (?, ?)`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return stmt.run(userId, postId);
  } else {
    const stmt = db.prepare(`
      DELETE FROM likes
      WHERE user_id = ? AND post_id = ?`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return stmt.run(userId, postId);
  }
}

