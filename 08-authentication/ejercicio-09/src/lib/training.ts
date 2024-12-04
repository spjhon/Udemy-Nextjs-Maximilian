import db from './db';

interface Types {
  id: number;
  title: string;
  image: string;
  description: string;
}


export function getTrainings(): Types[] {
  const stmt = db.prepare('SELECT * FROM trainings');
  const results = stmt.all();

 // Validación de tipos para mayor seguridad
 if (!Array.isArray(results)) {
  throw new Error('La respuesta de la base de datos no es un array');
}

return results as Types[]
}
