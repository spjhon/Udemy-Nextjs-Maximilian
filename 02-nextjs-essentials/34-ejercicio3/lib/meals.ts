import sql from 'better-sqlite3';

const db = sql('meals.db');

/*

has centralizado la definición de la interfaz Meal en el archivo donde se realiza el fetch de la base de datos y 
has asegurado que todos los componentes utilizan el tipo correcto. Esto debería resolver el error de tipos y mejorar 
la mantenibilidad de tu código.

*/

export interface Meal {
  id: string;
  title: string;
  slug: string;
  image: string;
  summary: string;
  creator: string;
}

//ojo con el delay

/*
Dado que las operaciones son sincrónicas, no necesitas utilizar await. Aquí tienes la función getMeals sin el uso de await:*/

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

// throw new Error('Loading meals failed');

  return db.prepare('SELECT * FROM meals').all() as Meal[];
}

export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}